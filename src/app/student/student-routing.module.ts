import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AttendanceComponent } from "./components/attendance/attendance.component";
import { CompetitionsComponent } from "./components/competitions/competitions.component";
import { GradebookComponent } from "./components/gradebook/gradebook.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { ScheduleComponent } from "./components/schedule/schedule.component";
import { StudentSectionComponent } from "./components/student-section/student-section.component";


const routes: Routes = [
  {
    path: '',
    component: StudentSectionComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'grades', component: GradebookComponent },
          { path: 'competitions', component: CompetitionsComponent },
          { path: 'schedule', component: ScheduleComponent },
          { path: 'attendance', component: AttendanceComponent },
          { path: 'messages', component: MessagesComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
