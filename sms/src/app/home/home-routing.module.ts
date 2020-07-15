import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { RedComponent } from '../red/red.component';
import { BlueComponent } from '../blue/blue.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'red',
    component: RedComponent,
  },
  {
    path: 'blue',
    component: BlueComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
