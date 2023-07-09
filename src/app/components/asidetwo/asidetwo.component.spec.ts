import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsidetwoComponent } from './asidetwo.component';

describe('AsidetwoComponent', () => {
  let component: AsidetwoComponent;
  let fixture: ComponentFixture<AsidetwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsidetwoComponent]
    });
    fixture = TestBed.createComponent(AsidetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
