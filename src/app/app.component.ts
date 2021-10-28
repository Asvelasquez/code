import { Component, OnInit } from '@angular/core';
import {ProgressBarService} from 'src/app/_service/progress-bar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public flagProgressBar: boolean =  true;

  constructor(private progressBarService: ProgressBarService){

  }
  ngOnInit(): void{
    this.progressBarService.progressBarReactiva.subscribe(data =>{
      this.flagProgressBar = data;
    });
  }
}
