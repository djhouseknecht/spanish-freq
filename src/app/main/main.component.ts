import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, takeUntil, Subject, distinctUntilChanged } from 'rxjs';
import { IListState, Tabs } from '../shared/interfaces';

@Component({
  selector: 'sf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private endSubs$ = new Subject<void>();
  private _listState$ = new BehaviorSubject<IListState>({
    search: '',
    tab: 'lemmas'
  });

  tabs = ['lemmas', 'words'] as const;
  searchControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  selectedTabIndex: number = 0;
  listState$!: Observable<IListState>;

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  tabChanged (event: MatTabChangeEvent) {
    const tab = this.tabs[event.index];
    this.emitState({ tab });
    this.routeWithQueryParams();
  }

  ngOnInit () {
    this.listState$ = this._listState$.asObservable().pipe(
      distinctUntilChanged((prev, curr) => {
        return prev.search === curr.search &&
          prev.tab === curr.search;
      })
    );

    this.activatedRoute.queryParamMap
      .pipe(takeUntil(this.endSubs$))
      .subscribe((queryParams) => {
        const search = queryParams.get('search');
        let tab = queryParams.get('tab') as Tabs | null;

        if (search && search !== this.searchControl.value) {
          this.searchControl.patchValue(search);
        }

        const { tab: currTab, search: currSearch } = this._listState$.getValue();
        if (!tab) {
          tab = 'lemmas';
        }

        if (currSearch !== search || currTab !== tab) {
          this.emitState({ tab, search });

          const index = this.tabs.indexOf(tab);
          this.selectedTabIndex = index;
        }
      });
  }

  search (clear = false) {
    const search = clear ? null : this.searchControl.value;
    if (clear) {
      this.searchControl.patchValue(null);
    }

    this.emitState({ search });
    this.routeWithQueryParams();
  }

  ngOnDestroy () {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private routeWithQueryParams (): void {
    const state = this._listState$.getValue();
    if (state.search === '') {
      state.search === null; // this ensures we don't have an empty query param
    }

    this.router.navigate([''], {
      queryParams: { ...state },
      queryParamsHandling: 'merge'
    });
  }

  private emitState (state: Partial<IListState>): void {
    this._listState$.next({
      ...this._listState$.getValue(),
      ...state
    });
  }
}
