import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: '../partials/login.component.html',
  styleUrls: ['../partials/login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  public user: User;
  public loginSuccess: Boolean = false;

  ngOnInit() {
  }

  // public doLogin(username: string, password: string) {
  //   this.userService.getUserByName(username).subscribe(
  //     users => this.user = users
  //   );
  //   if (this.user != null) {
  //     if (this.user.password == password) {
  //       this.loginSuccess = true;
  //     }
  //   }
  // }

}
