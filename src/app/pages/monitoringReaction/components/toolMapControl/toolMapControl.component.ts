import {Component, Input, ViewEncapsulation} from "@angular/core";
/**
 * Created by Tech Group BWL on 10/07/2018.
 */
@Component({
  selector: "mr-tool-map-control-component",
  templateUrl: './toolMapControl.component.html',
  styleUrls: ['./toolMapControl.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MonitoringReactionToolMapControlComponent {

  @Input() mapElement: any;

  isDisplayContent = [false, false, false, false];

  timeoutHandler: any;
  hasBeenLongPressed: boolean = false;
  isAutomatic: boolean = false;
  isRealTime: boolean = false;

  constructor(){}

  /**
   * Activate fullscreen map
   */
  fullScreenMode() {
    this.desactiveAllContents();
    if (!this.mapElement._elem || !this.mapElement._elem.nativeElement) {
      console.error("Fullscreen not available");
      return;
    }
    let nativeElement = this.mapElement._elem.nativeElement;
    if (nativeElement.requestFullscreen) {
      nativeElement.requestFullscreen();
    } else if (nativeElement.msRequestFullscreen) {
      nativeElement.msRequestFullscreen();
    } else if (nativeElement.mozRequestFullScreen) {
      nativeElement.mozRequestFullScreen();
    } else if (nativeElement.webkitRequestFullscreen) {
      nativeElement.webkitRequestFullscreen();
    } else {
      console.error("Fullscreen not available");
    }
  }

  /**
   * Activate the current tool option selected
   * @param index
   */
  activateContent(index: number) {
    if (index > this.isDisplayContent.length - 1)
      return;
    if (this.isDisplayContent[index])
      this.isDisplayContent[index] = !this.isDisplayContent[index];
    else {
      this.desactiveAllContents();
      this.isDisplayContent[index] = true;
    }
  }

  /**
   * Deactivate any activated tool option
   */
  desactiveAllContents() {
    this.isDisplayContent = this.isDisplayContent.map(v => false);
  }

  // ///////////////////////
  // UpdateOption process
  // ///////////////////////

  /**
   * Detects the kind of process is activated
   * from update tool option.
   * @param index
   */
  updateProcess(index: number) {
    if (this.isDisplayContent[index]) {
      this.isDisplayContent[index] = !this.isDisplayContent[index];
    } else {
      // Update process
      if (this.isAutomatic) {
        console.info("Currently is on automatic mode")
      } else {
        console.info('Updating data')
      }
    }
  }
  toggleAutomatic(isAutomatic) {
    this.isAutomatic = isAutomatic;
  }
  toggleRealTime(isRealTime) {
    this.isRealTime = isRealTime;
  }

  // -----------------------
  // Holding button system
  // -----------------------
  displayReloadMenuOnMouseDown(index: number) {
    this.timeoutHandler = setTimeout(() => {
      this.hasBeenLongPressed = true;
      this.activateContent(index);
    }, 1000);
  }
  displayReloadMenuOnMouseUp(index: number) {
    clearTimeout(this.timeoutHandler);
    this.timeoutHandler = null;
    if (this.hasBeenLongPressed) {
      this.hasBeenLongPressed = false;
    }
  }
}