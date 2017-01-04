import {Clouds} from '/clouds';
import {Main} from '/weather-forecast-sample/src/main';
import {Snow} from '/snow';
import {Sys} from '/sys';
import {Weather} from '/weather';
import {Wind} from '/wind';

export class List {
    constructor(
          public clouds: Clouds,
          public dt: number,
          public dt_txt: string,
          public main: Main,
          public snow: Snow,
          public sys: Sys,
          public weather: Weather[],
          public wind: Wind
    ){}

}