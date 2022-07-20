import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticleService } from 'src/app/core/article.service';
import { MultiArticle } from 'src/app/models/multi-article';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.scss'],
})
export class FavoriteArticlesComponent implements OnInit {
  @Input('selectedUser') selectedUser: string;
  favoritedArticles: any = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;
  loadDone: boolean = false;

  constructor(private articleService: ArticleService, private spinner: NgxSpinnerService) {}

  ngOnChanges(): void {
    this.spinner.show();
    this.getFavoriteArticles(this.selectedUser, 0, this.itemsPerPage);
  }
  ngOnInit(): void {}

  getFavoriteArticles(username: string, skip: number, top: number) {
    this.articleService
      .getFavoriteArticles(username, skip, top)
      .subscribe((res: MultiArticle) => {
        this.spinner.hide();
        this.favoritedArticles = res.articles;
        this.totalItems = res.articlesCount;
        this.loadDone = true;
      });
  }

  handlePageChange(page: number) {
    this.spinner.show();
    this.getFavoriteArticles(this.selectedUser, page, this.itemsPerPage);
  }
}
