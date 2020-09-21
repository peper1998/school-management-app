import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherScheduleComponent } from './components/teacher-schedule/teacher-schedule.component';
import { TeacherSectionComponent } from './components/teacher-section/teacher-section.component';
import { TeacherCompetitionsComponent } from './components/teacher-competitions/teacher-competitions.component';
import { TeacherAttendanceComponent } from './components/teacher-attendance/teacher-attendance.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Resolver } from './components/teacher-schedule/resolver';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TeacherMessagesComponent } from './components/teacher-messages/teacher-messages/teacher-messages.component';
import { TeacherMarksComponent } from './components/teacher-marks/teacher-marks/teacher-marks.component';
import { SharedModule } from '../shared.module/shared.module';
import { ClassAttendanceComponent } from './components/teacher-class-attendance/class-attendance/class-attendance.component';
//import {SchedulerEvent} from '@progress/kendo-angular-scheduler';

@NgModule({
  declarations: [TeacherSectionComponent, TeacherScheduleComponent, TeacherCompetitionsComponent,
     TeacherAttendanceComponent, TeacherMessagesComponent, TeacherMarksComponent, ClassAttendanceComponent
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
