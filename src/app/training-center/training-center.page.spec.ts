import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TrainingCenterPage } from './training-center.page';
describe('TrainingCenterPage', () => {
  let component: TrainingCenterPage;
  let fixture: ComponentFixture<TrainingCenterPage>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingCenterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
    fixture = TestBed.createComponent(TrainingCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
