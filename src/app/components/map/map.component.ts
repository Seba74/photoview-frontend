import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

declare let mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {

  @Input() coords: string | undefined= '';
  @ViewChild('map', {static: true}) map!: ElementRef;

  constructor() { }

  ngOnInit() {
    if(!this.coords) {
      return;
    }
    const latLng = this.coords.split(',');
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViZ3VldmFyYTc0IiwiYSI6ImNsZ3lmYnVtcDA4cjAzZ3A5YTd1YWFmcmcifQ.VWxImQDczg-A7j8U3GXP_Q';
    const map = new mapboxgl.Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [Number(latLng[1]), Number(latLng[0])],
      zoom: 16
    });

    const marker = new mapboxgl.Marker().setLngLat([Number(latLng[1]), Number(latLng[0])]).addTo(map);
  }

}
