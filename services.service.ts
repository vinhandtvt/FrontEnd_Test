import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }


  handleError( err: any): any {
    switch(err.status) {
      case 500:
        alert(err);
        break;
      default:
        break;
    }
    return throwError(err)
  }

 
  getPhotos(API_KEY: String, count: number, offset: number): Observable<any> {
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${count}&offset=${offset}`).pipe(
      tap( data => {
        // console.log(data);
        
      }),
      catchError( err => {
        return this.handleError(err)
      })
    )
  }

}
