import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseMarks } from "src/app/_models/marks/mark.model";

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  constructor(private http: HttpClient) { }

  getMarks(): Observable<CourseMarks[]> {
    return this.http.get<CourseMarks[]>('https://uni-school-system.herokuapp.com/api/myMarks');
  }
}
