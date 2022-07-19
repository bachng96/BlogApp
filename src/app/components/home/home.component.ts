import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ArticleService } from 'src/app/core/article.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mode = 'myGlobalMode';

  listTags: any[];
  selectedTag: string = '';

  constructor(
    private articleService: ArticleService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.articleService.getTag().subscribe((res) => {
      this.listTags = res.tags.filter((el) => {
        let str = JSON.stringify(el).replace(/\W/g, '');
        return !!str;
      });
    });
  }

  openSpinner(timeLoad) {
    setTimeout(() => {}, timeLoad);
  }

  myFeedMode() {
    this.mode = 'myFeedMode';
    // this.openSpinner(300);
  }

  myGlobalMode() {
    this.mode = 'myGlobalMode';
    // this.openSpinner(1000);
  }

  tagMode() {
    this.mode = 'tagMode';
    // this.openSpinner(900);
  }

  openTagFeed(tag: string): void {
    this.mode = 'tagMode';
    this.selectedTag = tag;
    // this.openSpinner(900);
  }

  getTagFromGlobalFeed(tagName: string) {
    console.log(tagName);
    this.openTagFeed(tagName);
  }
}