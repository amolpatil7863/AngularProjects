import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicplayComponent } from './musicplay.component';

describe('MusicplayComponent', () => {
  let component: MusicplayComponent;
  let fixture: ComponentFixture<MusicplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
