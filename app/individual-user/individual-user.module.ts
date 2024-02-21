import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndividualUserRoutingModule } from './individual-user-routing.module';
import { FormsModule } from '@angular/forms';
import { PurchaseEntirePackageComponent } from './purchase-entire-package/purchase-entire-package.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndividualUserRoutingModule,FormsModule,PurchaseEntirePackageComponent
  ]
})
export class IndividualUserModule { }
