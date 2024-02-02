import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseApi = environment.baseApi;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_DATA_KEY = 'auth-user-data';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  datas: any;
  private authUrl = baseApi + 'auth/';
  constructor(private http: HttpClient, private router: Router) {}
  login(nik: string, password: string): Observable<any> {
    return this.http.post(
      this.authUrl + 'login',
      {
        nik,
        password,
      },
      httpOptions
    );
  }

  signOut(): void {
    window.sessionStorage.clear();
    localStorage.clear();
    document.cookie = ''
    // window.location.reload();
    this.router.navigate(['/']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    document.cookie = 'TOKEN_KEY=' + token + ';expires=' + new Date() + ';';
    // console.log(document.cookie);
    
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.employeesGetById(this.getUser().lg_nik).subscribe((data) => {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(data[0]));
    });
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (this.getToken() == null) {
      localStorage.clear()
    }
    if (user) {
      return JSON.parse(user)[0];
    }

    return {};
  }
  public getUserData(): any {
    const user = localStorage.getItem(USER_DATA_KEY);

    if (user) {
      return JSON.parse(user);
    }
  }

  //-------------------------------------------------------------EMPLOYEES
  employeesGet(): Observable<any> {
    return this.http.get(this.authUrl + 'employees');
  }
  employeesKejayanGet(): Observable<any> {
    return this.http.get(this.authUrl + 'employees/kejayan');
  }
  employeesGetById(nik: any): Observable<any> {
    return this.http.get(this.authUrl + 'employee/' + nik);
  }
}
