import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminSectionComponent } from "./components/admin-section/admin-section.component";
import { ClassesComponent } from "./components/classes/classes.component";
import { CoursesComponent } from "./components/courses/courses.component";
import { ParentsStudentsComponent } from "./components/parents_students/parents-students/parents-students.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { SchedulesComponent } from "./components/schedules/schedules.component";
import { TeachersComponent } from "./components/teachers/teachers.component";


const routes: Routes = [
  {
    path: '',
    component: AdminSectionComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: 'teachers', component: TeachersComponent },
          { path: 'courses', component: CoursesComponent },
          { path: 'parentsStudentsInsert', component: ParentsStudentsComponent },
          { path: 'schedules', component: SchedulesComponent },
          { path: 'classes', component: ClassesComponent},
          { path: 'reports', component: ReportsComponent},
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
