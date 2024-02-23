import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeactiveUserslistComponentComponent } from './deactive-userslist-component.component';

describe('DeactiveUserslistComponentComponent', () => {
  let component: DeactiveUserslistComponentComponent;
  let fixture: ComponentFixture<DeactiveUserslistComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactiveUserslistComponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeactiveUserslistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
