import { Component } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { NgForm } from '@angular/forms';
import { SalaryModel } from '../../models/salary.model';
import { Router } from '@angular/router';
import { EmployeeapiService } from '../../services/employee-api.service';
import { BlockUI, BlockUIComponent, NgBlockUI } from 'ng-block-ui';

// enum MyEnum {
//   March = 3,
//   April = 4,
// }

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],
})
export class SalaryComponent {
  constructor(
    private router: Router,
    private employeeServices: EmployeeapiService
  ) {}
  ngOnInit() {
    this.loadEmployee();
  }

  @BlockUI() blockUI!: NgBlockUI;

  loadEmployee() {
    this.blockUI.start();
    this.employeeServices.getEmployee().subscribe({
      next: (data) => {
        this.employees = data;
        setTimeout(() => {
          this.blockUI.stop();
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ischecked: any = false;
  selectedEmp: any;

  isFormDisabled = true;
  salary = new SalaryModel();
  employees: EmployeeModel[] = [];
  years: number[] = [2025, 2024];
  months = [
    { name: 'April', id: 4 },
    { name: 'March', id: 3 },
  ];

  onSubmit(salaryDetails: NgForm) {
    let salary = this.convertToSalary(salaryDetails);
    this.employeeServices.postEmployeeSalary(this.salary).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    salaryDetails.reset();
  }

  convertToSalary(salaryDetails: any): SalaryModel {
    this.salary.employeeId = salaryDetails.value.employee.id;
    this.salary.amount = salaryDetails.value.amount;
    this.salary.month = salaryDetails.value.month;
    this.salary.year = salaryDetails.value.year;
    this.salary.remark = salaryDetails.value.remark;
    return this.salary;
  }

  goTotable() {
    this.router.navigate(['/manage']);
  }
}
