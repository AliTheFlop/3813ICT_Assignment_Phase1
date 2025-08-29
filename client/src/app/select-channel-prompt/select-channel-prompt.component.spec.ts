import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChannelPromptComponent } from './select-channel-prompt.component';

describe('SelectChannelPromptComponent', () => {
  let component: SelectChannelPromptComponent;
  let fixture: ComponentFixture<SelectChannelPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectChannelPromptComponent]
    });
    fixture = TestBed.createComponent(SelectChannelPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
