import { Component, ViewChild,OnInit  } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {ModalComponent} from "./modal/modal.component";
import { MatDialog } from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import { Router } from '@angular/router';
import { HTTPService } from "../http.service";
import { ToastrService } from 'ngx-toastr';

export const URL="https://tdc-dashboard-5ec92093d7de.herokuapp.com/admins";

export interface TableFormat {
  _id:number;
  admin_name: string;
  email: string;
  role: string;
}

// const ELEMENT_DATA: TableFormat[] = [
//   { id:1,admin_name: 'Talha', email:"talha@gmail.com" , role: 'Admin'},
//   { id:2,admin_name: 'Leo', email: "leo@gmail.com", role: 'Admin'},
//   { id:3,admin_name: 'Saber', email: "saber@gmail.com", role: 'Admin'},
// ];


@Component({
  selector: 'admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
  
})
export class AdminsComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  @ViewChild('actionTrigger') actionTrigger!: MatMenuTrigger;
  @ViewChild(MatTable) matTable!: MatTable<TableFormat>;

  displayedColumns: string[] = [ 'admin_name', 'email', 'role',"action"];
  dataSource!:TableFormat[];

constructor(private matDialog:MatDialog, private router:Router, private http:HTTPService,private toast:ToastrService ){}

ngOnInit(): void {
  this.getData();
}

getData(){
  this.http.get(URL).subscribe({
    next:(response)=>{
      const data:any=response;
      this.dataSource=data;
    },
    error:(error)=>{
      console.log("Error occoured",error);
      this.toast.error("Error in getting Members from Server");

    }
  }

  )
}

openDialog(){
const dialogRef=this.matDialog.open(ModalComponent);

dialogRef.afterClosed().subscribe((result)=>{
  if(result) {
    this.http.add(URL,result).subscribe({
      next:(response)=>{
        this.toast.success("Member Added Successfully");
        this.getData();
        this.matTable.renderRows();
      },
      error:(error)=>{
        console.log("Error Occoured while adding member",error);
        this.toast.error("Adding Admin failed!",error);
      }
    })
  }
})
}


handleAdminsClick(){
this.router.navigate(['admin']);
}
handleMembersClick(){
  this.router.navigate(['members']);
}

handleLogout(){
  this.toast.success("Logout Succesfully");
  localStorage.clear();
  this.router.navigate(['']);
}

handleDelteAdmin(id:number){
  this.http.delete(`${URL}/${id}`).subscribe({
    next:(response:any)=>{
      this.getData();
      this.matTable.renderRows();
      this.toast.success(response.message);
    },
    error:(error)=>{
      console.error("Error Occoured",error);
    }
  })
}

handleEditAdmin(id:number){
  const dialogRef=this.matDialog.open(ModalComponent,{
    data:{
      idToDelete:id,
      adminsData:this.dataSource
    }
  });

dialogRef.afterClosed().subscribe((result)=>{
  console.log("data recieved from Edit",result);
  const index=this.dataSource.findIndex((data)=>data._id===result._id);
  this.dataSource[index]=result;
 console.log("Data after edit",this.dataSource);
  this.matTable.renderRows();
})

}

}
