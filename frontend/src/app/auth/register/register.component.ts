import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserRegistrationData } from '../../models/UserRegistrationData.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string;
  formSubmitted = false;
  password: string;
  password_confirmation: string;
  email: string;
  first_name: string;
  last_name: string;

  user: UserRegistrationData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation:''
  };
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(registerForm: NgForm){
    this.formSubmitted = true;
    

    if (registerForm.invalid) {
      if (this.user.password !== this.user.password_confirmation) {
        this.error = "Password Mismatch";
        return;
      }
      this.error = "Please fill in all required fields";
      return;
    }

    
      
   
    


    this.authService.register(this.user).subscribe(
      result => {
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  

  }

}
