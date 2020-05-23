import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassSectionComponent } from './components/class-section/class-section.component';
import { DatePipe } from '@angular/common';
import { ClassScheduleComponent } from './components/class-schedule/class-schedule.component';


const routes: Routes = [
  {
    path: '',
    component: ClassSectionComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        //canActivateChild: [AuthGuard],
        children: [
          { path: 'schedule', component: ClassScheduleComponent }
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
export class ClassRoutingModule { }
