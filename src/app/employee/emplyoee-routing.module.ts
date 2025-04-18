import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TableComponent } from './components/table/table.component';
import { EmployeedetailsComponent } from './components/employeedetails/employeedetails.component';
import { MoreDetailsComponent } from './components/more-details/more-details.component';
import { SalaryComponent } from './components/salary/salary.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


const routes:Routes=[
  {path:'',children:[
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'salary', component: SalaryComponent},
  { path: 'manage', component: TableComponent },
  { path: 'moredetails/:id', component: MoreDetailsComponent },
  { path: 'getById/:id', component: EmployeedetailsComponent},
  { path: 'put/:id', component: RegistrationComponent},
  { path: '**', component: PagenotfoundComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmplyoeeRoutingModule { }
