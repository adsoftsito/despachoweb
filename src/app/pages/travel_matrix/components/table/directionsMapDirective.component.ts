import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
declare var google: any;

@Directive({
  selector: 'agm-map-ruote',
})
export class DirectionsMapDirective implements OnInit, OnDestroy {
  @Input() origin;
  @Input() destination;
  @Input() waypoints;
  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.gmapsApi.getNativeMap().then(map => {
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(map);
      // directionsDisplay.setOptions({
      //     polylineOptions: {
      //                 strokeWeight: 6,
      //                 strokeOpacity: 0.7
      //                 // strokeColor:  '#00468c'
      //             }
      // });

      directionsService.route({
        origin: { lat: this.origin.lat, lng: this.origin.long },
        destination: { lat: this.destination.lat, lng: this.destination.long },
        waypoints: this.waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING',
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }
  ngOnDestroy() {
    this.origin = undefined;
    this.destination = undefined;
    this.waypoints = undefined;
    this.gmapsApi = undefined;
}
}
