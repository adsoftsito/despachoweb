import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../../shared/models/user.model';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { Subscription } from 'rxjs/Subscription';
import { ClientProductService } from '../clients.service';
import { DualListComponent } from 'angular-dual-listbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'form-client-product-component',
  templateUrl: './formClient.component.html',
  styleUrls: ['./formClient.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideHiddenShow', [
      state('hidden', style({
        transform: 'translate3d(100%, 0, 0)',
        display: 'none',
      })),
      state('show', style({
        transform: 'translate3d(0, 0, 0)',
      }))
    ]),
  ],
})
export class FormClientProductComponent implements OnInit{

@ViewChild('window') window: ElementRef;
@ViewChild('backdrop') windowBackdrop: ElementRef;
windowState: string = 'hidden';
clientModel: any = {};
flagCheck1: boolean = false;
flagCheck2: boolean = false;
flagCheck3: boolean = false;
flagCheckAccount: boolean = true;
flagCreatePassUser: boolean = false;
initials: string;
initialsColor: string;
setColorAvatar: string;
userName: any;
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
form:FormGroup;
editar: boolean;
flagSend: boolean = false;
email:AbstractControl;
password:AbstractControl;
subscriptionCreate: Subscription;
subscriptionEdit: Subscription;
userRols: any[] = [
      { rol: 'Admin'},
      { rol: 'User'},
      { rol: 'Gestor'}
      ];
public eje: String;
public exampleData: Array<Select2OptionData>;
public options: Select2Options;
public optionsPermits: Select2Options;

//translate
title = 'pages.userControl.clients.formClient.title';
edit = 'pages.userControl.clients.formClient.edit';

viaje = 'pages.logistica.clients.formClient.viaje';
ruta = 'pages.logistica.clients.formClient.ruta';

//account = 'pages.userControl.clients.formClient.account';
//permissions = 'pages.userControl.clients.formClient.permissions';
//interface = 'pages.userControl.clients.formClient.interface';


editClientTrans = 'pages.userControl.clients.formClient.editClientTrans';
createClientTrans = 'pages.userControl.clients.formClient.createClientTrans';
companyInformation = 'pages.userControl.clients.formClient.companyInformation';

begin = 'pages.logistica.clients.formClient.begin';
end = 'pages.logistica.clients.formClient.end';
operador = 'pages.logistica.clients.formClient.operador';
unidad = 'pages.logistica.clients.formClient.unidad';
remolque1 = 'pages.logistica.clients.formClient.remolque1';
dolly = 'pages.logistica.clients.formClient.dolly';
remolque2 = 'pages.logistica.clients.formClient.remolque2';

postalCode = 'pages.userControl.clients.formClient.postalCode';
state = 'pages.userControl.clients.formClient.state';
city = 'pages.userControl.clients.formClient.city';
landline = 'pages.userControl.clients.formClient.landline';
numberExtension = 'pages.userControl.clients.formClient.numberExtension';
phone = 'pages.userControl.clients.formClient.phone';


beginDet = 'pages.logistica.clients.formClient.beginDet';
endDet = 'pages.logistica.clients.formClient.endDet';
operadorDet = 'pages.logistica.clients.formClient.operadorDet';
unidadDet = 'pages.logistica.clients.formClient.unidadDet';
remolque1Det = 'pages.logistica.clients.formClient.remolque1Det';
dollyDet = 'pages.logistica.clients.formClient.dollyDet';
remolque2Det = 'pages.logistica.clients.formClient.remolque2Det';

cancel = 'pages.userControl.clients.formClient.cancel';
back = 'pages.userControl.clients.formClient.back';
next = 'pages.userControl.clients.formClient.next';

//Billing
fiscalData = 'pages.userControl.clients.formClient.fiscalData';
physicalPerson = 'pages.userControl.clients.formClient.physicalPerson';
moralPerson = 'pages.userControl.clients.formClient.moralPerson';
physicalPersonWithBusiness = 'pages.userControl.clients.formClient.physicalPersonWithBusiness';
billingPeriod = 'pages.userControl.clients.formClient.billingPeriod';

//Account
accountInformation = 'pages.userControl.clients.formClient.accountInformation';
name = 'pages.userControl.clients.formClient.name';
surnames = 'pages.userControl.clients.formClient.surnames';
emailAccount = 'pages.userControl.clients.formClient.emailAccount';
position = 'pages.userControl.clients.formClient.position';
department = 'pages.userControl.clients.formClient.department';
sendInvitation = 'pages.userControl.clients.formClient.sendInvitation';
generatePass = 'pages.userControl.clients.formClient.generatePass';
restorePassword = 'pages.userControl.clients.formClient.restorePassword';
createUserAndPass = 'pages.userControl.clients.formClient.createUserAndPass';
username = 'pages.userControl.clients.formClient.username';
passwordAccount = 'pages.userControl.clients.formClient.passwordAccount';

//Permissions
productsPlatforms = 'pages.userControl.clients.formClient.productsPlatforms';
available = 'pages.userControl.clients.formClient.available';
selected = 'pages.userControl.clients.formClient.selected';
platforms = 'pages.userControl.clients.formClient.platforms';
roles = 'pages.userControl.clients.formClient.roles';

//Interface
regionalConfiguration = 'pages.userControl.clients.formClient.regionalConfiguration';
unitSystem = 'pages.userControl.clients.formClient.unitSystem';
measurementOfFuelConsumption = 'pages.userControl.clients.formClient.measurementOfFuelConsumption';
dateFormat = 'pages.userControl.clients.formClient.dateFormat';
hourFormat = 'pages.userControl.clients.formClient.hourFormat';
timeZone = 'pages.userControl.clients.formClient.timeZone';
coin = 'pages.userControl.clients.formClient.coin';
language = 'pages.userControl.clients.formClient.language';
weekStartsIn = 'pages.userControl.clients.formClient.weekStartsIn';
userInterfaceConfiguration = 'pages.userControl.clients.formClient.userInterfaceConfiguration';
homepage = 'pages.userControl.clients.formClient.homepage';
logOut = 'pages.userControl.clients.formClient.logOut';
metric = 'pages.userControl.clients.formClient.metric';
measuresUSImperial = 'pages.userControl.clients.formClient.measuresUSImperial';
sunday = 'pages.userControl.clients.formClient.sunday';
monday = 'pages.userControl.clients.formClient.monday';
saturday = 'pages.userControl.clients.formClient.saturday';
save = 'pages.userControl.clients.formClient.save';

//Translate Modal
header = 'pages.modalInvitation.header';
content = 'pages.modalInvitation.content';
contents = 'pages.modalInvitation.contents';
accept = 'pages.modalInvitation.accept';

// Configuration Dual-Listbox
confirmed:Array<any> =[];
confirmedDummi:Array<any> =[{
  "key": 2,
  "plataform": "  ",
  "permissions": [{
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }]
},
{
  "key": 3,
  "plataform": "  ",
  "permissions": [{
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }]
},{
  "key": 4,
  "plataform": "  ",
  "permissions": [{
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }]
},
{
  "key": 5,
  "plataform": "  ",
  "permissions": [{
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }]
}];
source: Array<any>;
dataExample: Array<any> = [
  {
    "key": 1,
    "plataform": "Tecnomotum",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Monitorista"
    }, {
      "permission": "Ayudante"
    },{
      "permission": "Client"
    }, {
      "permission": "Relleno"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    },{
      "permission": "Aquí"
    }, {
      "permission": "Estoy"
    }, {
      "permission": "Yo"
    }, {
      "permission": "Jaja"
    }]
  },
  {
    "key": 2,
    "plataform": "Modelo T2",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },
  {
    "key": 3,
    "plataform": "Freightliner",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },
  {
    "key": 4,
    "plataform": "Toltec",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },
  {
    "key": 5,
    "plataform": "Osier",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },{
    "key": 6,
    "plataform": "Test",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },{
    "key": 7,
    "plataform": "Test",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },{
    "key": 8,
    "plataform": "Test",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },{
    "key": 9,
    "plataform": "Test",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },{
    "key": 10,
    "plataform": "Test",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },{
    "key": 11,
    "plataform": "Test",
    "permissions": [{
      "permission": "Admin"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  }];
format:any = { direction: DualListComponent.LTR, draggable: true, add: '>', remove: '<'};
key = 'key';
keepSorted = true;
display = 'plataform';
filter = true;

constructor(private renderer: Renderer2, private clientProductService: ClientProductService,
   private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal) {
    // this.clientModel = new User();
    this.source = JSON.parse(JSON.stringify(this.dataExample));
  // this.validateForm();

  this.subscriptionCreate = clientProductService.createClient$.subscribe(
    state => {
      // this.clientModel = new User();
      this.clientModel.rol = 'Admin';
      this.clientModel.nombre = '';
      this.editar = false;
      this.toggle(false,'create');
      this.clientModel.status = true;
    });


  this.subscriptionEdit = clientProductService.updateClient$.subscribe(
    user => {
      this.clientModel = new User();
      this.editar = true;
      this.clientModel.nombre = '';
      //this.clientModel = user;
      this.clientModel.usuario = 'Editar';
      this.toggle(false,'edit');

   /*   let cad: string = String (this.userName = this.clientModel.usuario+' '+this.clientModel.apellidop);
      let word = '';
      let letter = '';
      let carat = cad.length;

      for (let index = 0; index < carat; index++) {
          if(cad.charAt(index)!=' '){
            word += cad.charAt(index);
            if(index+1 === carat){
              letter += word.charAt(0);
              this.initials = letter.toUpperCase();
              this.initialsColor = this.initials.charAt(0);

              if(this.initialsColor >= 'A' && this.initialsColor <= 'C'){
                  this.setColorAvatar = 'azulB';
                }else{
                  if(this.initialsColor >= 'D' && this.initialsColor <= 'F'){
                    this.setColorAvatar = 'amarillo';
                  }else{
                    if(this.initialsColor >= 'G' && this.initialsColor <= 'I'){
                      this.setColorAvatar = 'rojo';
                    }else{
                      if(this.initialsColor >= 'J' && this.initialsColor <= 'L'){
                        this.setColorAvatar = 'morado';
                      }else{
                        if(this.initialsColor >= 'M' && this.initialsColor <= 'O'){
                          this.setColorAvatar = 'verde';
                        }else{
                          if(this.initialsColor >= 'P' && this.initialsColor <= 'R'){
                            this.setColorAvatar = 'rosa';
                          }else{
                            if(this.initialsColor >= 'S' && this.initialsColor <= 'U'){
                              this.setColorAvatar = 'verdeF';
                            }else{
                              if(this.initialsColor >= 'V' && this.initialsColor <= 'Z'){
                                this.setColorAvatar = 'rosaF';
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
          }else{
            letter += word.charAt(0);
            word='';
        }
      }*/
  });
   }

ngOnInit() {
  this.exampleData = [{id:'eje1', text:'RoadAdvisor'},{id:'eje2', text:'MotumWeb'}];
  this.options = {
    multiple: true,
    theme: 'classic',
    closeOnSelect: false,
  }
  this.optionsPermits = {
    multiple: true,
    theme: 'classic',
    closeOnSelect: true,
  }
}

onButtonGroupClick($event){
  let clickedElement = $event.target || $event.srcElement;

  if( clickedElement.nodeName === "BUTTON" ) {

    let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
    // if a Button already has Class: .active
    if( isCertainButtonAlreadyActive ) {
      isCertainButtonAlreadyActive.classList.remove("active");
    }

    clickedElement.className += " active";
  }

}



ngOnDestroy() {
  this.subscriptionCreate.unsubscribe();
  this.subscriptionEdit.unsubscribe();
  this.windowState = null;
  this.initials = null;
  this.userName = null;
  this.emailPattern = null;
  this.form = null;
  this.email = null;
  this.password = null;
  this.userRols = null;
}

validateForm() {
  this.form = this.formBuilder.group({
    'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
    'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
  });

  this.email = this.form.controls['email'];
  this.password = this.form.controls['password'];
}

toggle(control , windowType) {
  switch (control) {
    case true:
      this.windowState = 'hidden';
    break;
    case false:
      this.windowState = 'show';
    break;
    default:
      this.windowState = this.windowState === 'show' ? 'hidden' : 'show';
    break;
  }
  if (windowType === 'create') {
    this.windowCreateClass();
  }else {
    this.windowEditClass();
  }
}

createClient() {
  this.router.navigate(['/', 'pages', 'usersControl', 'clients-products']).then(nav => {
    setTimeout(() => {
       if (this.editar) {
         this.clientProductService.updateClientProduct();
       }else {
         this.clientProductService.createClientProductEnd(null);
       }
       this.clearModels();
     }, 200);
     //console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
  });
}

clearModels() {
  this.toggle(true, null);
}
windowEditClass() {
  this.renderer.addClass(this.window.nativeElement, 'window-edit');
  this.renderer.removeClass(this.window.nativeElement, 'window-create');
  this.renderer.addClass(this.windowBackdrop.nativeElement, 'window-backdrop');
}

windowCreateClass() {
  this.renderer.removeClass(this.window.nativeElement, 'window-edit');
  this.renderer.addClass(this.window.nativeElement, 'window-create');
  this.renderer.addClass(this.windowBackdrop.nativeElement, 'window-backdrop');
}

radioBotton1(flagCheck){
  this.flagCheck2 = false;
  this.flagCheck3 = false;
  if(flagCheck == false){ this.flagCheck1 = true; } else{ this.flagCheck1 = false; }
}
radioBotton2(flagCheck){
  this.flagCheck1 = false;
  this.flagCheck3 = false;
  if(flagCheck == false){ this.flagCheck2 = true; } else{ this.flagCheck2 = false; }
}
radioBotton3(flagCheck){
  this.flagCheck1 = false;
  this.flagCheck2 = false;
  if(flagCheck == false){ this.flagCheck3 = true; } else{ this.flagCheck3 = false; }
}

send(flagCheck){
  this.flagCreatePassUser = false;
  if(flagCheck == false){ this.flagCheckAccount = true; } else{ this.flagCheckAccount = false; }
}

createPassUser(flagCheck){
  this.flagCheckAccount = false;
  if(flagCheck == false){ this.flagCreatePassUser = true; } else{ this.flagCreatePassUser = false; }
}

sendInvitationModal(alert){
  if(this.flagCheckAccount){
    console.log('abre modal Y flagCheckAccount',this.flagCheckAccount,'  lega: ',alert);


    const modalRef = this.modalService.open(alert, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-confirm', backdrop: true });
    modalRef.result.then((userResponse) => {
      if(userResponse) {
      }
    });

  }
}

}
