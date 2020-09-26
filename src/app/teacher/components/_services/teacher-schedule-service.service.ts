import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { teacherLessonsGet } from '../_models/teacherLessonsGet';
import { User } from 'src/app/_models/user';
import { AttendanceGet } from 'src/app/_models/attendance/attendance-get';
import { AttendanceClassGet } from 'src/app/_models/attendance/attendance-class-get';
//import { defaultMaxListeners } from 'stream';

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
  getStudentLessonsById(id:number):Observable<teacherLessonsGet[]>{
    return this.http.get<teacherLessonsGet[]>('https://uni-school-system.herokuapp.com/api/lessonsClass/'+id);
  }
  getAttendanceById(id:number):Observable<AttendanceGet[]> {
    return this.http.get<AttendanceGet[]>('https://uni-school-system.herokuapp.com/api/classAttendance/'+id);
  }
  getMyAttendance():Observable<AttendanceGet[]>{
    return this.http.get<AttendanceGet[]>('https://uni-school-system.herokuapp.com/api/myAttendance/');
  }
  getMyClassAttendance():Observable<AttendanceClassGet[]>{
    return this.http.get<AttendanceClassGet[]>('https://uni-school-system.herokuapp.com/api/classAttendance');
  }
  editAttendance(id:number) {
    var emptyJson = {};
    return this.http.put<any>('https://uni-school-system.herokuapp.com/api/attendance/'+id,emptyJson);
  }
}
