import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Lesson} from 'src/app/_models/lessons/lesson.model'
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
    providedIn: 'root'
  })
export class LessonsService{

  constructor(private http: HttpClient){}

  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('https://uni-school-system.herokuapp.com/api/lessons');
    }
}
