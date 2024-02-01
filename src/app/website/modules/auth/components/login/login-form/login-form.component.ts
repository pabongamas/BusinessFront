import { Component } from '@angular/core';
import {
  FormBuilder, Validators, FormControl, FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });

  doLogin() {
    if (this.form.valid) {
      // this.status = 'loading';
      // const { email, password } = this.form.getRawValue();
      // this.authService.login(email, password)
      // .subscribe({
      //   next: () => {
      //     this.status = 'success';
      //     this.router.navigate(['/app']);
      //   },
      //   error: () => {
      //     this.status = 'failed';
      //   }
      // });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
