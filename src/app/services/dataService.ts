import {Injectable} from "@angular/core";
import {Headers, Http,  RequestOptions} from "@angular/http";
import { Observable }        from 'rxjs/Observable';
import 'rxjs/Rx';


  @Injectable()
export class DataService {
  constructor(private http: Http) {
  }
  
      get(url:string):Observable<any> {

        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        let options = new RequestOptions({headers: headers});


        return this.http.get(url, options).map(this.extractData).catch(this.handleError);

    }
    
      post(url:string, payload:any):Observable<any> {


        let body = JSON.stringify(payload);

        let headers = new Headers({'Content-Type': 'application/json'});

        let options = new RequestOptions({headers: headers});


        return this.http.post(url, body, options)

            .map(res => res.json())       

            .catch(this.handleError);
			}
			
		 extractData(res) {

         return res.json();

    }

     private handleError(error:any)   {

        let errMsg = (error.message) ? error.message :

            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg); // log to console instead
         return Observable.throw(errMsg);


    }
    
}