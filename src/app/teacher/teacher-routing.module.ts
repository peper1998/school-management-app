import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherSectionComponent } from './components/teacher-section/teacher-section.component';
import { DatePipe } from '@angular/common';
import { TeacherScheduleComponent } from './components/teacher-schedule/teacher-schedule.component';
import { TeacherCompetitionsComponent } from './components/teacher-competitions/teacher-competitions.component';
import { TeacherAttendanceComponent } from './components/teacher-attendance/teacher-attendance.component';
import { Resolver } from './components/teacher-schedule/resolver';
import { TeacherMarksComponent } from './components/teacher-marks/teacher-marks/teacher-marks.component';
import { TeacherMessagesComponent } from './components/teacher-messages/teacher-messages/teacher-messages.component';
import { ClassAttendanceComponent } from './components/teacher-class-attendance/class-attendance/class-attendance.component';


const routes: Routes = [
  {
    path: '',
    component: TeacherSectionComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: 'schedule', component: TeacherScheduleComponent, resolve:{events:Resolver } },
          { path: 'competitions', component: TeacherCompetitionsComponent },
          { path: 'attendance', component: TeacherAttendanceComponent },
          { path: 'marks', component: TeacherMarksComponent },
          { path: 'messages', component: TeacherMessagesComponent },
          { path: 'class-attendance', component: ClassAttendanceComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class TeacherRoutingModule { }
