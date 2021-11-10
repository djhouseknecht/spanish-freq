import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil, combineLatest } from 'rxjs';

import { DataService } from '../core/data.service';
import { IWordSchema, ILemmaFormAgg } from '../shared/interfaces';

@Component({
  selector: 'sf-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  private endSubs$ = new Subject<void>();

  word?: IWordSchema | null;
  param!: string | null;
  lemmas?: ILemmaFormAgg[];

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
          this.param = word;
          this.titleService.setTitle(`Spanish Freq: "${word}"`);
          return this.data.getWord$(word as string)
        }),
        switchMap(word => {
          this.word = word;
          return combineLatest(
            word.lemma_forms.map(l => this.data.getLemma$(l.word))
          );
        }),
        takeUntil(this.endSubs$)
      )
      .subscribe(lemmas => {
        this.lemmas = lemmas;
      });
  }

  ngOnDestroy () {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
