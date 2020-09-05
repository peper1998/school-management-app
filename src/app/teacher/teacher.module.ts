import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherScheduleComponent } from './components/teacher-schedule/teacher-schedule.component';
import { TeacherSectionComponent } from './components/teacher-section/teacher-section.component';
import { TeacherCompetitionsComponent } from './components/teacher-competitions/teacher-competitions.component';
import { TeacherAttendanceComponent } from './components/teacher-attendance/teacher-attendance.component';

//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchedulerModule, SharedModule } from '@progress/kendo-angular-scheduler';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { course } from './components/_models/course';
import { entityClass } from './components/_models/entityClass';
import { supervisor } from './components/_models/supervisor';
import { teacher } from './components/_models/teacher';
import { teacherCourse } from './components/_models/teacherCourse';
import { teacherLessonsGet } from './components/_models/teacherLessonsGet';
import { Resolver } from './components/teacher-schedule/resolver';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TeacherMessagesComponent } from './components/teacher-messages/teacher-messages/teacher-messages.component';
import { TeacherMarksComponent } from './components/teacher-marks/teacher-marks/teacher-marks.component';
//import {SchedulerEvent} from '@progress/kendo-angular-scheduler';

@NgModule({
  declarations: [TeacherSectionComponent, TeacherScheduleComponent, TeacherCompetitionsComponent, TeacherAttendanceComponent, TeacherMessagesComponent, TeacherMarksComponent
  ], //course, entityClass, supervisor, teacher, teacherCourse, teacherLessonsGet
  imports: [
    CommonModule,
    TeacherRoutingModule,
  //  BrowserModule,
   // BrowserAnimationsModule,
    SchedulerModule,
    ReactiveFormsModule,
    SharedModule,
    GridModule,
    DateInputsModule,
    DropDownsModule,
    FormsModule,
  ],
  providers: [Resolver],
})
export class TeacherModule { }
