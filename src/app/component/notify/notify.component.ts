import { Component,OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',

})
export class NotifyComponent  implements OnInit{

notifys:any[]=[]
Sno:number=1;

constructor(private notification:NotificationService){}
ngOnInit(): void {
  this.notification.getNotification().subscribe({
    next:(resp)=>{
    this.notifys=resp.data
    console.log(this.notifys)
    }
  })
}
  clear(id:number) {
   this.notification.clear(id).subscribe({
    next:(response)=>
    {
     this.ngOnInit()
      console.log(response)

    }
   })
    }
}
