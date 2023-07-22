import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  addUser: FormGroup;
  User: User | undefined;

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.addUser = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern(/.{8,}/)]],
    });
  }
  //-----------------------------------------------------------------------REGISTRAR USUARIO
  addUsuario() {
    const user = {
      name: this.addUser?.get('name')?.value,
      email: this.addUser?.get('email')?.value,
      password: this.addUser?.get('password')?.value,
    };

    this._loginService.insertUser(user).subscribe(
      (data) => {
        this.toastr.success('Registrado con éxito', 'Registro completo!');
        this.addUser?.reset();
      },
      (error) => {
        this.toastr.error('Oopss, ocurrió un error', 'Error');
        console.log(error);
      }
    );
  }
}
