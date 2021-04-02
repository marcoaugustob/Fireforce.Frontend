import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';

const routes: Routes = [{
  path: '', children: [
    {
      //TO DO ROUTER GUARD
      path: '', redirectTo: 'home'
    },
    {
      path: 'home', component: HomeComponent, data: { title: 'Home' }, children: [
        // { path: '', component: SidebarUserInfoComponent, outlet: 'sidebar-filter' }
      ]
    },
  ]
}];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class FullPagesRoutingModule { }
