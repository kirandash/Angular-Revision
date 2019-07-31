import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemRxformComponent } from './media-item-rxform.component';

describe('MediaItemRxformComponent', () => {
  let component: MediaItemRxformComponent;
  let fixture: ComponentFixture<MediaItemRxformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemRxformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemRxformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
