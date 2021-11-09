import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil, filter, tap, switchMap } from 'rxjs';
import { IListState, Tabs, IWordSchema, ILemmaFormAgg } from '../shared/interfaces';
import { DataService } from '../core/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sf-word-listing',
  templateUrl: './word-listing.component.html',
  styleUrls: ['./word-listing.component.scss']
})
export class WordListingComponent implements OnInit, AfterViewInit, OnDestroy {
  private endSubs$ = new Subject<void>();

  @Input()
  listState$!: Observable<IListState>;

  @Input()
  listType!: Tabs;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<IWordSchema | ILemmaFormAgg>();
  displayedColumns = ['rank', 'word', 'occurrences', 'lists'];

  words: IWordSchema[] | ILemmaFormAgg[] = [];
  currentSearch?: string | null;
  linkTo!: '/word' | '/lemma';

  constructor (private data: DataService) { }

  ngOnInit (): void {
    this.linkTo = this.isLemma() ? '/lemma' : '/word';
  }

  ngAfterViewInit () {
    this.listState$.pipe(
      filter(state => state.tab === this.listType && this.currentSearch !== state.search),
      tap(state => this.currentSearch = state.search),
      switchMap(state => {
        return this.isLemma()
          ? this.data.getLemmas$(state.search)
          : this.data.getWords$(state.search);
      }),
      takeUntil(this.endSubs$)
    ).subscribe(words => {
      if (!this.dataSource.sort) {
        this.dataSource.sort = this.sort;
      }

      if (!this.dataSource.paginator) {
        this.dataSource.paginator = this.paginator;
      }

      this.words = words;
      this.dataSource.data = words;
    });
  }

  isLemma (word?: any): word is ILemmaFormAgg {
    return this.listType === 'lemmas';
  }

  ngOnDestroy () {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
