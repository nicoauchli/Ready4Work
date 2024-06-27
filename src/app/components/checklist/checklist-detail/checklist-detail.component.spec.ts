import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistDetailComponent } from './checklist-detail.component';

describe('ChecklistDetailComponent', () => {
  let component: ChecklistDetailComponent;
  let fixture: ComponentFixture<ChecklistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChecklistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
