import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRhymesComponent } from './submit-rhymes.component';

describe('SubmitRhymesComponent', () => {
  let component: SubmitRhymesComponent;
  let fixture: ComponentFixture<SubmitRhymesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRhymesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRhymesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
