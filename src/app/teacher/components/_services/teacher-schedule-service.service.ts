import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { teacherLessonsGet } from '../_models/teacherLessonsGet';
import { User } from 'src/app/_models/user';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
//import { defaultMaxListeners } from 'stream';
import { LessonNumber } from 'src/app/_enums/LessonNumber';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherScheduleServiceService {

  constructor(private http: HttpClient) 
  { 

  }
  getLessonsTeacher(id:number):Observable<teacherLessonsGet[]>{
    return this.http.get<teacherLessonsGet[]>('https://uni-school-system.herokuapp.com/api/lessonsTeacher/'+id);
}
  getCurrentTeacherId():Observable<User>
  {
    return this.http.get<User>('https://uni-school-system.herokuapp.com/api/currentUser');
  }
  // mapData(TeacherLessonsGet:any):SchedulerEvent[]
  // {
  //   const sampleDataWithResources = TeacherLessonsGet.map(dataItem => (
  //     <SchedulerEvent> {
  //         id: dataItem.id,
  //         start: parseAdjust(dataItem.Start),
  //         startTimezone: dataItem.startTimezone,
  //         end: parseAdjust(dataItem.End),
  //         endTimezone: dataItem.endTimezone,
  //         isAllDay: dataItem.IsAllDay,
  //         title: dataItem.entityClass.name + " " + dataItem.teacherCourse.course.name,
  //         description: dataItem.Description,
  //         recurrenceRule: dataItem.RecurrenceRule,
  //         recurrenceId: dataItem.RecurrenceID,
  //         recurrenceException: dataItem.RecurrenceException,
  //     }
  // ));
  // return sampleDataWithResources;
  // }
  // parseStart(dataItem):Date
  // {
  //   let tmp = new Date();
  //   tmp.setHours(dataItem.lessonNumber)
  // }
  parseEnd()
  {

  }
  parseAdjustStart = (lessonNumber:LessonNumber): Date => {
    const date = new Date();
    date.setHours(lessonNumber+8);
    date.setMinutes(0);
   // date.s()

   // date.setFullYear(date.);
    return date;
};
  // parseLessonNumberToHours(lessonNumber:LessonNumber):number[]
  // {
  //   var num:number[];
  //   switch(lessonNumber)
  //   {
  //     case 1:
  //     {
  //       num[0]=8;
  //       num[1]=0;
  //       num[2]=8;
  //       num[3]=45;
  //       break;
  //     }
  //     case 2:
  //     {  
  //       num[0]=9;
  //       num[1]=0;
  //       num[2]=9;
  //       num[3]=45;
  //       break;
  //     } 
  //     case 3:
  //     {
  //       num[0]=10;
  //       num[1]=0;
  //       num[2]=10;
  //       num[3]=45;  
  //       break;
  //     }
  //     case 4:
  //     { 
  //       num[0]=11;
  //       num[1]=0;
  //       num[2]=11;
  //       num[3]=45;   
  //       break;
  //     }   
  //     case 5:
  //     {
  //       num[0]=12;
  //       num[1]=0;
  //       num[2]=12;
  //       num[3]=45;
  //       break;
  //     }
  //     case 6:
  //     {
  //       num[0]=13;
  //       num[1]=0;
  //       num[2]=13;
  //       num[3]=45;
  //       break;
  //     } 
  //       case 7:
  //         {
  //           num[0]=14;
  //           num[1]=0;
  //           num[2]=14;
  //           num[3]=45;
  //           break;
  //         }

  //   }
  //   return num;
  // }
}
