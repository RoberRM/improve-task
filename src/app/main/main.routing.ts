import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';

const routes: Routes = [
    { 
        path: 'main', 
        component: MainComponent,
        loadChildren: () => import('./main-routes.module').then( m => m.MainRoutesModule )
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class MainRoutingModule {}


