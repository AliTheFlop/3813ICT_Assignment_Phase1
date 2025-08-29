import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGroupPromptComponent } from './select-group-prompt.component';

describe('SelectGroupPromptComponent', () => {
  let component: SelectGroupPromptComponent;
  let fixture: ComponentFixture<SelectGroupPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectGroupPromptComponent]
    });
    fixture = TestBed.createComponent(SelectGroupPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
