import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: 'home/common',
    pathMatch: 'full'
  },
  {
    path: 'Menupage',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
  },
  {
    path: 'login/:id',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup/:id',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'home/:type',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home-inner/:id',
    loadChildren: () => import('./home-inner/home-inner.module').then( m => m.HomeInnerPageModule)
  },
  {
    path: 'home-details/:id',
    loadChildren: () => import('./home-details/home-details.module').then( m => m.HomeDetailsPageModule)
  },
  {
    path: 'myprofile/:type',
    loadChildren: () => import('./myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'changepassword/:type',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'login/:type',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup/:type',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'trainingcenter',
    loadChildren: () => import('./training-center/training-center.module').then( m => m.TrainingCenterPageModule)
  },
  {
    path: 'trainingreport',
    loadChildren: () => import('./trainingreport/trainingreport.module').then( m => m.TrainingReportPageModule)
  },
  {
    path: 'examguidence',
    loadChildren: () => import('./examguidence/examguidence.module').then( m => m.ExamGuidencePageModule)
  },
  {
    path: 'studentack',
    loadChildren: () => import('./studentack/studentack.module').then( m => m.StudentAckPageModule)
  },
  {
    path: 'studentform',
    loadChildren: () => import('./studentform/studentform.module').then( m => m.StudentFormPageModule)
  },
  {
    path: 'questionsall/:testID/:OverId/:timer',
    loadChildren: () => import('./questionsall/questionsall.module').then( m => m.QuestionsAllPageModule)
  },
  {
    path: 'answerscheck/:sid/:link',
    loadChildren: () => import('./answerscheck/answerscheck.module').then( m => m.AnswersCheckPageModule)
  },
  {
    path: 'questions/:sectionId/:testID/:sectionName/:timer/:module/:back',
    loadChildren: () => import('./questions/questions.module').then( m => m.QuestionsPageModule)
  },
  {
    path: 'forgotpassword/:id',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgorPasswordPageModule)
  },
  {
    path: 'forgotpassword/:type',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgorPasswordPageModule)
  },
  {
    path: 'forgotpassconfirm/:email/:type',
    loadChildren: () => import('./forgotpassconfirm/forgotpassconfirm.module').then( m => m.ForgorPassConfirmPageModule)
  },
  {
    path: 'forgotpassproc',
    loadChildren: () => import('./forgotpassproc/forgotpassproc.module').then( m => m.ForgorPassProcPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
