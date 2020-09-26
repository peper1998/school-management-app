import { Component, OnInit } from '@angular/core';
import { ParentGet } from 'src/app/_models/parents/parent-get';
import { ParentStudentGet } from 'src/app/_models/parents/parent-student-get';
import { StudentGet } from 'src/app/_models/students/student-get';
import { StudentParentGet } from 'src/app/_models/students/student-parent-get';
import { Teacher } from 'src/app/_models/teachers/teacher.model';
import { UsersService } from 'src/app/_services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  teachersList:Teacher[];
  studentsList:StudentParentGet[];
  parentsList:ParentStudentGet[];
  constructor(private usersService:UsersService, ) { }

  ngOnInit(): void {
    this.usersService.getStudentWithParent().subscribe(res=> {
      this.studentsList = res;
      console.log(res);
    })
    this.usersService.getParentWithStudent().subscribe(res=> {
      this.parentsList = res;
    })
    this.usersService.getTeachers().subscribe(res=> {
      this.teachersList = res;
      this.teachersList.forEach(e=> {
        e.displayDate =e.birthDate.toString();
      })
    })
  }

}
