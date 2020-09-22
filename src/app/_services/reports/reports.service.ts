import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getClassesAttendance(): Observable<ClassAttendance[]> {
    return this.http.get<ClassAttendance[]>('https://uni-school-system.herokuapp.com/api/report/attendanceClasses');
  }

  getTeacherAttendance(): Observable<TeacherAttendance[]> {
    return this.http.get<TeacherAttendance[]>('https://uni-school-system.herokuapp.com/api/report/attendanceTeachers');
  }

  getClassesGrades(): Observable<ClassGrades[]> {
    return this.http.get<ClassGrades[]>('https://uni-school-system.herokuapp.com/api/report/classStudentsAverageGrades');
  }
}

export interface ClassAttendance{
  className:string;
  hoursPerWeek:number;
  totalHours:number;
  students:StudentAttendance
}

export interface StudentAttendance{
  firstName:string;
  lastName:string;
  attendedHours:string;
}

export interface TeacherAttendance
{
  firstName:string;
  lastName:string;
  attendedHours:number;
  hoursPerWeek:number;
  totalHours:number;
}

export interface ClassGrades{
  className:string;
  studentAverageGrades:StudentGrades[];
}

export interface StudentGrades{
  firstName:string;
  lastName:string;
  averageGradeTotal:number;
  courseGrades:CourseGrade[];
}

export interface CourseGrade{
  courseName:string;
  averageGrade:number;
}
