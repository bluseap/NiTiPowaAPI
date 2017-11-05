import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanhangComponent } from './banhang.component';

describe('BanhangComponent', () => {
  let component: BanhangComponent;
  let fixture: ComponentFixture<BanhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
