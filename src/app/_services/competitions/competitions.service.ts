import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthenticationService } from "../authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }

  getCompetitions(): Observable<CompetitionParticipation[]> {
    return this.http.get<CompetitionParticipation[]>('https://uni-school-system.herokuapp.com/api/competitionParticipationStudent/' + this.authService.userId);
  }
}

export interface CompetitionParticipation{
  id:number;
  competitionId:number;
  description:string;
  competitionName:string;
  descriptionCompetition: string;
  descriptionParticipation: string;
}
