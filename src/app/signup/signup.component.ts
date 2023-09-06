import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  signup = new FormGroup({
    FirstName: new FormControl("", [Validators.required]),
    LastName: new FormControl("", [Validators.required]),
    UserName: new FormControl("", [Validators.required]),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required]),
  });

  ngOnInit(): void {
  }


  signupForm() {
    if (this.signup.valid) {
      this.auth.userRegister(this.signup.value
        ).subscribe({
          next: (res) => {
            console.log(res.message);
           alert(res.message);
           this.router.navigate(['/products']);
          },
          error: (err) => {
            console.log(err.message);
            alert(err.error.message);

          }
        });
    } else {
      alert("failed to register");
    }

      };



}
