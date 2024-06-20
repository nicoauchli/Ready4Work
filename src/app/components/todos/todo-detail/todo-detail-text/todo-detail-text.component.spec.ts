import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailTextComponent } from './todo-detail-text.component';

describe('TodoDetailTextComponent', () => {
  let component: TodoDetailTextComponent;
  let fixture: ComponentFixture<TodoDetailTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDetailTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoDetailTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
