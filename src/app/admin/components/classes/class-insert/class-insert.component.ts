import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassesService } from 'src/app/_services/classes/classes.service';
import { ClassCreationModel } from 'src/app/_models/class/class-creation.model';
import { EducationStage } from 'src/app/_enums/EducationStageEnum';
import { TeachersService } from 'src/app/_services/teachers/teachers.service';

@Component({
  selector: 'app-class-insert',
  templateUrl: './class-insert.component.html',
  styleUrls: ['./class-insert.component.scss']
})
export class ClassInsertComponent implements OnInit {
  teachers: import("g:/school-management-app/src/app/_models/teachers/teacher.model").Teacher[];

  EducationStage(){
    return EducationStage;
  }

  educationStageDropdownItems:any[];

  dropdownValueChanged(event:any)
  {
  }

  public classForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    supervisiorId: ['', [Validators.required]],
    enumEducationStage: ['', [Validators.required]],
  });

  get f() {
    return this.classForm.controls;
  }

  createModel() {
    let schoolClassDTO = new ClassCreationModel();
    schoolClassDTO.enumEducationStage = this.classForm.controls["enumEducationStage"].value;
    schoolClassDTO.name = this.classForm.controls["name"].value;
    schoolClassDTO.supervisorId = this.classForm.controls["supervisiorId"].value;
    console.log(schoolClassDTO);
    return schoolClassDTO;
  }

  addClass() {
    this.classesService.addClass(this.createModel()).subscribe(schoolClass => {
       console.log(schoolClass);
    });
  }

  constructor(private formBuilder: FormBuilder,
    private classesService: ClassesService,
    private teachersService:TeachersService) { }

  ngOnInit() {
    this.teachersService.getTeachers().subscribe(teachers=>{
      this.teachers = teachers;
    })
    this.educationStageDropdownItems = [];
    this.educationStageDropdownItems.push(EducationStage.FIRST_YEAR);
    this.educationStageDropdownItems.push(EducationStage.SECOND_YEAR);
    this.educationStageDropdownItems.push(EducationStage.THIRD_YEAR);
    this.educationStageDropdownItems.push(EducationStage.FOURTH_YEAR);
  }

}

