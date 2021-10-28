import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
import {LoginService}from 'src/app/_service/login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  resultadoHija: number;

  constructor(private progressBarService: ProgressBarService, private loginService:LoginService) { }

   ngOnInit() {
    this.progressBarService.progressBarReactiva.next(false);
   this.loginService.login('admin','123456').subscribe(data =>{
     console.log(data);
   })




    this.progressBarService.progressBarReactiva.next(true);
  }

}
