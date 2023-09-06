import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id=0;

  login = new FormGroup({
    email: new FormControl("", [Validators.required]),
    Password: new FormControl("", [Validators.required]),
  })

  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  loginForm() {
    if (this.login.valid) {
      this.auth.userlogin(this.login.value
      ).subscribe({
        next: (res) => {

          console.log(res.message);
          this.auth.storeToken(res.token);
          this.auth.storeId(res.id);


          this.route.navigate(['/products']);

        },
        error: (err) => {

          alert(err.message);
        },
      })

    } else {
      alert("failed to login")

    }
  };



}
