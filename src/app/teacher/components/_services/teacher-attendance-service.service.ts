import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { teacherLessonsGet } from '../_models/teacherLessonsGet';
import { lessonAttendaceDTO } from '../_models/lessonAttendanceDTO';

@Injectable({
  providedIn: 'root'
})
export class TeacherAttendanceServiceService {

  constructor(private http: HttpClient) { }
  getAttendance():Observable<lessonAttendaceDTO> {
      return this.http.get<lessonAttendaceDTO>('https://uni-school-system.herokuapp.com/api/attendanceInit');
  }
  postAttendance(lessonAttendaceDTO:lessonAttendaceDTO):any{
    return this.http.post<lessonAttendaceDTO>('https://uni-school-system.herokuapp.com/api/attendance', lessonAttendaceDTO);
  }
}
