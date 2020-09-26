import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Teacher } from 'src/app/_models/teachers/teacher.model';
import { UserPutDTO } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users/users.service';

@Component({
  selector: 'app-teachers-list-list',
  templateUrl: './teachers-list-list.component.html',
  styleUrls: ['./teachers-list-list.component.scss']
})
export class TeachersListListComponent implements OnInit {

  constructor(private userService:UsersService, private datePipe: DatePipe) { }
  public formGroup: FormGroup;
  public editedRowIndex: number;
  @Input() gridData: Teacher[];
  ngOnInit(): void {
  }
  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'firstName': new FormControl({value: dataItem.firstName, disabled: false}, Validators.compose([Validators.required])),//, Validators.pattern('[A-Za-z]{1,}')
      'lastName': new FormControl({value: dataItem.lastName, disabled: false}, Validators.compose([Validators.required])),//, Validators.pattern('[A-Za-z]{1,}')
      'displayDate': new FormControl({value: dataItem.birthDate, disabled: false}, Validators.compose([Validators.required, Validators.pattern('^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$')])),//, Validators.pattern('([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))')
      'email': new FormControl({value: dataItem.email, disabled: false}, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),//
      'phoneNumber': new FormControl({value: dataItem.phoneNumber, disabled: false}, Validators.compose([Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')])),//
      'className': new FormControl({value: dataItem.className, disabled: true},),
    });
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }
  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew, dataItem }) {
    var userPutDTO = new UserPutDTO();
    userPutDTO.birthDate = formGroup.get("displayDate").value;
    userPutDTO.email = formGroup.get("email").value;
    userPutDTO.firstName = formGroup.get("firstName").value;
    userPutDTO.lastName = formGroup.get("lastName").value;
    userPutDTO.phoneNumber = formGroup.get("phoneNumber").value;
          this.userService.editUser(userPutDTO,dataItem.userId).subscribe(res =>{
            this.gridData.forEach(g=> {
              if(g.userId === dataItem.userId) {
                g.firstName = userPutDTO.firstName;
                g.lastName = userPutDTO.lastName;
                g.email= userPutDTO.email;
                g.displayDate = userPutDTO.birthDate;
                g.phoneNumber = userPutDTO.phoneNumber;
              }
            })
          }, error=>{ alert("Nie udalo sie edytowac uzytkownika")});
          this.closeEditor(sender);
          sender.closeRow(rowIndex);
  }
}
