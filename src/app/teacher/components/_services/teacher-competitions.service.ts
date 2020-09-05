import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionParticipationGetDTO } from '../_models/CompetitionParticipationGetDTO';
import { HttpClient } from '@angular/common/http';
import { CompetitionGetDTO } from '../_models/CompetitionGetDTO';
import { CompetitionPostDTO } from '../_models/CompetitionPostDTO';

@Injectable({
  providedIn: 'root'
})
export class TeacherCompetitionsService {

  constructor(private http: HttpClient) { }
  getTeacherCompetitions():Observable<CompetitionGetDTO[]>{
    return this.http.get<CompetitionGetDTO[]>('https://uni-school-system.herokuapp.com/api/competition');
  }
  postNewCompetition(competitionPostDTO:CompetitionPostDTO){
    return this.http.post<CompetitionPostDTO>('https://uni-school-system.herokuapp.com/api/competition',competitionPostDTO);
  }
  editCompetition(competitionPostDTO:CompetitionPostDTO,competitionId){
    return this.http.put<CompetitionPostDTO>('https://uni-school-system.herokuapp.com/api/competition/'+competitionId,competitionPostDTO);
  }
}
