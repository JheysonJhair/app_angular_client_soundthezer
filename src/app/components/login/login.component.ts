import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  accesUser: FormGroup;
  User: User | undefined;

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.accesUser = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/.{8,}/)]],
    });
  }
  //-----------------------------------------------------------------------ACCESO USUARIO
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
        this.toastr.error('Registrate ya!', 'No tienes cuenta');
        console.log(error);
      }
    );
  }
  accesUserGoogle(){
    this._loginService.insertLoginGoogle().subscribe(
      (data) => {
        if(data.result == 'ok'){
          this.toastr.success('Acceso', 'Bienvenido!');
          this.router.navigate(['/video']);
        }else{
          this.toastr.error('Oppss, algo salio mal!', 'Error');
        }

      },
      (error) => {
        this.toastr.error('Registrate ya!', 'No tienes cuenta');
        console.log(error);
      }
    );
  }
}
