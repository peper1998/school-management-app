import { Component, OnInit } from '@angular/core';
import { ParentGet } from 'src/app/_models/parents/parent-get';
import { StudentGet } from 'src/app/_models/students/student-get';
import { Teacher } from 'src/app/_models/teachers/teacher.model';
import { UsersService } from 'src/app/_services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  teachersList:Teacher[];
  studentsList:StudentGet[];
  parentsList:ParentGet[];
  constructor(private usersService:UsersService, ) { }

  ngOnInit(): void {
    this.usersService.getStudents().subscribe(res=> {
      this.studentsList = res;
    })
    this.usersService.getParents().subscribe(res=> {
      this.parentsList = res;
    })
    this.usersService.getTeachers().subscribe(res=> {
      this.teachersList = res;
    })
  }

}
