import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../../shared/models/user.model';
import { UserService } from "../user.service";
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { Subscription } from 'rxjs/Subscription';
import { DualListComponent } from 'angular-dual-listbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'create-user-component',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideHiddenShow', [
      state('hidden', style({
        transform: 'translate3d(100%, 0, 0)',
        display: 'none',
      })),
      state('show', style({
        transform: 'translate3d(0, 0, 0)',
      })),
      // transition('hidden => show', animate('400ms ease-in-out')),
      // transition('show => hidden', animate('400ms ease-in-out')),
    ]),
  ],
})

export class CreateUserComponent implements OnInit, OnDestroy {
  @ViewChild('window', {read: ElementRef}) window: ElementRef;
  @ViewChild('backdrop', {read: ElementRef}) windowBackdrop: ElementRef;
  windowState: string = 'hidden';
  userModel: User;
  initials: string;
  initialsColor: string;
  setColorAvatar: string;
  userName: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  form:FormGroup;
  editar: boolean;
  email:AbstractControl;
  password:AbstractControl;
  subscriptionCreate: Subscription;
  subscriptionEdit: Subscription;

  public eje: String;
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public optionsPermits: Select2Options;

  //translate
  title = 'pages.userControl.usersComponent.createUser.title';
  edit = 'pages.userControl.usersComponent.createUser.edit';
  users = 'pages.userControl.usersComponent.createUser.users';
  interface = 'pages.userControl.usersComponent.createUser.interface';
  permissions = 'pages.userControl.usersComponent.createUser.permissions';
  editUserTrans = 'pages.userControl.usersComponent.createUser.editUserTrans';
  createUserTrans = 'pages.userControl.usersComponent.createUser.createUserTrans';
  personalInformation = 'pages.userControl.usersComponent.createUser.personalInformation';
  nameUser = 'pages.userControl.usersComponent.createUser.nameUser';
  surnamesUser = 'pages.userControl.usersComponent.createUser.surnamesUser';
  contactInformation = 'pages.userControl.usersComponent.createUser.contactInformation';
  phoneUser = 'pages.userControl.usersComponent.createUser.phoneUser';
  emailAccountUser = 'pages.userControl.usersComponent.createUser.emailAccountUser';
  accountInformationUser = 'pages.userControl.usersComponent.createUser.accountInformationUser';
  usernameUser = 'pages.userControl.usersComponent.createUser.usernameUser';
  passwordUser = 'pages.userControl.usersComponent.createUser.passwordUser';
  generatePasswordUser = 'pages.userControl.usersComponent.createUser.generatePasswordUser';
  restorePassword = 'pages.userControl.usersComponent.createUser.restorePassword';
  status = 'pages.userControl.usersComponent.createUser.status';

  cancel = 'pages.userControl.usersComponent.createUser.cancel';
  back = 'pages.userControl.usersComponent.createUser.back';
  next = 'pages.userControl.usersComponent.createUser.next';
  save = 'pages.userControl.usersComponent.createUser.save';

  //Interface
  regionalConfiguration = 'pages.userControl.usersComponent.createUser.regionalConfiguration';
  countryRegion = 'pages.userControl.usersComponent.createUser.countryRegion';
  state = 'pages.userControl.usersComponent.createUser.state';
  city = 'pages.userControl.usersComponent.createUser.city';
  unitSystem = 'pages.userControl.usersComponent.createUser.unitSystem';
  measurementOfFuelConsumption = 'pages.userControl.usersComponent.createUser.measurementOfFuelConsumption';
  dateFormat = 'pages.userControl.usersComponent.createUser.dateFormat';
  hourFormat = 'pages.userControl.usersComponent.createUser.hourFormat';
  timeZone = 'pages.userControl.usersComponent.createUser.timeZone';
  coin = 'pages.userControl.usersComponent.createUser.coin';
  language = 'pages.userControl.usersComponent.createUser.language';
  weekStartsIn = 'pages.userControl.usersComponent.createUser.weekStartsIn';
  userInterfaceConfiguration = 'pages.userControl.usersComponent.createUser.userInterfaceConfiguration';
  homepage = 'pages.userControl.usersComponent.createUser.homepage';
  logOut = 'pages.userControl.usersComponent.createUser.logOut';
  metric = 'pages.userControl.usersComponent.createUser.metric';
  measuresUSImperial = 'pages.userControl.usersComponent.createUser.measuresUSImperial';
  sunday = 'pages.userControl.usersComponent.createUser.sunday';
  monday = 'pages.userControl.usersComponent.createUser.monday';
  saturday = 'pages.userControl.usersComponent.createUser.saturday';

  //Permissions
  productsPlatforms = 'pages.userControl.usersComponent.createUser.productsPlatforms';
  available = 'pages.userControl.usersComponent.createUser.available';
  selected = 'pages.userControl.usersComponent.createUser.selected';
  platforms = 'pages.userControl.usersComponent.createUser.platforms';
  roles = 'pages.userControl.usersComponent.createUser.roles';

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
  constructor(private renderer: Renderer2, private userService: UserService,
     private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal) {
    this.userModel = new User();
    this.source = JSON.parse(JSON.stringify(this.dataExample));

    // this.validateForm();

    this.subscriptionCreate = userService.createUser$.subscribe(
      state => {
        this.userModel = new User();
        this.userModel.rol = 'Admin';
        this.editar = false;
        this.toggle(false,'create');
        this.userModel.status = true;
      });


    this.subscriptionEdit = userService.editUser$.subscribe(
      user => {
        this.userModel = new User();
        this.editar = true;
        this.userModel = user;
        this.toggle(false,'edit');

        let cad: string = String (this.userName = this.userModel.usuario+' '+this.userModel.apellidop);
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
        }
    });
  }
  ngOnInit() {
    this.exampleData = [{id:'eje1', text:'RoadAdvisor'},{id:'eje2', text:'MotumWeb'}];
    this.options = {
      multiple: false,
      minimumResultsForSearch: -1,
      theme: 'classic',
      closeOnSelect: true,
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
  }

  validateForm() {
    this.form = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }
  onChangePassword(alert) {
    const modalRef = this.modalService.open(alert, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-confirm', backdrop: true });
    modalRef.result.then((userResponse) => {
      if(userResponse) {
      }
    });
  }
  generatePassword() {

  }
  getListPermission() {

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


  createUser() {
    this.router.navigate(['/', 'pages', 'usersControl', 'users']).then(nav => {
      setTimeout(() => {
         if (this.editar) {
           this.userService.editUser(this.userModel);
         }else {
           this.userService.createUser(this.userModel);
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

}
