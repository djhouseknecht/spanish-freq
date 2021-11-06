import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, combineLatest, filter, switchMap, takeUntil } from 'rxjs';
import { DataService } from '../core/data.service';
import { IWordSchema } from '../shared/interfaces';

@Component({
  selector: 'sf-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordFreqComponent implements OnInit {
  words!: IWordSchema[];
  @Input() activeTab!: Observable<'lemmas' | 'words'>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<IWordSchema>;
  displayedColumns: Array<keyof IWordSchema> = ['rank', 'word', 'occurrences', 'lemma_forms'];

  currentSearch?: string | null;

  private endSubs$ = new Subject<void>();

  constructor (private data: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit (): void {
    combineLatest([
      this.activatedRoute.queryParamMap,
      this.activeTab
    ])
      .pipe(
        filter(([params, activeTab]) => {
          if (activeTab === 'words' && params.get('search') !== this.currentSearch) {
            return true;
          }
          return false;
        }),
        switchMap(([params, activeTab]) => {
          const search = params.get('search');
          this.currentSearch = search;
          console.log('fetching words for component', { search, activeTab });
          return this.data.getSpanishWords$(params.get('search'));
        }),
        takeUntil(this.endSubs$)
      )
      .subscribe(words => {
        this.words = words;
        words[0].occurrences
        this.dataSource = new MatTableDataSource<IWordSchema>(this.words);
        this.ngAfterViewInit();
      });
  }

  ngAfterViewInit () {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy () {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
