import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(private http:HttpClient) { }

  post(url:string,data:any)
  {
    return this.http.post(url, data);
  }

  add(url:string,adminDetails:any){
    const data:any=localStorage.getItem("userData");
    const userData=JSON.parse(data);
    return this.http.post(url,adminDetails,{
      headers:{
        authorization:`Bearer ${userData?.access_token}`
      }
    })
  }

  get(url:string)
  {
    const data:any=localStorage.getItem("userData");
    const userData=JSON.parse(data);

   return this.http.get(url,{
      headers:{
        authorization:`Bearer ${userData?.access_token}`
      }
    })
  }

  delete(url:string){
    const data:any=localStorage.getItem("userData");
    const userData=JSON.parse(data);

   return this.http.delete(url,{
      headers:{
        authorization:`Bearer ${userData?.access_token}`
      }
    })
  }

}




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGU4OGI2YTk2YmI5ODE2NzU4OTRhOTQiLCJyb2xlIjoic3VwZXIiLCJpYXQiOjE2OTMyMDAxNDIsImV4cCI6MTY5MzIwMzc0Mn0._FEeG2FR_Ef8GE0EI39C6u112gzCgIEaiTIeqGbzu0o