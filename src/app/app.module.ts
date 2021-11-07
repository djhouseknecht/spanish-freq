import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { LemmaFreqComponent } from './lemma-list/lemma-list.component';
import { WordFreqComponent } from './word-list/word-list.component';
import { ListPipe } from './pipes/list.pipe';
import { MainComponent } from './main/main.component';
import { LemmaComponent } from './lemma/lemma.component';
import { WordLinksComponent } from './shared/word-links/word-links.component';
import { WordsLemmaFormsTableComponent } from './shared/words-lemma-forms-table/words-lemma-forms-table.component';
import { AnchorListComponent } from './shared/anchor-list/anchor-list.component';
import { WordComponent } from './word/word.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LemmaFreqComponent,
    WordFreqComponent,
    ListPipe,
    MainComponent,
    LemmaComponent,
    WordLinksComponent,
    WordsLemmaFormsTableComponent,
    AnchorListComponent,
    WordComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
