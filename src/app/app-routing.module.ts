import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { NewChecklistComponent } from './new-checklist/new-checklist.component';
import {SignInComponent} from './sign-in/sign-in.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newchecklist', component: NewChecklistComponent },
  { path: '**', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
