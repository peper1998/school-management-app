import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { teacherLessonsGet } from '../_models/teacherLessonsGet';
import { entityClass } from '../_models/entityClass';
import { teachersCoursesGet } from '../_models/teacherCoursesGet';
import { StudentCreationModel } from 'src/app/_models/parents_students/student.model';
import { studentDisplayGradesModel } from '../_models/studentDisplayGradesModel';
import { StudentMarksGetDTO } from '../_models/StudentMarksGetDTO'
import { MarkPostDTO } from '../_models/MarkPostDTO';
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
getStudentsOfGivenClassById(classId:Number):Observable<studentDisplayGradesModel[]>{
  return this.http.get<studentDisplayGradesModel[]>('https://uni-school-system.herokuapp.com/api/students/'+classId);
}
// /api/marks/{classId}/{teacherCourseId}
getStudentsGrades(classId:Number,teacherCourseId:Number):Observable<StudentMarksGetDTO[]>{
  return this.http.get<StudentMarksGetDTO[]>('https://uni-school-system.herokuapp.com/api/marks/'+classId+'/'+teacherCourseId);
}
postNewMark(markPostDTO:MarkPostDTO):Observable<MarkPostDTO>{
  return this.http.post<MarkPostDTO>('https://uni-school-system.herokuapp.com/api/marks',markPostDTO);
}
editMark(markPostDTO:MarkPostDTO, id:Number):Observable<MarkPostDTO>{
  return this.http.put<MarkPostDTO>('https://uni-school-system.herokuapp.com/api/marks/'+id,markPostDTO);
}
deleteMark(id:Number):Observable<MarkPostDTO>{
  return this.http.delete<MarkPostDTO>('https://uni-school-system.herokuapp.com/api/marks/'+id);
}
}
