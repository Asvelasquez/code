import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  resultadoHija: number;

  constructor(private progressBarService: ProgressBarService) { }

   ngOnInit() {
    this.progressBarService.progressBarReactiva.next(false);
   




    this.progressBarService.progressBarReactiva.next(true);
  }

}
