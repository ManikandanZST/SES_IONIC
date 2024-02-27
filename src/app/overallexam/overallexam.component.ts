import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { LoginService } from 'src/providers/login.service';
@Component({
  selector: 'app-overallexam',
  templateUrl: './overallexam.component.html',
  styleUrls: ['./overallexam.component.scss'],
})
export class OverallexamComponent implements OnInit {
  @Input("id") id;
  @Input("selectcourse") selectcourse;

  GroupId: string;
  groupusers: any;
  groupuser_NAMEs: any[];
  totalAmount: any=[];
  saved: string;
  reminder: any;
  favorite: any;
  MULTIlist: any=[];
  info: any;
  selected_user: string;
  infouser: any;
  inds: any;
  dynNames: string;
  total: any;
  Total: number;
  search: boolean=false;
  filterData: any[];
  searchTerm: any;
  subscription: any;

  //multiselect fix code
  customindex: any;
  customMULTIlist: any=[];
  //End multiselect fix code

  isTotalAmount : boolean = true;
  constructor(private loginService: LoginService,public modalController: ModalController, private platform: Platform) { }

  ngOnInit() {
    this.GroupId=localStorage.getItem("loginuserid");
    this.GetGroupUserModules();
    this.selected_user=localStorage.getItem("selecteduser");
  }

  //To disable back button
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  //End of disable back button

  GetGroupUser(){
    var lnk =  'GetGroupUser?GroupId='+this.GroupId;
    this.loginService.getData(lnk).then(
      (Response: any) => {

        if(Response)
        {
          this.info=Response.UserList;
          this.infouser=this.info[this.selected_user];
          
          this.dynNames = 'USER'+this.infouser.userId;
        }else{

        }
      },
      err => {

      }
    );
  }

  GetGroupUserModules(){
    this.GetGroupUser();
    var lnk =  'GetGroupUserOverallExam?GroupId='+this.GroupId;
    this.loginService.getData(lnk).then(
      (Response: any) => {
        if(Response)
        {
          this.groupuser_NAMEs=Response;
          this.groupusers=Response[0].OverAllList;
          this.groupusers.map((result)=>{
            result.checked=false;
            })
            if(this.selectcourse){
              this.groupusers.map((user)=>{
                let find=this.selectcourse.find((course)=> course.OverId==user.OverId );
              if(find){
                user.checked=true;
              }
            })
          }
        }else{

        }
      },
      err => {

      }
    );
  }

  checkMultilist(as,ind,infouser,indexValue,listsS){
    this.inds=ind.target.checked;
    if(as.Price != 0)
    {
      var temp   = [];
      var dynName = 'USER'+infouser.userId;
      var totalAmount = 'total'+infouser.userId;
      var tmp    = localStorage.getItem(dynName);
      if(this.inds == false)
      {
        if(tmp != null)
        {
          var multiList = {
            OverId     : as.OverId,
            OverName   : as.OverName,
            Price   : as.Price,
          }

          tmp = JSON.parse(tmp);
          for(i=0; i<tmp.length; i++)
          {
            temp.push(tmp[i]) ;
          }
          temp.push(multiList);
          localStorage[dynName] = JSON.stringify(temp);
        } else
        {
          var multiList = {
            OverId     : as.OverId,
            OverName   : as.OverName,
            Price   : as.Price,
          }

          tmp = JSON.parse(tmp);
          temp.push(multiList);
          localStorage[dynName] = JSON.stringify(temp);
        }
        var t = localStorage.getItem(totalAmount);
        this.totalAmount[indexValue] =  parseFloat(t) + parseFloat(as.Price);
      }else{
        this.saved    = localStorage.getItem(dynName);
        this.reminder = JSON.parse(this.saved);
        var reminders   = JSON.parse(localStorage.getItem(dynName));
        for(var i=0; i<reminders.length; i++)
        {
          if(reminders[i].OverId ===  as.OverId)
          {
            var index = reminders.indexOf(i);
            reminders.splice(i, 1);
          }
        }
        localStorage[dynName] = JSON.stringify(reminders);
        this.favorite = JSON.parse(this.saved);
        var t = localStorage.getItem(totalAmount);
        this.totalAmount[indexValue] =  parseFloat(t) - parseFloat(as.Price);
      }
      this.isTotalAmount = false;
      setTimeout(async () => {
        var tt = 0;
        for(var k=0;k<listsS.length;k++)
        {
          var totalAmt = 'total'+listsS[k].userId;
          tt = tt + parseFloat(localStorage.getItem(totalAmt));
          localStorage.setItem("totalAmountChoosen",tt.toString());
          // this.totalAmountChoosen = tt;
          if( k == listsS.length - 1){
            this.isTotalAmount = true;
            
          }
        }
      },1000)
      localStorage.setItem(totalAmount,this.totalAmount[indexValue]);
      this.MULTIlist[indexValue] = JSON.parse(localStorage.getItem(dynName));

      // multiselect fix Code
      this.customindex = indexValue;
      this.customMULTIlist = this.MULTIlist[this.customindex];
      
      //End multiselect fix Code
    }else
    {

    }
  }

  setFilteredLocations(){
    this.search=true;
    this.filterData = this.groupusers.filter((location) => {
      return location.OverName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  onCancel($event){
    this.search=false;
    this.filterData=this.groupuser_NAMEs
    $event.target.value = '';
  }

  async close(){
    if(this.isTotalAmount){
    let T =0;

    // multiselect fix code - to calculate selected course amount
    
    
    // let customtotal =0;
    // if(this.customMULTIlist.length != 0){
    //   for(var i=0; i<this.customMULTIlist.length; i++){
    
    //     customtotal = customtotal + +this.customMULTIlist[i].ModulePrice
    //   }
    // }
    
    //End multiselect fix code - to calculate selected course amount

    if(this.MULTIlist[this.MULTIlist.length-1]){
      this.total = this.MULTIlist[this.MULTIlist.length-1].map((location) => {
        T=T+parseInt(location.Price);
      });
      this.Total=T;
      
    }else{
      if(this.selectcourse){
        this.total = this.selectcourse.map((location) => {
          T=T+parseInt(location.Price);
        });
        this.Total=T;
        
      }
    }
    await this.modalController.dismiss({
      data: this.MULTIlist[this.MULTIlist.length-1] ? this.customMULTIlist : this.selectcourse,
      data2:this.id,
      data3:localStorage.getItem("totalAmountChoosen"),
      data4:this.Total
      // data4: localStorage.getItem("totalAmountChoosen")
    });
  }
}
}
