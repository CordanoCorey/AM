import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Headers } from '@angular/http';

@Component({
  selector: 'am-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SmartComponent implements OnInit, OnDestroy {

  @ModelControl<Login>(new Login()) form: FormGroup;
  errorMessage$: Observable<string>;
  routeName = 'login';
  _showLoading = false;

  constructor(public store: Store<any>) {
    super(store);
    this.errorMessage$ = errorSelector(this.store, 'login').map(error => error.message || '').distinctUntilChanged();
  }

  get credentials(): string {
    const login = <Login>this.form.value;
    return `grant_type=${login.grant_type}&username=${login.username}&password=${login.password}`;
  }

  get errorOutlet(): ErrorOutlet {
    return {
      key: 'login'
    };
  }

  get loginHeaders(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  get showLoading(): boolean {
    return this._showLoading;
  }

  set showLoading(value: boolean) {
    this._showLoading = value;
  }

  get showPasswordRequired(): boolean {
    return this.form.controls['password'].value === '' && this.form.controls['password'].touched;
  }

  get showRecoveredPassword(): boolean {
    return false;
  }

  get showUsernameRequired(): boolean {
    return this.form.controls['username'].value === '' && this.form.controls['username'].touched;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.dispatch(ErrorActions.remove('login'));
  }

  login() {
    this.dispatch(
      HttpActions.httpPost(Object.assign(new HttpPostPayload<string>(),
        {
          path: 'token',
          model: this.credentials,
          headers: this.loginHeaders,
          onSuccess: UserActions.LOGIN_SUCCESS,
          onError: this.errorOutlet
        }))
    );
  }

  recoverPassword() {
    this.showLoading = true;
    const body = { emailAddress: this.form.controls['username'].value };
    this.dispatch(HttpActions.post('recoverpassword', body, UserActions.RECOVER_PASSWORD, this.errorOutlet));
  }

}
