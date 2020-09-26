import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersListListComponent } from './teachers-list-list.component';

describe('TeachersListComponent', () => {
  let component: TeachersListListComponent;
  let fixture: ComponentFixture<TeachersListListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersListListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
