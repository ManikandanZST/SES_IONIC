import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ForgorPassProcPage } from './forgotpassproc.page';
describe('ForgorPassProcPage', () => {
  let component: ForgorPassProcPage;
  let fixture: ComponentFixture<ForgorPassProcPage>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgorPassProcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
    fixture = TestBed.createComponent(ForgorPassProcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
