/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TagAddComponent } from './tag-add.component';

describe('TagAddComponent', () => {
  let component: TagAddComponent;
  let fixture: ComponentFixture<TagAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
