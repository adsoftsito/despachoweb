import {Component} from '@angular/core';
import {GlobalState} from '../../../global.state';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {LoginService} from "../../../shared/providers/login.service";
import { IMAGES_ROOT } from '../../theme.constants';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop{

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = true;
  private userData: any;
  iconLogin:string;

  
  constructor(private _state:GlobalState, private loginSrv: LoginService) {
    this._state.notifyDataChanged('menu.isCollapsed', true);

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.userData = this.loginSrv.isLogged();
    this.iconLogin = IMAGES_ROOT+'logoblanco1.svg';
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    $(document).ready(function(){
        jQuery('img.svg').each( function(){
            let $img = jQuery(this);
            let imgID = $img.attr('id');
            let imgClass = $img.attr('class');
            let imgURL = $img.attr('src');
  
            jQuery.get(imgURL, function(data){
                var $svg = jQuery(data).find('svg');
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                $img.replaceWith($svg);
            }, 'xml');
  
        });
    });
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  signOut() {
    this.loginSrv.logout();
  }

}
