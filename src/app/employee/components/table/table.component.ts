import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
// import { EmployeeService } from '../../services/employee.service';
import * as moment from 'moment';
import { EmployeeapiService } from '../../services';
import { DepartmentModel } from '../../models/department.model';
import { CityModel } from '../../models/city.model';
import { StateModel } from '../../models/state.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(
    private employeeApiServices: EmployeeapiService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @BlockUI() blockUI!: NgBlockUI;

  public employees: EmployeeModel[] = [];
  public departments: DepartmentModel[] = [];
  public cities: CityModel[] = [];
  public states: StateModel[] = [];
  public employee!: EmployeeModel;
  public datasource = new MatTableDataSource<EmployeeModel>();

  displayedColumns: string[] = [
    'id',
    'name',
    'age',
    'email',
    'phone',
    'departmentName',
    'cityName',
    'stateName',
    'doj',
    'active',
    'actions',
  ];

  ngOnInit() {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.blockUI.start();
    this.employeeApiServices.getEmployee().subscribe({
      next: (response) => {
        this.employees = response;
        this.getActiveEmployee();
        this.calculateAge();
        this.createDatasource();
        setTimeout(() => {
          this.blockUI.stop();
        });
      },
      error: (err) => {
        if (err.status === 0) {
          console.error('Network error or server down');
        } else if (err.status === 400) {
          console.error('Bad request:', err.error);
        } else if (err.status === 500) {
          console.error('Internal server error');
        } else {
          console.error(`Error ${err.status}:`, err.error);
        }
      },
    });
  }
  createDatasource() {
    this.datasource = new MatTableDataSource<EmployeeModel>(this.employees);
    setTimeout(() => {
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  calculateAge(): void {
    this.employees.forEach((emp) => {
      emp.age = moment().diff(emp.dob, 'years');
    });
  }

  getActiveEmployee() {
    this.employees.forEach((emp) => {
      if(!emp.dol && emp.doj)
      emp.active = true;
    });
  }

  getSearchInputData(data: any) {
    let searchInput = (data.target as HTMLInputElement).value;
    this.datasource.filter = searchInput.trim().toLowerCase();
  }

  getStudentIdForDeleteData(id: number) {
    this.employeeApiServices.deleteEmployee(id).subscribe({
      next: (res) => {
        this.getAllEmployee();
        console.log(res);
      },
      error: (err) => {
        return err;
      },
    });
    window.alert('Successfully deleted...');
  }

  refreshTable() {}

  getStudentIdForShowingData(id: any) {
    this.router.navigate(['/getById', id]);
  }

  getStudentIdForUpdateData(id: any) {
    this.router.navigate(['/put', id]);
  }

  goToDetailedComponent(id: any) {
    this.router.navigate(['/moredetails', id]);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToSalary() {
    this.router.navigate(['/salary']);
  }
}
