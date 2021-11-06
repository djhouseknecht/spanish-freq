import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { HrefToUse, ILemmaFormAgg, ILemmaSchema } from '../shared/interfaces';
import { DataService } from '../core/data.service';
import { Subject, takeUntil, Observable, combineLatest, filter, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'sf-lemma-freq',
  templateUrl: './lemma-freq.component.html',
  styleUrls: ['./lemma-freq.component.scss']
})
export class LemmaFreqComponent implements OnInit, AfterViewInit {
  lemmas!: ILemmaFormAgg[];
  @Input() activeTab!: Observable<'lemmas' | 'words'>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<ILemmaFormAgg>;
  displayedColumns: Array<keyof ILemmaFormAgg> = ['rank', 'word', 'total_conjugated_occurrences', 'conjugations'];

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
          if (activeTab === 'lemmas' && params.get('search') !== this.currentSearch) {
            return true;
          }
          return false;
        }),
        switchMap(([params, activeTab]) => {
          const search = params.get('search');
          this.currentSearch = search;
          console.log('fetching lemmas for component', { search, activeTab });
          return this.data.getSpanishLemmas$(params.get('search'));
        }),
        takeUntil(this.endSubs$)
      )
      .subscribe(lemmas => {
        this.lemmas = lemmas;
        this.dataSource = new MatTableDataSource<ILemmaFormAgg>(this.lemmas);
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
