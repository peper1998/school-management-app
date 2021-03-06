import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentGet } from 'src/app/_models/students/student-get';
import { StudentParentGet } from 'src/app/_models/students/student-parent-get';
import { UserPutDTO } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users/users.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  public formGroup: FormGroup;
  public editedRowIndex: number;
  constructor(private userService: UsersService) { }
  @Input() gridData: StudentParentGet[];
  ngOnInit(): void {
  }
  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'firstName': new FormControl({value: dataItem.firstName, disabled: false}, Validators.compose([Validators.required])),//, Validators.pattern('[A-Za-z]{1,}')
      'lastName': new FormControl({value: dataItem.lastName, disabled: false}, Validators.compose([Validators.required])),//, Validators.pattern('[A-Za-z]{1,}')
      'birthDate': new FormControl({value: dataItem.birthDate, disabled: false}, Validators.compose([Validators.required, Validators.pattern('^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$')])),//, Validators.pattern('([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))')
      'email': new FormControl({value: dataItem.email, disabled: false}, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),//
      'phoneNumber': new FormControl({value: dataItem.phoneNumber, disabled: false}, Validators.compose([Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')])),//
      'className': new FormControl({value: dataItem.className, disabled: true},),
      'Supervisor': new FormControl({value: dataItem.supervisorName+" "+dataItem.supervisorLastName, disabled: true},),
      'parent': new FormControl({value: dataItem.parentFirstName+" "+dataItem.parentLastName, disabled: true},)
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
    userPutDTO.birthDate = formGroup.get("birthDate").value;
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
                g.birthDate = userPutDTO.birthDate;
                g.phoneNumber = userPutDTO.phoneNumber;
              }
            })
          }, error=>{ alert("Nie udalo sie edytowac uzytkownika")});
          this.closeEditor(sender);
          sender.closeRow(rowIndex);
  }
}
