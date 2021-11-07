import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { DataService } from '../core/data.service';
import { IWordSchema } from '../shared/interfaces';

@Component({
  selector: 'sf-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  private endSubs$ = new Subject<void>();

  word?: IWordSchema | null;
  param!: string | null;

  constructor (private data: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit (): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          const word = params.get('word');
          this.param = word;
          return this.data.getWord$(word as string)
        }),
        takeUntil(this.endSubs$)
      )
      .subscribe(word => {
        this.word = word;
      });
  }

  ngOnDestroy () {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
