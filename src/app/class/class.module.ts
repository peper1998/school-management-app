import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { ClassSectionComponent } from './components/class-section/class-section.component';
import { ClassScheduleComponent } from './components/class-schedule/class-schedule.component';

@NgModule({
  declarations: [ClassSectionComponent, ClassScheduleComponent],
  imports: [
    CommonModule,
    ClassRoutingModule
  ]
})
export class ClassModule { }
