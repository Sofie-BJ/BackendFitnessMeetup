import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMeetupsComponent } from './upcoming-meetups.component';

describe('UpcomingMeetupsComponent', () => {
  let component: UpcomingMeetupsComponent;
  let fixture: ComponentFixture<UpcomingMeetupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingMeetupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
