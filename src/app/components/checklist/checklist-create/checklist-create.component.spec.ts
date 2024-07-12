import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistCreateComponent } from './checklist-create.component';

describe('ChecklistCreateComponent', () => {
  let component: ChecklistCreateComponent;
  let fixture: ComponentFixture<ChecklistCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChecklistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
