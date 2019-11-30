import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVideoManagementComponent } from './add-edit-video-management.component';

describe('AddEditVideoManagementComponent', () => {
  let component: AddEditVideoManagementComponent;
  let fixture: ComponentFixture<AddEditVideoManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditVideoManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVideoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
