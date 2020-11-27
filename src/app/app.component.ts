import { Component } from '@angular/core';
import *  as  data  from   'data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  _latitude = "";
  _longitude = "";

   map: any;

  // lat: number;
  // lng: number;

  stateList: {state:string, districts:string[]}[] = data.states;

  cities: Array<any>;
  
  onChangeState(count) {
    // console.log(this.stateList);
    // this.cities = this.stateList.find(con => con.state == count).districts;
    this.cities=this.stateList[count].districts;
    console.log(this.cities);
  }

  ngOnInit(){
    // console.log(data.states);
    this.myMap(26.8467, 80.9462);
  }

  myMap(lat,lng) {
    console.log(lat,lng);
    var mapCanvas = document.getElementById("map");
    var mapOptions = {  
      center: new google.maps.LatLng(lat, lng), 
      zoom: 10 
    };
    this.map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
    });
    marker.setMap(this.map);
  }

  selectCity(count){
    var geocoder =  new google.maps.Geocoder();
    // this.myMap(30.9661, 76.5231);

    let me = this;
    geocoder.geocode( { 'address': this.cities[count] }, function(results, status) {
      console.log("Result:", results[0].formatted_address);
      if (status == google.maps.GeocoderStatus.OK) {
        // alert("location : " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng()); 
        // console.log(results[0].geometry.location.lat());
          this._latitude = results[0].geometry.location.lat();
          this._longitude = results[0].geometry.location.lng();
          console.log(this._latitude , this._longitude);
          me.myMap(this._latitude, this._longitude);
          
      } else {
        alert("Something got wrong " + status);
      }
    }); 
    // this.myMap(this.cities[count], this.cities[count]);
    // this.myMap(30.9661, 76.5231);
  }

   
  
  // lat = this._latitude;
  // lng = this._longitude;
  
}
