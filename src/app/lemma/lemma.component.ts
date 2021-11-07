import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { ILemmaFormAgg } from '../shared/interfaces';
import { DataService } from '../core/data.service';

@Component({
  selector: 'sf-lemma',
  templateUrl: './lemma.component.html',
  styleUrls: ['./lemma.component.scss']
})
export class LemmaComponent implements OnInit, OnDestroy {
  private endSubs$ = new Subject<void>();

  lemma?: ILemmaFormAgg | null;
  param!: string | null;

  constructor (private data: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit (): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          console.log('params firing for lamma component', params);
          const word = params.get('word');
          this.param = word;
          return this.data.getLemma$(word as string)
        }),
        takeUntil(this.endSubs$)
      )
      .subscribe(lemma => {
        this.lemma = lemma;
      }, () => { }, () => { console.log('lemma completed') });
  }

  ngOnDestroy () {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
