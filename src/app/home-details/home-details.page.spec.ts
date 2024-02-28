import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomeDetailsPage } from './home-details.page';
describe('HomeDetailsPage', () => {
  let component: HomeDetailsPage;
  let fixture: ComponentFixture<HomeDetailsPage>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
