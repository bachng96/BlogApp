import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/core/settings.service';
import { AuthService } from 'src/app/core/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  settingForm: FormGroup;
  passwordForm: FormGroup;
  private userName: string = '';
  private localUser: any = {};

  needConfirm: boolean = false;
  changingPassword: boolean = false;
  isSamePW: boolean = true;
  isSuccess: boolean = false;
  isTaken: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    public auth: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.settingForm = new FormGroup({
      image: new FormControl(''),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
      bio: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.localUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.localUser);

    this.userName = this.localUser.username;

    this.settingsService.getSettings(this.userName).subscribe((res: any) => {
      this.spinner.hide();
      this.settingForm.setValue({
        email: this.localUser.email,
        bio: res.profile.bio,
        image: res.profile.image,
        username: res.profile.username,
      });
    });
  }
  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  updateSettings(): void {
    this.spinner.show();
    // console.log(this.settingForm);
    this.needConfirm = true;
    this.settingsService.updateSettings(this.settingForm.value).subscribe(
      (res: any) => {
        this.isSuccess = true;
        this.isTaken = false;
        this.spinner.hide();
        

        localStorage.setItem('user', JSON.stringify(res.user));
        // console.log('setting updated');
        setTimeout(() => {
          this.router.navigate([`/profile/${res.user.username}`]);
        }, 5000);
      },
      (err: any) => {
        this.isSuccess = false;
        this.spinner.hide();
        this.isTaken = true;
        // console.log('setting errors');
      }
    );
  }

  isValidPassword() {
    this.isSamePW =
      this.passwordForm.value.password === this.passwordForm.value.cfPassword
        ? true
        : false;
  }

  cfPasswordNoti() {
    this.needConfirm = true;
  }

  changePassword() {
    this.needConfirm = true;
    this.changingPassword = true;
    this.isSamePW = false;
  }

  backPersonal() {
    this.changingPassword = false;
  }
}
