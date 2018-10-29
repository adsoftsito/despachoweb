import {Component, ViewChild} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {LoginService} from "../../shared/providers/login.service";
import { IMAGES_ROOT } from '../../theme/theme.constants';



@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})


export class Login{

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  fullPassword: string;
  dangerpass: boolean;
  warningpass: boolean;
  isPassword = true;
  warningemail: boolean;
  dangeremail: boolean;
  selectValue: string;
  accountant:number = 0;
  faultCounter: number = 0;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  goSesion: boolean = false;
  iconLogin:string;
  @ViewChild('pErrorEmail') public popover: NgbPopover;

  recapcha: boolean= false;

  greeting = {};
  constructor(fb:FormBuilder, private translate: TranslateService, private router: Router, private _service: LoginService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.langDefault();
    this.iconLogin = IMAGES_ROOT+'logoblanco.svg';
    console.log(this.iconLogin);
  }


  
  public onSubmit(values:Object):void {
    this.submitted = true;
    
    if(this.email.valid) {
      this.goSesion = true;
      this.validateEmail(this.email.valid);
      this.accountant++;
      this.validatePassword(this.password.value, this.password.valid, this.accountant);
    }else{
      this.validateEmail(this.email.valid);
    }


  }

  resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
  }


  validateEmail(emailValid: boolean){
      if(emailValid === false && this.email.value !==""){
        this.dangeremail = true;
        setTimeout(() => this.dangeremail  = false, 1500);
      }else{
       if(emailValid === true && this.email.value !==""){
       }else{
        this.warningemail = true;
        setTimeout(() => this.warningemail  = false, 1500);
       }
      }
  }



  validatePassword(emptypassword: string, passwordValidity: boolean, accountant: number){ 
    if(emptypassword ==="" && passwordValidity ===false && accountant>1 || !this.goSesion){
        this.warningpass = true;
        setTimeout(() => this.warningpass  = false, 1500);
    }if(emptypassword !=="" && passwordValidity===false && emptypassword.length<6){
      this.dangerpass = true;
      setTimeout(() => this.dangerpass= false, 1500);
    }if(emptypassword.length>=6){
      this.fullPassword = this.password.value;
      this.validateLoginData();
    }

  }


  validateLoginData(){
    const body = {email: this.email.value, password: this.fullPassword};
    this._service.authenticate(body)
      .subscribe(
        res => {
          let bodyResponse: any = JSON.parse(res['_body']);
          if (bodyResponse) {
            bodyResponse.email = body.email;
            this._service.loggedIn(bodyResponse);
            //TODO: HERE WE RECEIVE URL PATH TO REDIRECT
            this.router.navigate(['/pages']);
          } else {
            console.error('Hay un problema');
          }
        },
        (err: any) => {
          this.faultCounter++;
          if(this.faultCounter>=5){
            this.recapcha = true;
          }
        }
      );
  }

  statusChange(){
    this.isPassword = !(this.isPassword);
  }

  changeLanguage(lang: string){
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  langDefault(){
    const langChe = localStorage.getItem('lang');
    if(langChe === null){
      this.selectValue = this.translate.getBrowserLang();
    }else{
      this.selectValue = localStorage.getItem('lang');
      this.translate.use(this.selectValue);
    }

  }

}