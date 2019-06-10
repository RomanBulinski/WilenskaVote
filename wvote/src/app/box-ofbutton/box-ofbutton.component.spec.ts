import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxOfbuttonComponent } from './box-ofbutton.component';

describe('BoxOfbuttonComponent', () => {
  let component: BoxOfbuttonComponent;
  let fixture: ComponentFixture<BoxOfbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxOfbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxOfbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
