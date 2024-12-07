import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoUserComponent } from './info-user/info-user.component';

const routes: Routes = [
  {
    path: '',
    component: InfoUserComponent
  },
  {
    path: 'info-user',
    component: InfoUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashUserRoutingModule { }
