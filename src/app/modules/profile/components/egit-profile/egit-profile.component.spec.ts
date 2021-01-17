import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgitProfileComponent } from './egit-profile.component';

describe('EgitProfileComponent', () => {
  let component: EgitProfileComponent;
  let fixture: ComponentFixture<EgitProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgitProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgitProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
