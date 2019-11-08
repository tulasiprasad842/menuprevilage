import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuprevilageComponent } from './menuprevilage.component';

describe('MenuprevilageComponent', () => {
  let component: MenuprevilageComponent;
  let fixture: ComponentFixture<MenuprevilageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuprevilageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuprevilageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
