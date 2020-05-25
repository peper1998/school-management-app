import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSectionComponent } from './components/admin-section/admin-section.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ParentStudentCreationModel } from '../_models/parents_students/parent-student.model';
import { ParentsStudentsComponent } from './components/parents_students/parents-students/parents-students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ClassesComponent } from './components/classes/classes.component';
import { SchedulesComponent } from './components/schedules/schedules.component';


const routes: Routes = [
  {
    path: '',
    component: AdminSectionComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        //canActivateChild: [AuthGuard],
        children: [
          { path: 'teachers', component: TeachersComponent },
          { path: 'courses', component: CoursesComponent },
          { path: 'parentsStudentsInsert', component: ParentsStudentsComponent },
          { path: 'schedules', component: SchedulesComponent },
          { path: 'classes', component: ClassesComponent},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
