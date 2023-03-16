import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    // authState$: <User>;

    constructor() {
    //   this.authState$ = this.afAuth.authState;
     }
    get isAuthenticated(): boolean
    {
        return localStorage.getItem('login') == 'true'? true : false;
    }
}