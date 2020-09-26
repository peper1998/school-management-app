import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentGet } from 'src/app/_models/parents/parent-get';
import { StudentGet } from 'src/app/_models/students/student-get';
import { Teacher } from 'src/app/_models/teachers/teacher.model';

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
}
