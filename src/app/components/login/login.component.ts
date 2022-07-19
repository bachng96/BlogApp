import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isInvalidInput: boolean = null;
  loginForm: FormGroup;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  login(): void {
    this.authService
      .login(this.loginForm.value)
      .then(() => {
        this.isInvalidInput = false;
        setTimeout(() => {
          this.router.navigate(['..']);
        }, 2000);
      })
      .catch(() => (this.isInvalidInput = true));
  }

  public demoAccount(): void {
    this.loginForm.setValue({
      email: 'zelda@gmail.com',
      password: '11111111',
    });
  }
}
