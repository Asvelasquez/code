import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {ProgressBarService} from 'src/app/_service/progress-bar.service';
import { LoginService } from './_service/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public flagProgressBar: boolean =  true;
  public flagSesion: boolean = false;
  public flagToolbar: boolean= true;
  
  constructor(private progressBarService: ProgressBarService, private loginService: LoginService,){

  }
  ngOnInit(): void{
  
    if(this.loginService.estaLogueado()==true){
      this.flagToolbar =false;
    }else{
      this.flagToolbar = true;
    }
    this.loginService.toolBarReactiva.subscribe(data =>{
      this.flagToolbar =data;
    });
    this.progressBarService.progressBarReactiva.subscribe(data =>{
      this.flagProgressBar = data;
    });
  }
  logeo(){
    this.flagSesion = this.loginService.estaLogueado();

    console.log(this.flagSesion);
  }
  cerrarSession(){
    this.loginService.cerrarSesion();
  }
}
