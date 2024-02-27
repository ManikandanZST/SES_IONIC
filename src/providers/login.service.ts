import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable()

export class LoginService {
  public headers:any;
//   public uri = "http://constructionmarket.info/zerosoftzst/talev/newrestapi/weblogin";
serviceBase: String = "https://shawneerct.com/ShawneerctAPI/action/";
serviceBase1: String = "https://shawneerct.com/API/Pay/";
serviceBase2: String = "https://shawneerct.com/API/action/";
// serviceBase: String = "http://localhost:26368/action";
// serviceBase1: String = "http://localhost:26368/Pay/";
// serviceBase2: String = "http://localhost:26368/action";

  constructor(public http: HttpClient,
    private _httpClient: HttpClient,public _commonService: CommonService) {
  }

  /**
     * Sign Up
     *
     * @returns {Promise<any>}
  */

  Signup(params: any,sendPass:any): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.serviceBase2}/NormalReg/?Sendpass=`+sendPass, params, {
            headers:
              new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
              )
          })
            .subscribe((response: any) => {
                resolve(response);
        }, reject);
    });
  }
  Signup_ProctorReg(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.serviceBase2}/ProctorReg`, params, {
            headers:
              new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
              )
          })
            .subscribe((response: any) => {
                resolve(response);
        }, reject);
    });
  }
  Signup_group(params: any,sendPass:any): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.serviceBase2}/GroupReg/?Sendpass=`+sendPass, params, {
            headers:
              new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
              )
          })
            .subscribe((response: any) => {
                resolve(response);
        }, reject);
    });
  }
/**
     * Sign In
     *
     * @returns {Promise<any>}
  */

 Signin(params: any): Promise<any> {
   
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.serviceBase2}/NormalLogin`, params, {
            headers:
              new HttpHeaders(
                {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                }
              )
          })
            .subscribe((response: any) => {
                resolve(response);
        }, reject);
    });
  }
  Signin_group(params: any): Promise<any> {
    
     return new Promise((resolve, reject) => {
         this._httpClient.post(`${this.serviceBase2}/GroupLogin`, params, {
             headers:
               new HttpHeaders(
                 {
                   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                 }
               )
           })
             .subscribe((response: any) => {
                 resolve(response);
         }, reject);
     });
   }

   //proctor login
   Signin_proctor(params: any): Promise<any> {
    
     return new Promise((resolve, reject) => {
         this._httpClient.post(`${this.serviceBase2}/ProctorLogin`, params, {
             headers:
               new HttpHeaders(
                 {
                   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                 }
               )
           })
             .subscribe((response: any) => {
                 resolve(response);
         }, reject);
     });
   }

   profile_group(params: any): Promise<any> {
    
     return new Promise((resolve, reject) => {
         this._httpClient.post(`${this.serviceBase2}UpdateGroupUser`, params, {
             headers:
               new HttpHeaders(
                 {
                   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                 }
               )
           })
             .subscribe((response: any) => {
                 resolve(response);
         }, reject);
     });
   }


   profile_individual(params: any): Promise<any> {
    
     return new Promise((resolve, reject) => {
         this._httpClient.post(`${this.serviceBase2}UpdateNormalUser`, params, {
             headers:
               new HttpHeaders(
                 {
                   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                 }
               )
           })
             .subscribe((response: any) => {
                 resolve(response);
         }, reject);
     });
   }
   changepassword_individual(params: any): Promise<any> {
    
     return new Promise((resolve, reject) => {
         this._httpClient.post(`${this.serviceBase2}UpdateNormalUserPass`, params, {
             headers:
               new HttpHeaders(
                 {
                   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                 }
               )
           })
             .subscribe((response: any) => {
                 resolve(response);
         }, reject);
     });
   }
   changepassword_group(params: any): Promise<any> {
    
     return new Promise((resolve, reject) => {
         this._httpClient.post(`${this.serviceBase2}UpdateGroupUserPass`, params, {
             headers:
               new HttpHeaders(
                 {
                   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                 }
               )
           })
             .subscribe((response: any) => {
                 resolve(response);
         }, reject);
     });
   }

   //data with url
   postdata(params: any,url:any): Promise<any> {

     return new Promise((resolve, reject) => {
         this._httpClient.post(`${this.serviceBase2}`+url, params, {
             headers:
               new HttpHeaders(
                 {
                   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                 }
               )
           })
             .subscribe((response: any) => {
                 resolve(response);
         }, reject);
     });
   }
   /**
     * Forgot password
     *
     * @returns {Promise<any>}
  */

 Forgotpass(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.serviceBase2}/forgotpass`, {...params}, {
            headers:
              new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
              )
          })
            .subscribe((response: any) => {
                resolve(response);
        }, reject);
    });
  }

 /**
     * Change password
     *
     * @returns {Promise<any>}
  */

 Changepass(params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    this._httpClient.post(`${this.serviceBase2}/changepass`, {...params}, {
        headers:
          new HttpHeaders(
            {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
          )
      })
        .subscribe((response: any) => {
            resolve(response);
    }, reject);
});
}


getData(controller:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this._httpClient.get(`${this.serviceBase2}/`+controller, {
      headers:
          new HttpHeaders(
              {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              }
          )}).subscribe((response: any) => {
            if(response.status=="authentication_error"){
              // this.auth.logout();
            }
            else{
              resolve(response);
            }
    }, (response1: any) => {
      if(response1.error.status=="authentication_error"){
        // this.auth.logout();
      }
      else{
        reject(response1);
      }
    });
  });
}
postData(controller:any, data: any): Promise<any> {

  return new Promise((resolve, reject) => {
    this._httpClient.post(`${this.serviceBase2}`+controller, {...data}, {
      headers:
          new HttpHeaders(
              {
                'Content-Type': 'application/x-www-form-urlencoded',
              }

          ),
          // responseType: 'text'

    })
        .subscribe((response: any) => {
          if(response.status=="authentication_error"){
            // this.auth.logout();
          }
          else{
            resolve(response);
          }
        }, (response1: any) => {
          if(response1.error.status=="authentication_error"){
            // this.auth.logout();
          }
          else{
            reject(response1);
          }
        });
  });
}

//payment grioup
paymentcourse_group(params: any): Promise<any> {
  
   return new Promise((resolve, reject) => {
       this._httpClient.post(`${this.serviceBase1}MakeGroupPayment`, params, {
           headers:
             new HttpHeaders(
               {
                 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
               }
             )
         })
           .subscribe((response: any) => {
               resolve(response);
       }, reject);
   });
 }
//  paymentcourse_single(params: any): Promise<any> {

//    return new Promise((resolve, reject) => {
//        this._httpClient.post(`${this.serviceBase1}MakePayment1/`, params, {
//            headers:
//              new HttpHeaders(
//                {
//                  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//                }
//              )
//          })
//            .subscribe((response: any) => {
//                resolve(response);
//        }, reject);
//    });
//  }
paymentcourse_single(params: any): Promise<any> {

   return new Promise((resolve, reject) => {
       this._httpClient.post(`${this.serviceBase1}CreateCustomer/`, params, {
           headers:
             new HttpHeaders(
               {
                 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
               }
             )
         })
           .subscribe((response: any) => {
               resolve(response);
       }, reject);
   });
 }

  forgetPassiUsers(params: any,linkPath:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${this.serviceBase2}`+linkPath, params, {
          headers:
            new HttpHeaders(
              {
                  'Content-Type': 'application/x-www-form-urlencoded',
              }
            )
      })
      .subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }

  forgetPassPUsers(params: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this._httpClient.post(`${this.serviceBase2}ProctorForgotPass/`, params, {
        headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          }
        )
      })
        .subscribe((response: any) => {
          resolve(response);
      }, reject);
    });
  }
}
