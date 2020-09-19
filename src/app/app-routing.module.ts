import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserType } from "./_enums/UserType";
import { AuthGuard } from "./_guards/AuthGuard";
import { LoginComponent } from "./components/login/login.component";


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: [UserType.ADMIN]}
  },
  {
    path: 'teacher',
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
    canActivate: [AuthGuard],
    data: { roles: [UserType.TEACHER]}
  },
  {
    path: 'parent',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: { roles: [UserType.PARENT]}
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: { roles: [UserType.STUDENT]}
  },
  {
    path: 'class',
    loadChildren: () => import('./class/class.module').then(m => m.ClassModule),
    canActivate: [AuthGuard],
    data: { roles: [UserType.STUDENT]}
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
