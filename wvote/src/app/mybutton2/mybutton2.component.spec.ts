import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mybutton2Component } from './mybutton2.component';

describe('Mybutton2Component', () => {
  let component: Mybutton2Component;
  let fixture: ComponentFixture<Mybutton2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mybutton2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mybutton2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
