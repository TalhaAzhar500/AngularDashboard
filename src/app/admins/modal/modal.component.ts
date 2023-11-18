import { Component,Inject } from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'AdminModal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

constructor(public dialogRef: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {

  if(data)
  {
    const editData=data.adminsData?.find((adminData:any)=>adminData.id===data.idToDelete);

    if (editData) {
      this.adminForm.patchValue({
        // id: editData.id,
        admin_name: editData.admin_name,
        email: editData.email,
      });
    }
  }
}




isValid:boolean=false;

adminForm = new FormGroup({
 admin_name:new FormControl("",[Validators.required]),
 email:new FormControl("",[Validators.required,Validators.email]),
 password:new FormControl("",[Validators.required]),
//  id: new FormControl(Math.floor(Math.random()*10000)),
});


submitForm(){
  if(this.adminForm.valid)
  {
    this.isValid=false;
    this.dialogRef.close(this.adminForm.value);
  }
  else{
    this.isValid=true;
  }
}


}
