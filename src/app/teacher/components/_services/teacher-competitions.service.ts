import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionParticipationGetDTO } from '../_models/CompetitionParticipationGetDTO';
import { HttpClient } from '@angular/common/http';
import { CompetitionGetDTO } from '../_models/CompetitionGetDTO';
import { CompetitionPostDTO } from '../_models/CompetitionPostDTO';
import { StudentGet } from 'src/app/_models/students/student-get';
import { CompetitionParticipationPostDTO } from '../_models/CompetitionParticipationPostDTO';
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
  deleteCompetition(competitionId:number) {
    return this.http.delete<any>('https://uni-school-system.herokuapp.com/api/competition/'+competitionId);
  }
  getStudentsAssignedToCompetition(competitionId:number) {
    return this.http.get<CompetitionParticipationGetDTO[]>('https://uni-school-system.herokuapp.com/api/competitionParticipation/'+competitionId);
  }
  getAllStudentAssignmentsToCompetitions(){
    return this.http.get<CompetitionParticipationGetDTO[]>('https://uni-school-system.herokuapp.com/api/competitionParticipation');
  }
  getSrudents() {
    return this.http.get<StudentGet[]>('https://uni-school-system.herokuapp.com/api/students');
  }
  assignStudentToComptetition(competitionParticipationPostDTO:CompetitionParticipationPostDTO){
    return this.http.post<CompetitionParticipationPostDTO>('https://uni-school-system.herokuapp.com/api/competitionParticipation',competitionParticipationPostDTO);
  }
  deassignStudentToComptetition(competitionId:number){
    return this.http.delete<any>('https://uni-school-system.herokuapp.com/api/competitionParticipation/'+competitionId);
  }
}
