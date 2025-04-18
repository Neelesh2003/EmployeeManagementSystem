import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeModel } from '../../models/employee.model';
// import { EmployeeService } from '../../services/employee.service';
import * as moment from 'moment';
import { EmployeeapiService } from '../../services/employee-api.service';
import { StateModel } from '../../models/state.model';
import { CityModel } from '../../models/city.model';
import { DepartmentModel } from '../../models/department.model';
import { AddEmployeeModel } from '../../models/add-employee.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private employeeService: EmployeeapiService,
    private route: ActivatedRoute
  ) {}
 @BlockUI() blockUI!: NgBlockUI;

  employees: EmployeeModel[] = [];
  employee = new EmployeeModel();

  selectedId: number | null = null;
  departments: DepartmentModel[] = [];
  genders: string[] = ['Male', 'Female', 'Other'];
  isFormDisabled: boolean = true;
  ischecked: boolean = false;
  disableSelect = new FormControl(false);
  selectedDate: Date | null = null;
  statesWithCities: StateModel[] = [];
  maxDate = moment().format();

  ngOnInit() {
    this.getIdForEditEmployee();
    this.loadStates();
    this.loadDepartments();
  }

  public loadStates() {
    this.blockUI.start();
    this.employeeService.getStateCity().subscribe({
      next: (data) => {
        this.statesWithCities = data;
        this.getEmployeeState();
      },
      error: (err) => {
        return err;
      },
    });
    setTimeout(() => {
      this.blockUI.stop();
    });
  }

  public getEmployeeState() {
    if (!this.employee.states) {
      this.employee.states = [];
    }

    for (let i = 0; i < this.statesWithCities.length; i++) {
      this.employee.states.push({
        stateName: this.statesWithCities[i].stateName,
        stateId: this.statesWithCities[i].stateId,
        cities: this.statesWithCities[i].cities,
      });
    }
  }

  empCities: CityModel[] = [];

  public onStateChange(selectedState: any) {
    this.empCities = [];
    for (let i = 0; i < this.statesWithCities.length; i++) {
      if (
        selectedState.target.innerText == this.statesWithCities[i].stateName
      ) {
        for (let j = 0; j < this.statesWithCities[i].cities.length; j++) {
          this.empCities.push(this.statesWithCities[i].cities[j]);
        }
      }
    }
  }

  public loadDepartments() {
    this.employeeService.getDepartment().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        return err;
      },
    });
  }

  addEmployee = new AddEmployeeModel();

  public onSubmit(employeeForm: NgForm) {
    this.addEmployee = this.convertEmployeeTo(employeeForm);
    console.log(this.addEmployee);
    
    this.employeeService.postEmployeeData(this.addEmployee).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    employeeForm.resetForm();
  }

  public convertEmployeeTo(employeeForm: any): AddEmployeeModel {
    this.addEmployee.name = employeeForm.value.name;
    this.addEmployee.gender = employeeForm.value.gender;

    let birthDate = employeeForm.value.dob;
    let birthDateObject = new Date(birthDate);
    let formattedBirthDate = birthDateObject.toLocaleDateString('en-CA');
    this.addEmployee.dob = formattedBirthDate;

    if(employeeForm.value.doj != null){
    let joinDate = employeeForm.value.doj;
    let joinDateObject = new Date(joinDate);
    let formattedJoinDate = joinDateObject.toLocaleDateString('en-CA');
    this.addEmployee.doj = formattedJoinDate;
    }else{
      this.addEmployee.doj = null;
    }

    this.addEmployee.email = employeeForm.value.email;
    this.addEmployee.phone = employeeForm.value.phone;
    this.addEmployee.departmentId = employeeForm.value.department.id;
    this.addEmployee.address = employeeForm.value.address;
    this.addEmployee.cityId = employeeForm.value.city.id;
    this.addEmployee.zip = employeeForm.value.zip;
    return this.addEmployee;
  }

  public getIdForEditEmployee() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const idParam = param.get('id');
      if (idParam !== null) {
        this.selectedId = Number(idParam);
        this.loadEmployeeById(this.selectedId);
      }
    });
  }

  public loadEmployeeById(id: any) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        return err;
      },
    });
  }

  public updateEmployee(newEmployee: any) {
    this.addEmployee = this.convertEmployeeTo(newEmployee);

    let leaveDate = newEmployee.value.dol;
    if (leaveDate) {
      let leaveDateObject = new Date(leaveDate);
      let formattedLeaveDate = leaveDateObject.toLocaleDateString('en-CA'); 
      this.addEmployee.dol = formattedLeaveDate;
    } else {
      this.addEmployee.dol = null;
    }
    this.employeeService
      .putEmployeeData(this.addEmployee, this.selectedId)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    newEmployee.resetForm();
  }

  public calculateAge(getDob: Date): number {
    const birthDate = getDob;
    const birthMoment = moment(birthDate, 'DD-MM-YYYY');
    const empAge = moment().diff(birthMoment, 'years');
    return empAge;
  }

  public minimumDate:any;
  public isEligible(){
    if(this.employee.dob != null){
  const dob = moment(this.employee.dob);
  const age18Date = dob.clone().add(18, 'years'); 
  this.minimumDate = age18Date.toDate(); 
  
  }}
}
