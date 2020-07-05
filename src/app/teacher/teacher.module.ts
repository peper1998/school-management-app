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

@NgModule({
  declarations: [TeacherSectionComponent, TeacherScheduleComponent, TeacherCompetitionsComponent, TeacherAttendanceComponent],
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
