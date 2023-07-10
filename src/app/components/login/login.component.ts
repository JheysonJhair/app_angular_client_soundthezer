import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //ACCES - USER
  accesUser: FormGroup;
  User: User | undefined;

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.accesUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  accesUsuario() {
    const user = {
      email: this.accesUser?.get('email')?.value,
      password: this.accesUser?.get('password')?.value,
    };

    this._loginService.insertLogin(user).subscribe(
      (data) => {
        this.toastr.success('Acceso', 'Bienvenido!');
        this.router.navigate(['/video']);
      },
      (error) => {
        this.toastr.error('Oops, ocurrió un error', 'Error');
        console.log(error);
      }
    );
  }
}
