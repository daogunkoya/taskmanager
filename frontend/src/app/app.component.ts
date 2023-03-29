import { Component } from '@angular/core';

import {AuthService} from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title:string;
  userName:string


  constructor(private authService: AuthService) {
    
  }


  ngOnInit(): void {
    this.getUser();
  }

  getUser():any{
    this.userName = this.authService.getUserName()
  }
}
