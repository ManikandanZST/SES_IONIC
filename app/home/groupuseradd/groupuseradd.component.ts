// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonService } from 'src/providers/common.service';

// @Component({
//   selector: 'app-groupuseradd',
//   templateUrl: './groupuseradd.component.html',
//   styleUrls: ['./groupuseradd.component.scss'],
// })
// export class GroupuseraddComponent implements OnInit {
//   type: any;

//   constructor(private activatedRoute: ActivatedRoute,public commonService:CommonService) {
//     this.activatedRoute.params.subscribe(params => {
//       this.type=params['type'];

//  });
//    }

//   ngOnInit() {
//     console.log(this.type,"type")
//   }
//   AddnewUser(gusers,modal,ein){
//     if(gusers === undefined)
//     {
//       gusers ='';
//     }

//     var fname2, lname2, password2, email2, fname1 ,lname1, password1,email1; 
//     fname1 = gusers.fname1;
//     lname1 = gusers.lname1;
//     password1 = gusers.password1;
//     email1 = gusers.email1;

// if(fname1 === undefined || fname1 == '')
//     {
//       this.commonService.presentToast("Enter FullName");

//     }else if(lname1 === undefined || lname1 == '')
//     {

//     }else if(email1 === undefined || email1 == '')
//     {

//     }else if(password1 === undefined || password1 == '')
//     {

//     } else if(validateEmail(email1) == false)
//     {

//     }  
//   else
//     {
        
//       var id = localStorage.getItem("loginuserid"); 
//       var data = 'fullName='+fname1+' '+lname1+'&email='+email1+'&password='+password1+'&Group_Id='+id+'&EIN='+ein;
//         console.log(data);

//     // $ionicLoading.show({showBackdrop:true,template:'<ion-spinner icon="ios"></ion-spinner>  '});
//     //   webservice.addMoreusers(data).then(function(response){
//     //     console.log(response.data); 
//     //     if(response.data.Status == 'Success'){ 
//     //         $ionicLoading.hide();
//     //          $scope.userInfo();
//     //          if(modal)
//     //          {
//     //             $scope.modalPage4.hide();  
//     //          }
//     //          $state.go("sidemenugroup.userslist");
//     //         $cordovaToast.showShortBottom(response.data.Message);
//         }else
//         {
//             // $ionicLoading.hide();
//             // $cordovaToast.showShortBottom(response.data.Message);
//         }
//       });
     
//     } 
    
// }
//   }
// }
