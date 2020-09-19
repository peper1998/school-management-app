import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { GridModule } from "@progress/kendo-angular-grid";

import { GradebookComponent } from "./components/gradebook/gradebook.component";
import { StudentSectionComponent } from "./components/student-section/student-section.component";
import { StudentRoutingModule } from "./student-routing.module";
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { MessagesComponent } from './components/messages/messages.component';


@NgModule({
  declarations: [StudentSectionComponent, GradebookComponent, CompetitionsComponent, ScheduleComponent, AttendanceComponent, MessagesComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    DropDownsModule,
    FormsModule,
    GridModule
  ]
})
export class StudentModule { }
