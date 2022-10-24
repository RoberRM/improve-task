import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const childRoutes: Routes = [
  { path: '', component: MainComponent, data: { titulo: 'Dashboard' } },
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class MainRoutesModule { }
