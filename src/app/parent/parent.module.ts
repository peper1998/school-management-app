import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentSectionComponent } from './parent-section/parent-section.component';
import { AccountComponent } from './account/account.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ConwersationComponent } from './conwersation/conwersation.component';
import { GradebookComponent } from './gradebook/gradebook.component';
import { SheduleComponent } from './shedule/shedule.component';


@NgModule({
  declarations: [
    ParentSectionComponent,
    AccountComponent,
    AchievementsComponent,
    AttendanceComponent,
    ConwersationComponent,
    GradebookComponent,
    SheduleComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    GridModule,
    ReactiveFormsModule,
    FormsModule,
    DateInputsModule
  ]
})
export class ParentModule { }
