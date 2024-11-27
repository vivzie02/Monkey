import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyOverviewComponent } from './monkey-overview.component';

describe('MonkeyOverviewComponent', () => {
  let component: MonkeyOverviewComponent;
  let fixture: ComponentFixture<MonkeyOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyOverviewComponent]
    });
    fixture = TestBed.createComponent(MonkeyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
