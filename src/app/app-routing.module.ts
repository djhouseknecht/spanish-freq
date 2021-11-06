import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  // { path: 'lemmas', component: MainComponent },
  // { path: 'conjugates', component: MainComponent },
  { path: '', component: MainComponent,/*  pathMatch: 'full' */ },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
