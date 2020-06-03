import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as shared from './index';
import { LogoutBarComponent } from './components/logout-bar/logout-bar.component'

@NgModule({
  declarations: [
    shared.BarComponent,
    shared.BarHeaderComponent,
    shared.BarItemComponent,
    shared.LogoutBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    shared.BarComponent,
    shared.BarHeaderComponent,
    shared.BarItemComponent,
    shared.LogoutBarComponent
  ]
})
export class SharedModule { }
