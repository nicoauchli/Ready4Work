import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddNewEmployeeComponent } from './dialog-add-new-employee.component';

describe('DialogAddNewEmployeeComponent', () => {
  let component: DialogAddNewEmployeeComponent;
  let fixture: ComponentFixture<DialogAddNewEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddNewEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddNewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
