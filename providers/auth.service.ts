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
  // store the URL so we can redirect after logging in
  redirectUrl: string;


  // login(name:string,pw: string) : Promise<boolean>{
  //   return new Promise((resolve, reject)=>{
  //     if(name=== 'admin' && pw === 'admin'){
  //         this.CurrentUser={
  //           name: name,
  //           role:0
  //         }    
  //       resolve(true);
  //     }else if(name=== 'user' && pw === 'user'){
  //       this.CurrentUser={
  //         name: name,
  //         role:1
  //       }    
  //       resolve(true);
  //     }else{
  //       reject(false)
  //     }
  //   })
  // }

    // Checking if token is set
    isLoggedIn() {
      // return localStorage.getItem('ParkingToken') != null;
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
