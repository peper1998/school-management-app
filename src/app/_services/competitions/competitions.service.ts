import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private http: HttpClient) { }

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>('https://uni-school-system.herokuapp.com/api/competition');
  }
}

export interface Competition{
  id:number;
  description:string;
  name:string;
}
