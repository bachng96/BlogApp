import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showDropdown: boolean = false;
  userName: string = '';

  constructor(public authService: AuthService,private spinner: NgxSpinnerService, private router: Router) {}

  ngOnInit(): void {}

  openSpinner(timeLoad) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, timeLoad);
  }

  goToNewArticle(): void {
    this.router.navigateByUrl('/new-article');
  }

  goToMyArticles(): void {
    if (this.authService.isAuthenticated()) {
      let localUser = JSON.parse(localStorage.getItem('user'));
      this.userName = localUser.username;
    }
    this.router.navigateByUrl(`/profile/${this.userName}`);
  }
  goToSettings(): void {
    this.router.navigateByUrl('/setting');
  }
  logout(): void {
    this.authService.logout();
    // this.router.navigate(['..']);
  }

  logIn(): void {
    this.router.navigateByUrl('/login');
  }

  signUp(): void {
    this.router.navigateByUrl('/signup');
  }
}
