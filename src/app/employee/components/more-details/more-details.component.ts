import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeeapiService } from '../../services/employee-api.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css'],
})
export class MoreDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private employeeServices: EmployeeapiService
  ) {}
  ngOnInit() {
    this.getEmpId();
  }

 public selectedId:any;
 public employee!:EmployeeModel;
 
  public getEmpId() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.selectedId = param.get('id');
    });
    this.getDataById(this.selectedId);
  }

  getDataById(id:any){
    this.employeeServices.getEmployeeById(id).subscribe({
     next:(data)=>{
       this.employee = data;
     },
     error:(err)=>{
       return err;
     }
   });
   }
}
