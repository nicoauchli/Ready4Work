import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailLinkComponent } from './todo-detail-link.component';

describe('TodoDetailLinkComponent', () => {
  let component: TodoDetailLinkComponent;
  let fixture: ComponentFixture<TodoDetailLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDetailLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoDetailLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
