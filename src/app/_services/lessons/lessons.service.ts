import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lesson } from "src/app/_models/lessons/lesson.model";
import { LessonPostDTO } from "src/app/_models/lessons/lessonPost.model";


@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  constructor(private http: HttpClient) {
  }

  addLesson(postModel: LessonPostDTO): Observable<any>  {
    return this.http.post<any>('https://uni-school-system.herokuapp.com/api/lessons',postModel);
  }

  getClassLessons(classId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('https://uni-school-system.herokuapp.com/api/lessonsClass/' + classId);
  }

  deleteLesson(id: number) {
    return this.http.delete<any>('https://uni-school-system.herokuapp.com/api/lessons/' + id)
  }

}
