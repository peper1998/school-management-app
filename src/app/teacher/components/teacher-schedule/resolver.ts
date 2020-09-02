// resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TeacherScheduleServiceService } from '../_services/teacher-schedule-service.service';
import { teacherLessonsGet } from '../_models/teacherLessonsGet';
import { User } from 'src/app/_models/user';
import { LessonNumber } from 'src/app/_enums/LessonNumber';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { of } from 'rxjs';
import { ListModule } from '@progress/kendo-angular-buttons';
class parseData{
    id:number;
    start:Date;
    end:Date;
    title:String;
}
@Injectable()
export class Resolver implements Resolve<any> {
  constructor(private teacherServiceGet: TeacherScheduleServiceService) { }
  syf:SchedulerEvent[];
  baseData: parseData[] = new Array();
  lessonsGet: teacherLessonsGet[];
  idTeacher: User;
  resolve() {
    //   this.idTeacher = await this.getCurrentUserId();
    this.getCurrentUserIdPromise().then(res =>{
        this.idTeacher = res;
        this.getLessonsPromise(this.idTeacher.id).then(resp=>{
            this.lessonsGet=resp;
            this.pupulateSchedulerEvents();

        })});
        //console.log(this.syf);
        return this.syf;
  }
  pupulateSchedulerEvents()
  { 
    var i =0;
      for(let item of this.lessonsGet )
      {
        var lul = new parseData();
        lul.title = item.entityClass.name +" "+ item.teacherCourse.course.name;
        lul.id = item.id;
        var tmp = this.convertFromDayOfWeekToDate()[item.dayOfWeek];
        var tmp1 = item.lessonNumber;
        lul.start = new Date(tmp);
        lul.start.setHours(this.convertFromLessonsToHours(tmp1.toString()).hours,this.convertFromLessonsToHours(tmp1.toString()).StartMinutes);
        lul.end = new Date(tmp);
        lul.end.setHours(this.convertFromLessonsToHours(tmp1.toString()).hours,this.convertFromLessonsToHours(tmp1.toString()).endMinutes);
        this.baseData.push(lul);
      }
      this.syf = this.baseData.map(dataItem=> (
        <SchedulerEvent> {
            id: dataItem.id,
            start: dataItem.start,
            end: dataItem.end,
            title: dataItem.title
      }));
  }
//   resolve()
//   {
//       this.resolver().toPromise()
//       return of(this.syf);
//   }
  

//   baseData.map(dataItem => (
//     <SchedulerEvent> {
//         id: dataItem.TaskID,
//         start: parseAdjust(dataItem.Start),
//         startTimezone: dataItem.startTimezone,
//         end: parseAdjust(dataItem.End),
//         endTimezone: dataItem.endTimezone,
//         isAllDay: dataItem.IsAllDay,
//         title: dataItem.Title,
//         description: dataItem.Description,
//         recurrenceRule: dataItem.RecurrenceRule,
//         recurrenceId: dataItem.RecurrenceID,
//         recurrenceException: dataItem.RecurrenceException,

//         roomId: dataItem.RoomID,
//         ownerID: dataItem.OwnerID
//     }
// ));

  getLessons(id: number) {
    this.teacherServiceGet.getLessonsTeacher(id).subscribe(
      (value) => {
        this.lessonsGet = value;
        console.log(this.lessonsGet);

        //this.populateSchedulerEvents();
      },
      (error: any) => {
        alert("Nie udalo sie pobrac lekcji nauczyciela");
      }
    )
  }

  getLessonsPromise(id: number) {
    return this.teacherServiceGet.getLessonsTeacher(id).toPromise();

  }
  getCurrentUserIdPromise() {
    return this.teacherServiceGet.getCurrentTeacherId().toPromise();
  }

  // FIRST = 1, SECOND = 2, THIRD = 3, FOURTH= 4, FIFTH=5, SIXTH=6, SEVENTH=7, EIGHTH=8, NINTH=9
  convertFromLessonsToHours(i: String) {
    var start = 0;
    var end = 45;
    var tmp = i as keyof typeof LessonNumber;
    var hours = 7 + LessonNumber[tmp];
    return { hours: hours, StartMinutes: start, endMinutes:end};
  }

  convertFromDayOfWeekToDate() {
    var date = new Date();
    var tmp = date.getDay();
    if (tmp - 5 <= 0) {
      return {
        MONDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 1 - tmp),
        TUESDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 2 - tmp),
        WEDNESDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 3 - tmp),
        THURSDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 4 - tmp),
        FRIDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 5 - tmp)
      }
    }
    else if (tmp - 4 <= 0) {
      return {
        MONDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 1 - tmp),
        TUESDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 2 - tmp),
        WEDNESDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 3 - tmp),
        THURSDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 4 - tmp),
        FRIDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5 - tmp)
      }
    }
    else if (tmp - 3 <= 0) {
      return {
        MONDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 1 - tmp),
        TUESDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 2 - tmp),
        WEDNESDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 3 - tmp),
        THURSDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4 - tmp),
        FRIDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5 - tmp)
      }
    }
    else if (tmp - 2 <= 0) {
      return {
        MONDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 1 - tmp),
        TUESDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 2 - tmp),
        WEDNESDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3 - tmp),
        THURSDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4 - tmp),
        FRIDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5 - tmp)
      }
    }
    else if (tmp - 1 <= 0) {
      return {
        MONDAY: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 1 - tmp),
        TUESDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2 - tmp),
        WEDNESDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3 - tmp),
        THURSDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4 - tmp),
        FRIDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5 - tmp)
      }
    }
    else {
      return {
        MONDAY: new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate() + 1 - tmp),
        TUESDAY: new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate() + 2 - tmp),
        WEDNESDAY: new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate() + 3 - tmp),
        THURSDAY: new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate() + 4 - tmp),
        FRIDAY: new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate() + 5 - tmp)
      }
    }

  }

  // populateSchedulerEvents()
  // {
  //   for(let i =0;i<this.lessonsGet.length;i++)
  //   {
  //     this.events[i]
  //     this.events[i].title = this.lessonsGet[i].entityClass.name + " " + this.lessonsGet[i].teacherCourse.course.name;
  //     console.log(this.events[i].title);
  //   }
  // }
  getCurrentUserId() {
    this.teacherServiceGet.getCurrentTeacherId().subscribe(
      (value) => {
        this.idTeacher = value;
        console.log(this.idTeacher.id);
        console.log("dziala");
        this.getLessons(this.idTeacher.id);
      },
      (error) => {
        alert("Nie udalo sie pobrac id nauczyciela");
      }
    )
  }
}