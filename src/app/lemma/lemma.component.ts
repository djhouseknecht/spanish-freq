import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { Title } from '@angular/platform-browser';

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

  constructor (
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit (): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          const word = params.get('word');
          this.titleService.setTitle(`Spanish Freq: "${word}"`);
          this.param = word;
          return this.data.getLemma$(word as string)
        }),
        takeUntil(this.endSubs$)
      )
      .subscribe(lemma => {
        this.lemma = lemma;
      });
  }

  ngOnDestroy () {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
