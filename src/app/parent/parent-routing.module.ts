import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ParentSectionComponent } from "./parent-section/parent-section.component";


const routes: Routes = [
  {
    path: '',
    component: ParentSectionComponent,
    // canActivate: [AuthGuard],
    children: [
      {
          path:''
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
