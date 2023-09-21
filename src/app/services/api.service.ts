import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
const baseApi = environment.baseApi;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = baseApi + 'api/';

  constructor(private http: HttpClient) {}
  //-----------------------------------------------------------PASSBOXX
  passboxOc2Get(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/passbox-oc2');
  }
  passboxOc1Get(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/passbox-oc1');
  }
  passboxByLotGet(line:any,lot: any): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/passbox-oc2/'+ line + '/' + lot);
  }
  groupPassboxGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/group/passbox-oc2');
  }

  //-----------------------------------------------------------TPS
  tpsGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/tps');
  }
  tpsByLotLineGet(line: any, lot: any): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/tps/' + line + '/' + lot);
  }
  tpsApproved(body:any): Observable<any> {
    return this.http.post(this.baseUrl + 'reports/approved', body);
  }

  //----SALES
  salesViewGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'sales');
  }
  salesViewIdGet(id:any): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/' + id);
  }
  
}
