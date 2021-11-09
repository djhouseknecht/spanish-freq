import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LemmaComponent } from './lemma/lemma.component';
import { WordComponent } from './word/word.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'word/:word', component: WordComponent },
  { path: 'lemma/:word', component: LemmaComponent },
  { path: '', component: MainComponent,/*  pathMatch: 'full' */ },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
