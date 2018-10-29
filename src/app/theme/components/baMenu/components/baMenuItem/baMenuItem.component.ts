import {Component, Input, Output, EventEmitter, ViewChild, OnInit} from '@angular/core';
import {BaMenuService} from "../../../../services/baMenu/baMenu.service";
import {EventsService} from "../../../../../shared/providers/events";
import {Constants} from "../../../../../shared/providers/constants";
// import { MenuComponent } from '../../../../../pages//menuGrafiComponent';
@Component({
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html',
  styleUrls: ['./baMenuItem.scss']
})
export class BaMenuItem implements OnInit {
  // @ViewChild(MenuComponent) menuComponent: MenuComponent;
  @Input() menuItem: any;
  @Input() child: boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  constructor(
    private service: BaMenuService,
    private events: EventsService,
    private C: Constants
  ) {}

  ngOnInit() {
    let item: any = {
      name: this.menuItem._id,
      status: this.menuItem.selected
    };
    this.service.setStatusItems(item);
  }

  onHoverItem($event): void {
     this.itemHover.emit($event);
  }

  onToggleSubMenu($event, item): boolean {
    this.onClickItem($event, item);

    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  onClickItem($event, item) {
    this.service.toggleStatus(item._id);
    this.events.publish(this.C.EVENTS_SERVICE.SIDEBAR_MENU_ITEM_TOGGLE);
  }

}
