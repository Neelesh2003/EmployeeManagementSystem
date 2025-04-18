import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { EmplyoeeRoutingModule } from './emplyoee-routing.module';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { EmployeedetailsComponent } from './components/employeedetails/employeedetails.component';
import { MoreDetailsComponent } from './components/more-details/more-details.component';
import { CustomeEmailDirective } from '../shared/validators/custome-email.directive';
import { CustomMaskingDirective } from './directives/custom-masking.directive';
import { SalaryComponent } from './components/salary/salary.component';
import {  NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { BlockUIModule } from 'ng-block-ui';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    TableComponent,
    EmployeedetailsComponent,
    MoreDetailsComponent,
    SalaryComponent,
    PagenotfoundComponent,
    CustomeEmailDirective,
    CustomMaskingDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmplyoeeRoutingModule,
    SharedModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    BlockUIModule
  ],
  exports: [EmplyoeeRoutingModule],
  providers: [provideNgxMask()]
})
export class EmplyoeeModule {}
