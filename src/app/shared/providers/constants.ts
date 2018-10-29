/**
 * Created by Tech Group BWL on 08/05/2018.
 */

export class Constants {
  // DOMAIN: string = "http://motum.mocklab.io/admin";
  //DOMAIN: string = "http://192.168.0.150:3000/api/v1";
  DOMAIN: string = "https://eco-seeker-213615.appspot.com";
  ENDPOINT_USER: string = "users";//todo: remove this line
  EVENTS_SERVICE: any = {
    SIDEBAR_MENU_ITEM_TOGGLE: 'sidebar:menu:item:toggle',
    BREADCRUMB_SET_MANUAL_BREAD: 'breadcrumb:set:manual-bread',
    MONITORING_REACTION_MENU_CHANGE_CLASS: 'monitoringReaction:menu:changeClass',
    MONITORING_REACTION_CHAT_DETAIL: 'monitoringReaction:chat:detail'
  };
  MAP_STYLES = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#16d7ff"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ];
  USER_DATA_KEY = 'user_data_key';
}
