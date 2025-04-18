import { CityModel } from "./city.model";

export class StateModel{
    stateId?:number;
    stateName?:string;
    cities:CityModel[]=[];
}