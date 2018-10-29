import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../../shared/models/user.model';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { Subscription } from 'rxjs/Subscription';
import { ClientProductService } from '../clients.service';
@Component({
  selector: 'form-order-component',
  templateUrl: './formOrder.component.html',
  styleUrls: ['./formOrder.component.scss'],
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
export class FormOrderComponent implements OnInit, OnDestroy{

  @ViewChild('window') window: ElementRef;
  @ViewChild('backdrop') windowBackdrop: ElementRef;
  windowState: string = 'hidden';
  userModel: any = {};
  initials: string;
  initialsColor: string;
  setColorAvatar: string;
  userName: any;
  editar: boolean;
  saveListVehicle: boolean;
  subscriptionCreate: Subscription;
  subscriptionEdit: Subscription;
  public eje: String;
  public options: Select2Options;

  tableListArrayDummi:Array<any> = [{'index':''},{'index':''},{'index':''},{'index':''}];
  selectedRowVehicleDispositive : Number;
  selectedRowAccessories : Number;
  setClickedRowVehicleDispositive : Function;
  setClickedRowAccessories : Function;
  pedidoSelected : Array<any>;
  vehicleSelected : Array<any>;
  pedido: Array<any> = [];
  listVehicleDispositive: Array<any> = [];
  listAccessories: Array<any> = [];
  objAccessories: any = {
      'number':'',
      'quantity': '',
      'product': ''
    };
  objVehicleDispositive: any = {
    'vehicle':{
      'number':'',
      'brand': '',
      'model': '',
      'year': '',
      'vin': '',
      'plates': '',
      'economic': '',
    },
    'dispositive':{
      'builder': '',
      'model': '',
      'variant': '',
      'status': '',
    }
  };
  productForm: any = {
    'quantity': 1,
    'plan': '',
    'product': '',
    'charge': '',
    'duration': '',
    'folioERP': '',
    'status': '',
  };
  productsList: Array<any> = [];
  products: Array<any> = [{
    'id':'1',
    'product': 'Compra'
  },{
    'id':'2',
    'product': 'Suscripción'
  }];

  plan: Array<any> = [{
    'id':'1',
    'plan': 'Motum Uptime'
  },{
    'id':'2',
    'plan': 'MotumTrack'
  }];
  duration: Array<any> = [{
    'id':'1',
    'duration': '9 meses'
  },{
    'id':'2',
    'duration': '12 meses'
  },{
    'id':'3',
    'duration': '36 meses'
  }];
  constructor(private renderer: Renderer2, private clientProductService: ClientProductService,
    private formBuilder: FormBuilder, private router: Router) {

      this.subscriptionCreate = clientProductService.sCreateOrder$.subscribe(
        state => {
          this.userModel.rol = 'Admin';
          this.userModel.usuario = 'User';
          this.editar = false;
          this.toggle(false,'create');
          this.userModel.status = true;
        });

        this.setClickedRowVehicleDispositive = function(param , indice) {
          let prev = this.selectedRowVehicleDispositive;
          this.selectedRowVehicleDispositive = indice;
          this.pedidoSelected = param;
          if(this.saveListVehicle) {
            if (prev === undefined) {
              this.productsList[indice].listVehicleDispositive = this.listVehicleDispositive.slice();
            } else {
              this.productsList[prev].listVehicleDispositive = this.listVehicleDispositive.slice();
            }
            this.saveListVehicle = false;
          }else {
            if(this.productsList[indice].listVehicleDispositive) {
              this.listVehicleDispositive = this.productsList[indice].listVehicleDispositive.slice();
            }else {
              if (prev !== indice) {
                this.listVehicleDispositive.splice(0, this.listVehicleDispositive.length);
                for (let i = 0; i < param.quantity; i++) {
                  this.listVehicleDispositive.push({
                    'vehicle':{
                      'number':'',
                      'brand': '',
                      'model': '',
                      'year': '',
                      'vin': '',
                      'plates': '',
                      'economic': '',
                    },
                    'dispositive':{
                      'builder': '',
                      'variant': '',
                      'model': '',
                      'status': '',
                    }
                  });
                }
              }
            }
          }
          console.info(this.productsList);

        }

        this.setClickedRowAccessories = function(param , indice,indice2) {
          let prev = this.selectedRowAccessories;
          this.selectedRowAccessories = indice +''+indice2;
          this.vehicleSelected = param;
          console.info(this.selectedRowAccessories);
          if (prev !== indice) {
            this.listAccessories.splice(0, this.listAccessories.length);
            for (let i = 0; i < 1; i++) {
              this.listAccessories.push({
                  'number':'',
                  'quantity': '',
                  'product': '',
                  'status': '',
                });
            }
          }
        }
      }

      ngOnInit() {
        this.options = {
          multiple: false,
          theme: 'classic',
          closeOnSelect: true,
        }
      }
      onChangeQuantityProduct(event) {
        this.saveListVehicle = true;
        this.listVehicleDispositive.splice(0, this.listVehicleDispositive.length);
        for (let i = 0; i < event.srcElement.valueAsNumber; i++) {
          this.listVehicleDispositive.push({
            'vehicle':{
              'number':'',
              'brand': '',
              'model': '',
              'year': '',
              'vin': '',
              'plates': '',
              'economic': '',
            },
            'dispositive':{
              'builder': '',
              'variant': '',
              'model': '',
              'status': '',
            }
          });
        }
      }
      valueChangedVehicleBrand(event, indice) {
        this.listVehicleDispositive[indice].vehicle.brand = event.value;
        this.saveListVehicle = true;
      }
      valueChangedVehicleModel(event, indice) {
        this.listVehicleDispositive[indice].vehicle.model = event.value;
        this.saveListVehicle = true;
      }
      valueChangedVehicleYear(event, indice) {
        this.listVehicleDispositive[indice].vehicle.year = event.value;
        this.saveListVehicle = true;
      }
      valueChangedDispositiveBuilder(event, indice) {
        this.listVehicleDispositive[indice].dispositive.builder = event.value;
        this.saveListVehicle = true;
      }
      valueChangedDispositiveVariant(event, indice) {
        this.listVehicleDispositive[indice].dispositive.variant = event.value;
        this.saveListVehicle = true;
      }
      valueChangedDispositiveModel(event, indice) {
        this.listVehicleDispositive[indice].dispositive.model = event.value;
        this.saveListVehicle = true;
      }
      valueChangedDispositiveStatus(event, indice) {
        this.listVehicleDispositive[indice].dispositive.status = event.value;
        this.saveListVehicle = true;
      }
      valueChangedVehicleAccProduct(event, indice) {
        console.info(event);
      }
      valueChangedProductProduct(event, indice) {
        this.productsList[indice].product = event.value;
      }
      valueChangedProductPlan(event, indice) {
        this.productsList[indice].plan = event.value;
      }
      valueChangedProductCharge(event, indice) {
        this.productsList[indice].charge = event.value;
      }
      valueChangedProductDuration(event, indice) {
        this.productsList[indice].duration = event.value;
      }
      valueChangedProductStatus(event, indice) {
        this.productsList[indice].status = event.value;
      }
      ngOnDestroy() {
        this.subscriptionCreate.unsubscribe();
        // this.subscriptionEdit.unsubscribe();
        this.windowState = null;
        this.initials = null;
        this.userName = null;
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

      addOrder() {
        this.productsList.push(this.productForm);
        this.productForm = {
          'quantity': 1,
          'plan': '',
          'product': '',
          'charge': '',
          'duration': '',
          'folioERP': '',
          'status': '',
        };
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
