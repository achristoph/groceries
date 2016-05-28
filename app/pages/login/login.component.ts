import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service";
import {Router} from "@angular/router-deprecated";

@Component({
  selector: "login",
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginPage {
    user: User;
    isLoggingIn = true;

    constructor(private _router: Router, private _userService: UserService) {
        this.user = new User();
        this.user.email = 'achristoph@gmail.com';
        this.user.password = '123456';
    }
    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }
    login() {
        
        this._userService.login(this.user)
            .subscribe(
            () => this._router.navigate(["List"]),
            (error) => alert("Unfortunately we could not find your account.")
            );
    }
    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
    signUp() {
        this._userService.register(this.user)
            .subscribe(
            () => {
                alert("Your account was successfully created.");
                this.toggleDisplay();
            },
            (err) => {
                console.log(err);
                alert("Unfortunately we were unable to create your account.");
            }
            );
    }
}