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
  passboxByLotGet(line: any, lot: any): Observable<any> {
    return this.http.get(
      this.baseUrl + 'reports/passbox-oc2/' + line + '/' + lot
    );
  }
  passboxByAppGet(line: any): Observable<any> {
    return this.http.get(
      this.baseUrl + 'reports/passbox/' + line 
    );
  }
  groupPassboxGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/group/passbox-oc2');
  }

  //-----------------------------------------------------------TPS
  tpsGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/tps');
  }
  tpsOnSalesGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/tps/sales');
  }
  tpsOnSalesByDateGet(date: any): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/tps/sales/' + date);
  }
  tpsOnSalesGroupGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/tps/sales-group');
  }
  tpsByLotLineGet(line: any, lot: any): Observable<any> {
    return this.http.get(this.baseUrl + 'reports/tps/' + line + '/' + lot);
  }
  tpsApproved(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'reports/approved', body);
  }

  //----SALES
  salesGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'sales');
  }
  salesPost(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'sales', body);
  }
  salesIdGet(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/byid/' + id);
  }
  salesViewGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/view');
  }
  salesViewIdGet(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/view/' + id);
  }
  salesViewPriceGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/price-view');
  }
  salesBigFiveGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/big-five');
  }
  salesCategoryBetweenGet(from: any, to: any): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/category/' + from + '/' + to);
  }
  salesCategoryYearGet(year:any): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/category/' + year);
  }
  salesYearlyGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/yearly');
  }
  salesMonthlyGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'sales/monthly');
  }

  //-----VENDOR
  vendorGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'vendor');
  }

  //-----PRICE
  priceGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'price');
  }
}
