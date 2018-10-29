/**
 * Created by Tech Group BWL on 16/07/2018.
 */
import {Component, OnInit, ViewEncapsulation,OnDestroy, AfterViewInit} from '@angular/core';
import {Subscription, Subject} from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'mr-search-tools-component',
  templateUrl: './searchTools.component.html',
  styleUrls: ['./searchTools.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MonitoringReactionSearchToolsComponent implements OnInit, OnDestroy, AfterViewInit {

  addressList: Array<any> = [];
  vehicleList: Array<any> = [];
  interestPointList: Array<any> = [];

  searchAddressSubject = new Subject<string>();
  searchVehicleSubject = new Subject<string>();
  searchInterestPointSubject = new Subject<string>();

  $searchAddress: Subscription;
  $searchVehicle: Subscription;
  $searchInterestPoint: Subscription;

  constructor() {}

  ngOnInit() {
    this.setUpDebounceTimeInput();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.$searchAddress.unsubscribe();
    this.$searchVehicle.unsubscribe();
    this.$searchInterestPoint.unsubscribe();
  }

  setUpDebounceTimeInput() {
    this.$searchAddress = this.searchAddressSubject
      .map((event: any)=> event.target.value)
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(data => {
        this.retrieveAddresses(data);
      });
    this.$searchVehicle = this.searchVehicleSubject
      .map((event: any)=> event.target.value)
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(data => {
        this.retrieveVehicles(data);
      });
    this.$searchInterestPoint = this.searchInterestPointSubject
      .map((event: any)=> event.target.value)
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(data => {
        this.retrieveInterestsPoints(data);
      });
  }

  retrieveAddresses(data) {
    this.addressList = [];
    if (data) {
      for (let i = 0; i < 5; i++) {
        this.addressList.push({
          label: data,
          unit: ''
        });
      }
      return;
    }
  }
  retrieveVehicles(data) {
    this.vehicleList = [];
    if (data) {
      for (let i = 0; i < 5; i++) {
        this.vehicleList.push({
          label: data,
          unit: ''
        });
      }
      return;
    }
  }
  retrieveInterestsPoints(data) {
    this.interestPointList = [];
    if (data) {
      for (let i = 0; i < 5; i++) {
        this.interestPointList.push({
          label: data,
          unit: ''
        });
      }
      return;
    }
  }
}