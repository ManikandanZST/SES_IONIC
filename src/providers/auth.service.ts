import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { reject } from 'node_modules_12_11/@types/q';
export interface User{
  name:string;
  role:number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  CurrentUser : User;
  constructor(private router: Router) { }
  redirectUrl: string;
    isLoggedIn() {
      return this.CurrentUser != null;
    }
    logout(): void {
      localStorage.removeItem('SESId');
      localStorage.removeItem('SESToken');
      this.router.navigate(['/login']);
      this.CurrentUser == null;
    }
    isIndividual(){
      return this.CurrentUser.role === 0;
    }
}
