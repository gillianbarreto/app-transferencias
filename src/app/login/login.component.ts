import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environment';
import { LoginRequest } from '@models';
import { KEYS, LoginService, SessionService } from '@services';
import { UnsubscribeOnDestroy, validFormat } from '@shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends UnsubscribeOnDestroy implements OnInit {

  public formLogin: FormGroup;
  public disabledButton = false;
  public bankName = environment.BANK_NAME;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private loginService: LoginService,
    private router: Router,
  ) {
    super();
    this.configForm();
  }

  ngOnInit(): void {
    this.sessionService.initStorage();
  }

  private configForm() {
    this.formLogin = this.formBuilder.group({
      "rut": ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(validFormat.RUT)]],
      "password": ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  public login() {
    if (this.disabledButton || !this.formLogin.valid) return;

    this.disabledButton = true;

    const body: LoginRequest = { ...this.formLogin.value };

    this.loginService.login(body).subscribe(response => {
      if (response.getCode() == 200) {
        this.formLogin.reset();
        this.disabledButton = false;
        const data = response.getPayload();
        this.sessionService.setData(KEYS.user, data.user_id );
        this.sessionService.setData(KEYS.token, data.token );
        this.router.navigate(['/contacts']);
      } else {
        this.showMessageError();
      }
    }, (error) => {
      this.showMessageError();
    });

  }

  showMessageError() {
    this.disabledButton = false;
    this.formLogin.reset();
  }

}
