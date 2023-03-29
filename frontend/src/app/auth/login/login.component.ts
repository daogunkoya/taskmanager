import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLoginSubmit(loginForm:NgForm) {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (response) {
          this.authService.setUser(response);
          
          // const name: string = `${response.user['first_name']} ${response.user['last_name']}`;
          
          // localStorage.setItem('user_name', name);

          if(response.status == 401)  {

            this.errorMessage = 'Invalid email or password';
            return;
          }
          this.router.navigate(['/tasks']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      (error: any) => {
        console.log(error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    );
  }
}
