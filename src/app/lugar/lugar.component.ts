import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { icon, Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-lugar',
  standalone: true,
  imports: [NavComponent, FooterComponent],
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.css'
})
export class LugarComponent {

  ngAfterViewInit(): void{
    
    const map = new Map('map').setView([51.5, -0.09], 3);

    tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
      maxZoom: 18,
      /* attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' */
    }).addTo(map);

    const iconoFinde = icon({
      iconUrl: '/RECURSOS/LOGOS/Icono_C.png',

      iconSize:     [65, 65],
      /* iconAnchor:   [60, 60],  */
      popupAnchor:  [0, -25]
    });

    const markerFinde = marker([21.119406147647762, -101.67342691534424],{icon: iconoFinde}).addTo(map).bindPopup("<b>Bienvenid@ a:<b/>").openPopup();

    map.fitBounds([
      [markerFinde.getLatLng().lat, markerFinde.getLatLng().lng ]
    ])
  }

}

