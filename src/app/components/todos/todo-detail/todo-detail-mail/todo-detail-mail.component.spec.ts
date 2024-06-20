import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailMailComponent } from './todo-detail-mail.component';

describe('TodoDetailMailComponent', () => {
  let component: TodoDetailMailComponent;
  let fixture: ComponentFixture<TodoDetailMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDetailMailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoDetailMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
