import { Injectable } from '@angular/core';
import { MarkCourse } from 'src/app/_models/mark/mark-course';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

constructor(private http: HttpClient) { }

getMarks(): Observable<MarkCourse[]> {
  return this.http.get<MarkCourse[]>('https://uni-school-system.herokuapp.com/api/myMarks');
  }

}
