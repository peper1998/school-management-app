import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConwersationComponent } from './conwersation.component';

describe('ConwersationComponent', () => {
  let component: ConwersationComponent;
  let fixture: ComponentFixture<ConwersationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConwersationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConwersationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
