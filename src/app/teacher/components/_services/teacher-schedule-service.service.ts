import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherScheduleServiceService {

  constructor(private http: HttpClient) 
  { 

  }
  getClasses():Observable<ClassModel[]>{
    return this.http.get<ClassModel[]>('https://uni-school-system.herokuapp.com/api/classes')
}
}
