import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { teacherLessonsGet } from '../_models/teacherLessonsGet';
import { User } from 'src/app/_models/user';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
//import { defaultMaxListeners } from 'stream';
import { LessonNumber } from 'src/app/_enums/LessonNumber';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherScheduleServiceService {

  constructor(private http: HttpClient) 
  { 

  }
  getLessonsTeacher(id:number):Observable<teacherLessonsGet[]>{
    return this.http.get<teacherLessonsGet[]>('https://uni-school-system.herokuapp.com/api/lessonsTeacher/'+id);
}
  getCurrentTeacherId():Observable<User>
  {
    return this.http.get<User>('https://uni-school-system.herokuapp.com/api/currentUser');
  }
}
