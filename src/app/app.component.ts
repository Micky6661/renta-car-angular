import { UserService } from './modules/public/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './modules/public/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // public user: User;
  public login = false;

  public user: User;
  public username: string;
  public password: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public doLogin(): void {
    this.getUser();
    this.validateUser(this.user);
  }

  public validateUser(user: User): void {
    if (user != null) {
      if (user.password === this.password) {
        this.login = true;
      } else {
        this.login = false;
      }
    } else {
      this.login = false;
    }
  }

  public getUser(): void {
    this.userService.getUserByName(this.username).subscribe(
      user => this.user = user
    );
  }



}
