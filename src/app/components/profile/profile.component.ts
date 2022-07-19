import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { ArticleService } from 'src/app/core/article.service';
import { AuthService } from 'src/app/core/auth.service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  onSelected: boolean = this.authService.isAuthenticated() ? true : false;
  selectedUser: string = '';
  currProfile: Profile;
  currUsername: string = '';
  totalItems: number = 0;
  itemsPerPage: number = 6;
  userName: string = '';

  follow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      let localUser = JSON.parse(localStorage.getItem('user'));
      this.userName = localUser.username;
      // console.log(this.userName);
    }

    this.route.params
      .pipe(
        switchMap((res) => {
          this.selectedUser = res.id;
          return this.authService.getProfile(this.selectedUser);
        })
      )
      .subscribe((res: any) => {
        // console.log(res);

        this.currProfile = res;
        this.follow = res.profile.following;
        this.currUsername = res.profile.username;
        this.currProfile.profile.image = this.currProfile.profile.image
          ? this.currProfile.profile.image
          : 'https://static.productionready.io/images/smiley-cyrus.jpg';
      });
  }

  // openSpinner(timeLoad) {
  //   this.spinner.show();
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, timeLoad);
  // }

  switchTab(): void {
    this.onSelected = !this.onSelected;
  }

  logout(): void {
    this.authService.logout();
  }

  followed(userName) {
    this.follow = true;
    // this.articleDetail.article.author.following = true;
    this.articleService.followUser(userName).subscribe((res) => {});
  }

  unFollowed(userName) {
    this.follow = false;
    // this.articleDetail.article.author.following = false;
    this.articleService.unFollowUser(userName).subscribe((res) => {});
  }
}
