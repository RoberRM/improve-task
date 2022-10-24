import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRoutingModule } from './main/main.routing';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MainRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
