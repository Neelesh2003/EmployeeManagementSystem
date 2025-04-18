import { CityModel } from "./city.model";
import { SalaryModel } from "./salary.model";
import { StateModel } from "./state.model";

export class EmployeeModel {
  id?: number;
  name?: string ;
  address?: string;
  zip?: string ;
  age?: number;
  dob?: Date | null;
  doj?: Date ;
  dol?: Date | null ;
  gender?: string;
  phone?: string ;
  email?: string ;
  departmentName?: string;
  cityName?: string;
  cities:CityModel[]=[];
  states:StateModel[]=[];
  salaries:SalaryModel[]=[];
  stateName?: string;
  active?: boolean = false;
}
