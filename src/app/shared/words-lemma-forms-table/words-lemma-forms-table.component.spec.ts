import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsLemmaFormsTableComponent } from './words-lemma-forms-table.component';

describe('WordsLemmaFormsTableComponent', () => {
  let component: WordsLemmaFormsTableComponent;
  let fixture: ComponentFixture<WordsLemmaFormsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordsLemmaFormsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsLemmaFormsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
