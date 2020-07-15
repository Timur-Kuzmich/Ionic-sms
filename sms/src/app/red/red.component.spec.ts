import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RedComponent } from './red.component';

describe('RedComponent', () => {
  let component: RedComponent;
  let fixture: ComponentFixture<RedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
