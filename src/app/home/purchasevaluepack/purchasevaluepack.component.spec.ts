import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PurchasevaluepackComponent } from './purchasevaluepack.component';
describe('PurchasevaluepackComponent', () => {
  let component: PurchasevaluepackComponent;
  let fixture: ComponentFixture<PurchasevaluepackComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasevaluepackComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
    fixture = TestBed.createComponent(PurchasevaluepackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
