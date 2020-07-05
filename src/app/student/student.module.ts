import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from '@progress/kendo-angular-grid';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownListComponent, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { StudentRoutingModule } from './student-routing.module';
import { StudentSectionComponent } from './components/student-section/student-section.component';
import { AccountComponent } from './components/account/account.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ConwersationComponent } from './components/conwersation/conwersation.component';
import { GradebookComponent } from './components/gradebook/gradebook.component';
import { SheduleComponent } from './components/shedule/shedule.component';

@NgModule({
  declarations: [
    StudentSectionComponent,
    GradebookComponent,
    AccountComponent,
    AchievementsComponent,
    AttendanceComponent,
    ConwersationComponent,
    GradebookComponent,
    SheduleComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    GridModule,
    ReactiveFormsModule,
    DateInputsModule,
    DropDownsModule,
    FormsModule,
  ]
})
export class StudentModule { }
