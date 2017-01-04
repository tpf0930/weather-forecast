//our root app component
import {Component, NgModule} from '@angular/core';

import {DataService} from './services/dataService';
import {Subscription} from "rxjs";
import {City} from './models/city';
import {List} from './models/list';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  name: string;
  city: City;
  cityList: any;
  list: List[] = [];
  cityname: string;
  tempFormat = 'Celsius';
  defaultAPIKey = '8caa3a62ba1f3b52d931888f38d1bc75';

  subscriptions: Subscription[] = [];
  invalidCity = false;


  constructor(private dataService: DataService) {
    this.name = 'Felix Tian'
  }


  ngOnInit() {
    let defaultCity = 'toronto';
    // this.getCityList();
    this.get5daysWeather(defaultCity);
  }

  get5daysWeather(city: string) {
    let cityURL = 'http://api.openweathermap.org/data/2.5/forecast/city?q=' + city + '&APPID=' + this.defaultAPIKey;
    this.subscriptions[0] = this.dataService.get(cityURL)
        .subscribe(
            res => {
              this.invalidCity = false;
              this.list =[];
              this.city = res.city;
              var temp_min_day;
              var temp_max_day;
              res.list.forEach((list, index) => {
                if (index % 8 == 0)
                {
                  temp_min_day = list.main.temp_min;
                  temp_max_day = list.main.temp_max;

                }
                else {
                  if( list.main.temp_min< temp_min_day) temp_min_day = list.main.temp_min;
                  if( list.main.temp_max > temp_max_day) temp_max_day = list.main.temp_max;
                  if (index % 8 ==7){
                    list.temp_min_day_C = (temp_min_day-273.15).toFixed(1);
                    list.temp_max_day_C = (temp_max_day-273.15).toFixed(1);
                    list.temp_min_day_F = ((temp_min_day-273.15) * 9/5 + 32).toFixed(1);
                    list.temp_max_day_F = ((temp_max_day-273.15) * 9/5 + 32).toFixed(1);
                    this.list.push(list); //only get 1 forcast each day
                  }

                }

              });
              console.log(this.city);

            },
            err => {
              console.log("error:" + err);
              this.invalidCity = true
            }
        )

  }

  getCityList() {
    this.subscriptions[1] = this.dataService.get('scr/data/citylist.json').map((res) => res.json()).subscribe(res => {
          this.cityList = res
        },
        err => console.log("error:" + err)
    )

  }



  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
