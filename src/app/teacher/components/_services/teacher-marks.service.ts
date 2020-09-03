import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { teacherLessonsGet } from '../_models/teacherLessonsGet';
import { entityClass } from '../_models/entityClass';
import { teachersCoursesGet } from '../_models/teacherCoursesGet';

@Injectable({
  providedIn: 'root'
})
export class TeacherMarksService {

  constructor(private http: HttpClient) { }
  getTeacherClasses():Observable<entityClass[]>{
    return this.http.get<entityClass[]>('https://uni-school-system.herokuapp.com/api/teacherClasses');
}
getTeacherCoursesOfGivenClassById(classId:number):Observable<teachersCoursesGet[]>{
  return this.http.get<teachersCoursesGet[]>('https://uni-school-system.herokuapp.com/api/teacherCourses/'+classId);
}

}
