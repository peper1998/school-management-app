import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentSectionComponent } from './parent-section/parent-section.component';
import { AccountComponent } from './account/account.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ConversationComponent } from './conversation/conversation.component';
import { GradebookComponent } from './gradebook/gradebook.component';
import { SheduleComponent } from './shedule/shedule.component';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

const routes: Routes = [
  {
    path: '',
    component: ParentSectionComponent,
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
          { path: 'conversation', component: ConversationComponent},
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
export class ParentRoutingModule { }
