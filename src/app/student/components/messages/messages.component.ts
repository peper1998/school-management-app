import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConversationGet, owner } from 'src/app/_models/messages/conversation-get';
import { MessagesGet } from 'src/app/_models/messages/messages-get';
import { ParentGet } from 'src/app/_models/parents/parent-get';
import { StudentGet } from 'src/app/_models/students/student-get';
import { TeacherGet } from 'src/app/_models/teachers/teacher-get'
import { TeacherMessagesService } from 'src/app/teacher/components/_services/teacher-messages.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  teachersGet:TeacherGet[];
  messagesGet:MessagesGet[];
  selected:boolean
  public messageLoading = true;
	private userId: string = null;
  public selectedUser: any = null;
  public userToSend: any = null;
	public messages: ConversationGet[] = []
  public messageForm: FormGroup;
  public selectedConverstions: ConversationGet[] = null;
  public newMessageNeedToBeSent: boolean;
  conversationId: number = null;
  @ViewChild('messageThread') private messageContainer: ElementRef;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private TeacherMessagesService: TeacherMessagesService) {
    this.selected = false;
    }
    ngOnInit(): void {
      this.TeacherMessagesService.getTeachers().subscribe(res=> {
          this.teachersGet = res;
          console.log(res);
          this.reflesh();
      })
      this.TeacherMessagesService.getCurrentUser().subscribe(res=> {
        this.selectedUser = res;
      })
      this.messageForm =this.createMessageForm();
    }


 reflesh() {
  this.TeacherMessagesService.getTeacherMessages().subscribe(res=> {
    this.messagesGet = res
    console.log(res);
    this.teachersGet.forEach(e=> {
      e.amountOfMessages = 0;
      this.messagesGet.forEach(g=>{
        if(e.userId == g.userFirst.id || e.userId == g.userSecond.id) {
          this.TeacherMessagesService.getConversationsById(g.id).subscribe(res => {
            res.forEach(f=> e.amountOfMessages++)
          })
        }
      })
    })
  })
 }
  selectCompetition(event:any){
    this.messageForm.reset();
    this.selectedConverstions =null;
    if(event.selectedRows?.length>0) {
      this.selected = true;
      this.userToSend = event.selectedRows[0].dataItem;
      console.log(this.userToSend.userId);
      this.newMessageNeedToBeSent = true;
      var once = true;
      this.messagesGet.forEach(e=> {
        if((e.userFirst.id == this.selectedUser.userId && e.userSecond.id == this.userToSend.userId) 
        ||(e.userSecond.id == this.selectedUser.userId && e.userFirst.id == this.userToSend.userId))
        {
          if(once){
          once = false;
          this.conversationId = e.id;
          this.TeacherMessagesService.getConversationsById(this.conversationId).subscribe(res => {
            this.selectedConverstions = res; 
            console.log(this.selectedConverstions);
            this.newMessageNeedToBeSent = false;
          })
        }
        }
      });
      this.reflesh();
      this.scrollMessageContainer();
    }
    else if(event.selectedRows?.length==0) { 
      this.selectedConverstions = null;
      this.userToSend = null;
      this.selected = false;
    }
  }


  alignMessage(userId: number): boolean {
		return this.selectedUser.userId === userId ? false : true;
  }
  sendMessage(event) {
    this.newMessageNeedToBeSent = true;
    this.messagesGet.forEach(e=> {
      if((e.userFirst.id == this.selectedUser.userId && e.userSecond.id == this.userToSend.userId) 
      ||(e.userSecond.id == this.selectedUser.userId && e.userFirst.id == this.userToSend.userId) )
      {
        this.newMessageNeedToBeSent = false;
      }
    });
		if (event.keyCode === 13) {
      const message = this.messageForm.controls['message'].value.trim();
			if (message === '' || message === undefined || message === null) {
				alert(`Message can't be empty.`);
      }
      else if (this.newMessageNeedToBeSent){
				this.sendAndUpdateMessages({
          recipientId: this.userToSend.userId,
          topicName: (message).trim(),
          topicText: (message).trim(),
				});
      }
      else if(!this.newMessageNeedToBeSent){
        this.sendAndUpdateMessages({
          conversationId: this.conversationId,
          answerText: (message).trim()
				});
      }
    }
  }
  sendAndUpdateMessages(message: any) {
		try {
      this.messageForm.disable();
      if(this.newMessageNeedToBeSent) {
        this.newMessageNeedToBeSent = false;
        this.TeacherMessagesService.sendNewMessage(message).subscribe(res=>
          {
            this.conversationId = res.id;
            this.TeacherMessagesService.getConversationsById(this.conversationId).subscribe(res=> {
              this.selectedConverstions = res;
              this.messageForm.reset();
              this.messageForm.enable();
              this.scrollMessageContainer();
              this.reflesh();
            })
          })
      }
      else { 
        this.TeacherMessagesService.answerToConversation(message).subscribe(res => {
          var messageTmp = new ConversationGet();
          messageTmp.owner = new owner();
          messageTmp.answerText = message.answerText;
          messageTmp.owner.firstName = this.selectedUser.firstName;
          messageTmp.owner.lastName = this.selectedUser.lastName;
          messageTmp.owner.userType = this.selectedUser.userType;
          messageTmp.owner.id = this.selectedUser.userId;
          this.selectedConverstions = [...this.selectedConverstions,messageTmp];
          this.messageForm.reset();
          this.messageForm.enable();
          this.scrollMessageContainer();
          this.reflesh();
        })
      }

		} catch (error) {
			console.warn(error);
			alert(`Can't send your message`);
		}
  }
  scrollMessageContainer(): void {
		if (this.messageContainer !== undefined) {
			try {
				setTimeout(() => {
					this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
				}, 100);
			} catch (error) {
				console.warn(error);
			}
		}
  }
  createMessageForm(): FormGroup {
		return new FormBuilder().group({
			message: new FormControl(Validators.required)
		});
	}

}
