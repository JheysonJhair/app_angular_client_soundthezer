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
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  accesUser: FormGroup;
  User: User | undefined;

  constructor(
    private _sharedService: SharedService,
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

    this._loginService.getLogin(user.email,user.password).subscribe(
      (result) => {
        const name = result.data.name;
        this._sharedService.setName(name);
        this.toastr.success('Acceso', 'Bienvenido!');
        this.router.navigate(['/video']);
      },
      (error) => {
        this.toastr.error('Registrate ya!', 'No tienes cuenta');
        console.log(error);
      }
    );
  }
  //-----------------------------------------------------------------------ACCESO GOOGLE
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
  //-----------------------------------------------------------------------ACCESO FACEBOOK
  accesUserFacebook(){
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
