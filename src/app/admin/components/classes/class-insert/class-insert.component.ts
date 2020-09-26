import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { EducationStage } from "src/app/_enums/EducationStageEnum";
import { ClassCreationModel } from "src/app/_models/class/class-creation.model";
import { Teacher } from "src/app/_models/teachers/teacher.model";
import { ClassesService } from "src/app/_services/classes/classes.service";
import { TeachersService } from "src/app/_services/teachers/teachers.service";

@Component({
  selector: 'app-class-insert',
  templateUrl: './class-insert.component.html',
  styleUrls: ['./class-insert.component.scss']
})
export class ClassInsertComponent implements OnInit {

  @Output() dataStateChanged = new EventEmitter<any>();

  get f() {
    return this.classForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
    private classesService: ClassesService,
    private teachersService: TeachersService) { }
  teachers: Teacher[];

  educationStageDropdownItems: any[];

  public classForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    supervisiorId: ['', [Validators.required]],
    enumEducationStage: ['', [Validators.required]],
  });

  EducationStage() {
    return EducationStage;
  }

  dropdownValueChanged(event: any) {
    console.log(this.classForm.get('enumEducationStage').value);
  }

  createModel() {
    const schoolClassDTO = new ClassCreationModel();
    schoolClassDTO.enumEducationStage = this.classForm.controls.enumEducationStage.value;
    schoolClassDTO.name = this.classForm.controls.name.value;
    schoolClassDTO.supervisorId = this.classForm.controls.supervisiorId.value;
    console.log(schoolClassDTO);
    return schoolClassDTO;
  }

  addClass() {
    this.classesService.addClass(this.createModel()).subscribe(schoolClass => {
      alert('Dodano klasę!');
      this.dataStateChanged.emit();
      this.classForm.controls.name.setValue('');
      console.log(schoolClass);
    },
    err=>{
      alert('Nie udało się dodać klasy!');
    });
  }

  ngOnInit() {
    this.teachersService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
      this.teachers.forEach(e => e.firstName = e.firstName + ' ' + e.lastName)
    })
    this.educationStageDropdownItems = [];
    this.educationStageDropdownItems.push(EducationStage.FIRST_YEAR);
    this.educationStageDropdownItems.push(EducationStage.SECOND_YEAR);
    this.educationStageDropdownItems.push(EducationStage.THIRD_YEAR);
    this.educationStageDropdownItems.push(EducationStage.FOURTH_YEAR);
  }
  teacherChanged() {
    console.log(this.classForm.get('supervisiorId').value)
  }
  textDisplay(id) {
    console.log(id);
  }
}

