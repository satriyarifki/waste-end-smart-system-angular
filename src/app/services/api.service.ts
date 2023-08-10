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
  passboxOc2ByLotGet(lot: any): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/passbox-oc2/' + lot);
  }
  groupPassboxOc2Get(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/group/passbox-oc2');
  }

  //-----------------------------------------------------------TPS
  tpsGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/tps');
  }
  tpsByLotLineGet(line: any, lot: any): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/tps/' + line + '/' + lot);
  }
}
