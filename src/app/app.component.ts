import { Router } from '@angular/router';
import { UserService } from './modules/public/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './modules/public/models/user';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public login = false;

  public user: User;
  public username: string;
  public password: string;
  public route: Router;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  async doLogin() {
    await this.getUser();
    this.validateUser(this.user);
  }

  public validateUser(user: User): void {
    if (user != null) {
      if (user.password === this.password) {
        this.login = true;
        swal('Ingresado', 'Bienvenido a RentaCar ' + this.username, 'success');
      } else {
        this.login = false;
        swal('Error', 'Usuario o Contraseña no validos', 'error');
      }
    } else {
      this.login = false;
      swal('Error', 'No se pudo obtener una Respuesta', 'error');
    }
  }

  async getUser() {
    this.user = await this.userService.getUserByName(this.username);
  }
}
