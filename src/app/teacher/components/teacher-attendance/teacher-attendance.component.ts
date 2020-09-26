import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseModel } from 'src/app/_models/courses/course.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/_services/courses/courses.service';
import { lessonAttendaceDTO } from '../_models/lessonAttendanceDTO';
import { TeacherAttendanceServiceService } from '../_services/teacher-attendance-service.service';
import { ifError } from 'assert';
@Component({
  selector: 'app-teacher-attendance',
  templateUrl: './teacher-attendance.component.html',
  styleUrls: ['./teacher-attendance.component.scss']
})
export class TeacherAttendanceComponent implements OnInit {
  lessonAttendanceDTO:lessonAttendaceDTO;
  @Input() coursesList: CourseModel[];
  @Output() dataStateChanged: EventEmitter<any> = new EventEmitter()

  public formGroup: FormGroup;
  public editedRowIndex: number;

  private editMode:boolean;
  selectUnselect:boolean;
  constructor(private coursesService: CoursesService, private teacherAttendanceServiceService:TeacherAttendanceServiceService,
    private formBuilder: FormBuilder) { this.selectUnselect = true;}

  ngOnInit() {
    var a =this.teacherAttendanceServiceService.getAttendance().subscribe(res =>{
      this.lessonAttendanceDTO= res;
      console.log(this.lessonAttendanceDTO);
    },  
    error=>{ alert("Nie można pobrać obecności obecnej lekcji, prawdopodobnie obecnie nie toczy się żadna lekcja")});
  }
  saveChanges(item) {
    var index = this.lessonAttendanceDTO.students.indexOf(item);
    this.lessonAttendanceDTO.students[index].isPresent = !this.lessonAttendanceDTO.students[index].isPresent;
  }
  allPresent() {
    if(this.selectUnselect){
    this.selectUnselect=false;
    this.lessonAttendanceDTO.students.forEach(e => e.isPresent = true); }
    else { this.lessonAttendanceDTO.students.forEach(e => e.isPresent = false); this.selectUnselect=true;}
  }
  submit() {
    this.teacherAttendanceServiceService.postAttendance(this.lessonAttendanceDTO).subscribe(res=>{
      if(res.status == 200) { alert("Dodano obecności");}
      else { 
        alert("Nie udało się dodać obecności");
      }},
      error=> {
        if(error.status == 200) alert("Dodano obecności");
        else alert("Nie udalo sie dodac obecnosci");
      });
  }

}
