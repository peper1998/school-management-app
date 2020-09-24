import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PDFExportComponent } from "@progress/kendo-angular-pdf-export";
import { UserCreationHelper } from "src/app/_helpers/user-creation-helper.service";
import { ParentStudentCreationModel } from "src/app/_models/parents_students/parent-student.model";
import { ClassesService } from "src/app/_services/classes/classes.service";
import { ParentsStudentsService } from "src/app/_services/parents_students/parents-students.service";

@Component({
  selector: 'app-parent-student-insert',
  templateUrl: './parent-student-insert.component.html',
  styleUrls: ['./parent-student-insert.component.scss']
})
export class ParentStudentInsertComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private userCreationHelper: UserCreationHelper,
    private datePipe: DatePipe,
    private parentStudentService: ParentsStudentsService,
    private classesService: ClassesService) { }

  get f() {
    return this.parentStudentForm.controls;
  }

  @ViewChild('pdf', { static: true }) pdfExport: PDFExportComponent;

  parentLogin: string;
  studentLogin: string;
  parentPassword: string;
  studentPassword: string;

  public classList = []

  public parentStudentForm = this.formBuilder.group({
    parentFirstName: ['', [Validators.required, Validators.minLength(3)]],
    parentLastName: ['', [Validators.required, Validators.minLength(3)]],
    parentBirthDate: [new Date(), Validators.required],
    parentLogin: ['', Validators.required],
    parentEmail: [''],
    parentPhoneNumber: [''],
    studentFirstName: ['', [Validators.required, Validators.minLength(3)]],
    studentLastName: ['', [Validators.required, Validators.minLength(3)]],
    studentBirthDate: [new Date(), Validators.required],
    studentLogin: ['', Validators.required],
    studentEmail: [''],
    studentPhoneNumber: [''],
    classId: ['', Validators.required],
  });

  ngOnInit() {
    this.classesService.getClasses().subscribe(classes => {
      classes.forEach(cl => {
        this.classList.push({ id: cl.id, name: cl.name });
      })
    })
  }

  addParentAndStudent() {
    this.parentStudentService.addParentAndStudent(this.createModel()).subscribe(ps => {
      this.pdfExport.saveAs(ps.parent.firstName + ps.parent.lastName + '_' + ps.student.firstName + ps.student.firstName + 'TempLoginData');
      console.log(ps);
    })
  }

  createModel() {
    const parentBirthDate = new Date(this.parentStudentForm.controls.parentBirthDate.value);
    const studentBirthDate = new Date(this.parentStudentForm.controls.studentBirthDate.value);
    const model = new ParentStudentCreationModel();
    model.parent.firstName = this.parentStudentForm.controls.parentLastName.value;
    model.parent.lastName = this.parentStudentForm.controls.parentLastName.value;
    model.parent.birthDate = this.datePipe.transform(parentBirthDate, 'yyyy-MM-dd');
    model.parent.login = this.parentStudentForm.controls.parentLogin.value;
    model.parent.password = this.userCreationHelper.generatePassword();
    model.parent.email=this.parentStudentForm.controls.parentEmail.value;
    model.parent.phoneNumber=this.parentStudentForm.controls.parentPhoneNumber.value;
    model.student.birthDate = this.datePipe.transform(studentBirthDate, 'yyyy-MM-dd');
    model.student.firstName = this.parentStudentForm.controls.studentFirstName.value;
    model.student.lastName = this.parentStudentForm.controls.studentLastName.value;
    model.student.login = this.parentStudentForm.controls.studentLogin.value;
    model.student.email = this.parentStudentForm.controls.studentEmail.value;
    model.student.phoneNumber = this.parentStudentForm.controls.studentPhoneNumber.value;
    model.student.password = this.userCreationHelper.generatePassword();
    model.student.classId = this.parentStudentForm.controls.classId.value;

    this.parentLogin = model.parent.login;
    this.parentPassword = model.parent.password;
    this.studentLogin = model.student.login;
    this.studentPassword = model.student.password;

    return model;
  }

  dropdownValueChanged(val: any) {

    this.parentStudentForm.controls.classId.setValue(val.id);
  }

  parentBirthDatePickerChangedHandler(date: any) {
    this.parentStudentForm.controls.parentBirthDate.setValue(date);
  }

  studentBirthDatePickerChangedHandler(date: any) {
    this.parentStudentForm.controls.studentBirthDate.setValue(date);
  }

  generateParentsLogin() {
    const login = this.userCreationHelper.generateLogin(this.parentStudentForm.controls.parentFirstName.value, this.parentStudentForm.controls.parentLastName.value);
    this.parentStudentForm.controls.parentLogin.setValue(login);
  }

  generateStudentLogin() {
    const login = this.userCreationHelper.generateLogin(this.parentStudentForm.controls.studentFirstName.value, this.parentStudentForm.controls.studentLastName.value);
    this.parentStudentForm.controls.studentLogin.setValue(login);
  }


}
