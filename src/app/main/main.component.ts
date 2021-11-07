import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, take, takeUntil, Subject, distinctUntilChanged } from 'rxjs';
import { DataService } from '../core/data.service';

type Tabs = 'lemmas' | 'words';

@Component({
  selector: 'sf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  tabs = ['lemmas', 'words'] as const;
  activeTab$!: Observable<Tabs>;
  isLoading = true;
  searchControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  selectedTabIndex: number = 0;

  private endSubs$ = new Subject<void>();
  private _activeTab$ = new BehaviorSubject<Tabs>('lemmas');


  constructor (private data: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  tabChanged (event: MatTabChangeEvent) {
    const tab = this.tabs[event.index];
    this._activeTab$.next(tab);
    this.router.navigate([tab], {
      queryParamsHandling: 'preserve'
    });
  }

  ngOnInit () {
    this.activeTab$ = this._activeTab$.asObservable()
      .pipe(distinctUntilChanged());
    combineLatest([
      this.activatedRoute.url,
      this.activatedRoute.queryParamMap
    ])
      .pipe(takeUntil(this.endSubs$))
      .subscribe(([url, queryParams]) => {
        const search = queryParams.get('search');
        let tab = url[0]?.path as Tabs | null;

        if (tab && !this.tabs.includes(tab)) {
           this.router.navigate([''], {
            queryParamsHandling: 'preserve'
           });
           return;
        }

        if (search && search !== this.searchControl.value) {
          this.searchControl.patchValue(search);
        }

        if (tab && tab !== this._activeTab$.getValue()) {
          const index = this.tabs.indexOf(tab);
          console.log('page load tab does not match, updating', { index, tab, actualTab: this.tabs[index] });
          this.selectedTabIndex = index;
          this._activeTab$.next(tab);
        }
      });

    combineLatest([
      this.data.getWords$(),
      this.data.getLemmas$()
    ])
      .pipe(take(1))
      .subscribe(([_words, _lemmas]) => {
        this.isLoading = false;
      });
  }

  search (clear = false) {
    if (clear) {
      this.searchControl.patchValue('');
    }

    this.router.navigate([this._activeTab$.getValue()], {
      queryParams: {
        search: this.searchControl.value || null
      },
      queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy () {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
