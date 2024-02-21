/* eslint-disable @typescript-eslint/quotes */
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class WebService {

  // serviceBase: String = "https://zerosofttech.com/API/action/";
  // serviceBase1: String = "https://zerosofttech.com/API/Pay/";
  // serviceBase2: String = "https://zerosofttech.com/API/Action/";
  serviceBase: String = "https://shawneerct.com/ShawneerctAPI/action/";
  serviceBase1: String = "https://shawneerct.com/API/Pay/";
  serviceBase2: String = "https://shawneerct.com/API/action/";

// serviceBase1: String = "http://localhost:26368/Pay/";
// serviceBase2: String = "http://localhost:26368/action/";

  constructor(private _httpClient: HttpClient, private auth: AuthService,private tokenExtractor: HttpXsrfTokenExtractor) {}

  postData1(controller: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(
          `${this.serviceBase}` + controller,
          { ...data },
          {
            headers: new HttpHeaders({
              "Content-Type": "application/x-www-form-urlencoded",

            }),
          }
        )
        .subscribe((response: any) => {
          if (response.status == "authentication_error") {
            this.auth.logout();
          } else {
            resolve(response);
          }
        }, (response1: any) => {
          if(response1.error.status=="authentication_error"){
            this.auth.logout();
          }
          else{
            reject(response1);
          }
        });
    });
  }

  postData(controller: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(
          `${this.serviceBase}` + controller,
          { ...data },
          {
            headers: new HttpHeaders({
              "Content-Type": "application/x-www-form-urlencoded",
              'X-XSRF-TOKEN': `${localStorage.getItem('ParkingCSRF')}`,
            }),
          }
        )
        .subscribe((response: any) => {
          if (response.status == "authentication_error") {
            this.auth.logout();
          } else {
            resolve(response);
          }
        }, (response1: any) => {
          if(response1.error.status=="authentication_error"){
            this.auth.logout();
          }
          else{
            reject(response1);
          }
        });
    });
  }
  getData(controller: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`${this.serviceBase}/` + controller, {
          headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            'X-XSRF-TOKEN': `${localStorage.getItem('ParkingCSRF')}`,
          }),
        })
        .subscribe((response: any) => {
          if (response.status == "authentication_error") {
            this.auth.logout();
          } else {
            resolve(response);
          }
        },
        (response1: any) => {
          if(response1.error.status=="authentication_error"){
            this.auth.logout();
          }
          else{
            reject(response1);
          }
        });
    });
  }
  moveprofilepic(uploadurl: any, body: any) {
    const url = uploadurl;
    const response = this._httpClient.post(url, body);
    return response;
  }

  inappresponse(controller: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(
          `${this.serviceBase}` + controller,
          { ...data },
          {
            headers: new HttpHeaders({
              "Content-Type": "application/x-www-form-urlencoded",
            }),
          }
        )
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getTrainingReportData(controller:any): Promise<any> {
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

  studentform(params: any): Promise<any> {
    console.log(params);
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.serviceBase2}StudentAck`, params, {
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

  studentformIssue(params: any): Promise<any> {
    console.log(params);
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.serviceBase2}Certification/`, params, {
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

  GetProctQuestions(controller:any): Promise<any> {
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

  answersList(controller:any, params: any): Promise<any> {
    console.log(params);
     return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.serviceBase2}`+controller, params, {
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

  GetQuestions(controller:any): Promise<any> {
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
}
