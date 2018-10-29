import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $( document ).ready( function () {
        $( '.dropdown-menu a, .dropdown-menu i' ).on( 'click', function ( e ) {
          console.log('evento: ',e);
            return false;
        } );
    } );
  }
  
}
