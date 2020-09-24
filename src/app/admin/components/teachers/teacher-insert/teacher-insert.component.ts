import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PDFExportComponent } from "@progress/kendo-angular-pdf-export";
import { UserType } from "src/app/_enums/UserType";
import { UserCreationHelper } from "src/app/_helpers/user-creation-helper.service";
import { TeacherCreationModel } from "src/app/_models/teachers/teacher-creation.model";
import { TeachersService } from "src/app/_services/teachers/teachers.service";

@Component({
  selector: 'app-teacher-insert',
  templateUrl: './teacher-insert.component.html',
  styleUrls: ['./teacher-insert.component.scss']
})
export class TeacherInsertComponent implements OnInit {

  @ViewChild('pdf', { static: true }) pdfExport: PDFExportComponent;
  public teacherForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    birthDate: [new Date(), Validators.required],
    login: ['', Validators.required],
    email: [''],
    phoneNumber: [''],
  });
  password: string;
  login: string;

  get f() {
    return this.teacherForm.controls;
  }

  createModel(){
    const date = new Date(this.teacherForm.controls.birthDate.value);
    const teacherDTO = new TeacherCreationModel();
    teacherDTO.firstName = this.teacherForm.controls.firstName.value;
    teacherDTO.lastName = this.teacherForm.controls.lastName.value;
    teacherDTO.email = this.teacherForm.controls.email.value;
    teacherDTO.phoneNumber = this.teacherForm.controls.phoneNumber.value;
    teacherDTO.birthDate = this.datePipe.transform(date,'yyyy-MM-dd');
    teacherDTO.login = this.teacherForm.controls.login.value;
    teacherDTO.password = this.userCreationHelper.generatePassword();
    this.login = teacherDTO.login;
    this.password = teacherDTO.password;
    teacherDTO.userType = UserType.TEACHER;
    return teacherDTO;
  }

  generateLogin(){
    const login = this.userCreationHelper.generateLogin(this.teacherForm.controls.firstName.value,this.teacherForm.controls.lastName.value);
    this.teacherForm.controls.login.setValue(login);
  }

  addTeacher(){

    this.teachersService.addTeacher(this.createModel()).subscribe(teacher=>{
      this.pdfExport.saveAs(teacher.firstName+teacher.lastName + 'TempLoginData');
      alert('Dodano nauczyciela!');
      this.teacherForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        birthDate: [new Date(), Validators.required],
        login: ['', Validators.required],
        email: [''],
        phoneNumber: [''],
      });
      console.log(teacher);
    });
  }

  birthDatePickerChangedHandler(date: any)
  {
    this.teacherForm.controls.birthDate.setValue(date);
  }

  constructor(private formBuilder: FormBuilder,
    private userCreationHelper: UserCreationHelper,
    private teachersService: TeachersService,
    private datePipe: DatePipe) { }

  ngOnInit() {
  }

}
