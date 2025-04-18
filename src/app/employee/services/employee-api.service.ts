import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DepartmentModel } from '../models/department.model';
import { CityModel } from '../models/city.model';
import { StateModel } from '../models/state.model';
import { SalaryModel } from '../models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeapiService {

  constructor(private client:HttpClient) { }
  
  public empUrl= 'https://localhost:7149/api/Employee';
  public stateCityUrl = 'https://localhost:7149/api/StateCity';
  public depUrl = 'https://localhost:7149/api/Department';
  public salaryUrl =  'https://localhost:7149/api/Salary';

  getEmployee():Observable<EmployeeModel[]>{
    return this.client.get<EmployeeModel[]>(this.empUrl);
  }

  getEmployeeById(id:any):Observable<EmployeeModel>{
    return this.client.get<EmployeeModel>(`${this.empUrl}/${id}`);
  }


  putEmployeeData(Employee: any,EmployeeId:any):Observable<string>{
    return this.client.put(`${this.empUrl}/${EmployeeId}`, Employee, { responseType: 'text' });
  }
  
  postEmployeeData(Employee: any):Observable<string>{
    return this.client.post(this.empUrl, Employee, { responseType: 'text' });
  }
  
  deleteEmployee(id:any):Observable<string>{
    return this.client.delete(`${this.empUrl}/${id}`,{responseType:'text'});
  }

  getStateCity():Observable<StateModel[]>{
    return this.client.get<StateModel[]>(this. stateCityUrl);
  }

  getDepartment():Observable<DepartmentModel[]>{
    return this.client.get<DepartmentModel[]>(this.depUrl);
  }

  postEmployeeSalary(salaryDetails:SalaryModel){
    return this.client.post(this.salaryUrl,salaryDetails,{responseType:'text'});
  }

  getEmployeeSalary(){
    return this.client.get<SalaryModel[]>(this.salaryUrl);
  }
}
