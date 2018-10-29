import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <!--<div class="al-content">-->
        <router-outlet></router-outlet>
      <!--</div>-->
    </div>
    <ba-back-top position="200"></ba-back-top>
    `,
    // <footer class="al-footer clearfix">
    //   <div class="al-footer-main clearfix">
    //
    //   </div>
    // </footer>
  styles: [`.al-main {padding: 66px 0 0 0;}`]
})
export class Pages {

  lang: string;

  constructor(private _menuService: BaMenuService, private translate: TranslateService  ) {
    this.changeLenguage();
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }

  changeLenguage(){
    this.lang = localStorage.getItem('lang');
    if(this.lang === null){
      this.translate.getBrowserLang();
    }else{
      this.translate.use(this.lang);
    }
  }




}
