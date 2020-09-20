import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentGet } from 'src/app/_models/students/student-get';
import { ParentGet } from 'src/app/_models/parents/parent-get';
import { MessagesGet } from 'src/app/_models/messages/messages-get';
import { ConversationGet } from 'src/app/_models/messages/conversation-get';
import { TeacherGet } from 'src/app/_models/teachers/teacher-get';

@Injectable({
  providedIn: 'root'
})
export class TeacherMessagesService {

  constructor(private http: HttpClient) { }

  getTeacherMessages() {
    return this.http.get<MessagesGet[]>('https://uni-school-system.herokuapp.com/api/conversations');
  }
  getStudents() {
    return this.http.get<StudentGet[]>('https://uni-school-system.herokuapp.com/api/students');
  }
  getParents() {
    return this.http.get<ParentGet[]>('https://uni-school-system.herokuapp.com/api/parents');
  }
  getTeachers() {
    return this.http.get<TeacherGet[]>('https://uni-school-system.herokuapp.com/api/teachers');
  }
  getCurrentUser() {
    return this.http.get<ParentGet[]>('https://uni-school-system.herokuapp.com/api/currentUser');
  }
  sendNewMessage(message){
    return this.http.post<any>('https://uni-school-system.herokuapp.com/api/conversations',message);
  }
  answerToConversation(message){
    return this.http.post<any>('https://uni-school-system.herokuapp.com/api/messages', message);
  }
  getConversationsById(id){
    return this.http.get<ConversationGet[]>('https://uni-school-system.herokuapp.com/api/messages/'+ id);
  }
}
