import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentGet } from 'src/app/_models/parents/parent-get';
import { ParentStudentGet } from 'src/app/_models/parents/parent-student-get';
import { StudentGet } from 'src/app/_models/students/student-get';
import { StudentParentGet } from 'src/app/_models/students/student-parent-get';
import { Teacher } from 'src/app/_models/teachers/teacher.model';
import { UserPutDTO } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  
  public getTeachers() : Observable<Teacher[]>
  {
      return this.http.get<Teacher[]>('https://uni-school-system.herokuapp.com/api/teachers');
  }
  public getStudents(): Observable<StudentGet[]> 
  {
    return this.http.get<StudentGet[]>('https://uni-school-system.herokuapp.com/api/students');
  }
  public getParents(): Observable<ParentGet[]> 
  {
    return this.http.get<ParentGet[]>('https://uni-school-system.herokuapp.com/api/parents');
  }
  public getParentWithStudent(): Observable<ParentStudentGet[]> 
  {
    return this.http.get<ParentStudentGet[]>('https://uni-school-system.herokuapp.com/api/parentsWithStudents');
  }
  public getStudentWithParent(): Observable<StudentParentGet[]> 
  {
    return this.http.get<StudentParentGet[]>('https://uni-school-system.herokuapp.com/api/studentsWithParents');
  }
  public editUser(userPutDTO:UserPutDTO, id:number){
    return this.http.put<any>('https://uni-school-system.herokuapp.com/api/users/'+id, userPutDTO);
  }
}
