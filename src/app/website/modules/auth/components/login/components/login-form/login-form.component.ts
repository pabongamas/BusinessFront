import { Component } from '@angular/core';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPen,
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faUserShield,
  faUserLarge,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonComponent } from 'src/app/website/components/button/button.component';
import { RequestStatus } from 'src/app/website/models/request-status.model';

import { AuthService } from 'src/app/website/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule,ButtonComponent],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  faPen=faPen;
  faEyeSlash=faEyeSlash;
  faEye=faEye;
  showPassword = false;
  status: RequestStatus = 'init';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {}
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.status = 'success';
          this.router.navigate(['/app']);
        },
        error: () => {
          this.status = 'failed';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
