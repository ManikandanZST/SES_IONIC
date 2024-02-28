import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ForgorPassConfirmPage } from './forgotpassconfirm.page';
describe('ForgorPassConfirmPage', () => {
  let component: ForgorPassConfirmPage;
  let fixture: ComponentFixture<ForgorPassConfirmPage>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgorPassConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
    fixture = TestBed.createComponent(ForgorPassConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
