import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherScheduleComponent } from './components/teacher-schedule/teacher-schedule.component';
import { TeacherSectionComponent } from './components/teacher-section/teacher-section.component';
import { TeacherCompetitionsComponent } from './components/teacher-competitions/teacher-competitions.component';
import { TeacherAttendanceComponent } from './components/teacher-attendance/teacher-attendance.component';

//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ReactiveFormsModule } from '@angular/forms';
import { course } from './components/_models/course';
import { entityClass } from './components/_models/entityClass';
import { supervisor } from './components/_models/supervisor';
import { teacher } from './components/_models/teacher';
import { teacherCourse } from './components/_models/teacherCourse';
import { teacherLessonsGet } from './components/_models/teacherLessonsGet';
//import {SchedulerEvent} from '@progress/kendo-angular-scheduler';

@NgModule({
  declarations: [TeacherSectionComponent, TeacherScheduleComponent, TeacherCompetitionsComponent, TeacherAttendanceComponent
  ], //course, entityClass, supervisor, teacher, teacherCourse, teacherLessonsGet
  imports: [
    CommonModule,
    TeacherRoutingModule,
  //  BrowserModule,
   // BrowserAnimationsModule,
    SchedulerModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
