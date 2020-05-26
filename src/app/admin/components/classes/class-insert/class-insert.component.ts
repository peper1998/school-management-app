import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassesService } from 'src/app/_services/classes/classes.service';
import { ClassCreationModel } from 'src/app/_models/class/class-creation.model';

@Component({
  selector: 'app-class-insert',
  templateUrl: './class-insert.component.html',
  styleUrls: ['./class-insert.component.scss']
})
export class ClassInsertComponent implements OnInit {

  public classForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    supervisiorId: ['', [Validators.required, Validators.maxLength(3)]],
    year: ['', [Validators.required, Validators.maxLength(1)]],
  });

  get f() {
    return this.classForm.controls;
  }

  createModel() {
    let schoolClassDTO = new ClassCreationModel();
    schoolClassDTO.year = this.classForm.controls["year"].value;
    schoolClassDTO.name = this.classForm.controls["name"].value;
    schoolClassDTO.supervisorId = this.classForm.controls["supervisiorId"].value;
    return schoolClassDTO;
  }

  addClass() {
    this.classesService.addClass(this.createModel()).subscribe(schoolClass => {
      console.log(schoolClass);
    });
    alert("Klasa została dodana");
  }

  constructor(private formBuilder: FormBuilder,
    private classesService: ClassesService) { }

  ngOnInit() {
  }

}

