import { Component, OnInit } from "@angular/core";
import { Teacher } from "src/app/_models/teachers/teacher.model";
import { TeachersService } from "src/app/_services/teachers/teachers.service";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  teachersList:Teacher[];

  constructor(private teachersService: TeachersService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.teachersService.getTeachers().subscribe(teachers=>{
      console.log(teachers);
      this.teachersList=teachers;
    })
  }

}
