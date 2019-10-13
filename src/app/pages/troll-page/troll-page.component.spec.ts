import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrollPageComponent } from './troll-page.component';

describe('TrollPageComponent', () => {
  let component: TrollPageComponent;
  let fixture: ComponentFixture<TrollPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrollPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrollPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
