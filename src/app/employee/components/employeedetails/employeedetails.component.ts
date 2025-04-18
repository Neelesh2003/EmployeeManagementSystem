import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeeapiService } from '../../services/employee-api.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent {

constructor(private route:ActivatedRoute,private router:ActivatedRoute, private employeeService: EmployeeapiService){}
public name:any;
public selectedId:any;
public employee!:EmployeeModel;

ngOnInit(){
  this.getIdForDisplayData();
}

getIdForDisplayData() {
  this.route.paramMap.subscribe((params:ParamMap)=>{
    this.selectedId = params.get('id');
    this.getDataById(this.selectedId);
});
}

getDataById(id:any){
 this.employeeService.getEmployeeById(id).subscribe({
  next:(data)=>{
    this.employee = data;
  },
  error:(err)=>{
    return err;
  }
});
}
}




