import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LemmaComponent } from './lemma/lemma.component';
import { WordComponent } from './word/word.component';

const routes: Routes = [
  // { path: 'lemmas', component: MainComponent },
  // { path: 'conjugates', component: MainComponent },
  { path: 'word/:word', component: WordComponent },
  { path: 'lemma/:word', component: LemmaComponent },
  { path: '', component: MainComponent,/*  pathMatch: 'full' */ },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
