import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentSectionComponent } from './components/student-section/student-section.component';
import { AccountComponent } from './components/account/account.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ConwersationComponent } from './components/conwersation/conwersation.component';
import { GradebookComponent } from './components/gradebook/gradebook.component';
import { SheduleComponent } from './components/shedule/shedule.component';

const routes: Routes = [
  {
    path: '',
    component: StudentSectionComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        //canActivateChild: [AuthGuard],
        children: [
          { path: 'gradebook', component: GradebookComponent},
          { path: 'attendance', component: AttendanceComponent},
          { path: 'achievements', component: AchievementsComponent},
          { path: 'shedule', component: SheduleComponent},
          { path: 'conwersation', component: ConwersationComponent},
          { path: 'account', component: AccountComponent}
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
