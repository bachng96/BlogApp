import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArticleService } from 'src/app/core/article.service';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
})
export class GlobalFeedComponent implements OnInit {
  @Output('tagFromFeed') selectedTag = new EventEmitter();
  globalFeeds: any = [];
  filteredFeeds: any = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;
  loadDone: boolean = false;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getGlobalFeed(0, this.itemsPerPage);
  }

  getGlobalFeed(skip: number, top: number) {
    this.articleService.getGlobalFeed(skip, top).subscribe(
      (res) => {
        this.filteredFeeds = this.globalFeeds = res.articles;
        this.totalItems = res.articlesCount;
        this.loadDone = true;
      },
      (err) => {}
    );
  }

  handlePageChange(page: number) {
    this.getGlobalFeed(page, this.itemsPerPage);
  }

  getTagFromCard(tagName: string) {
    this.selectedTag.emit(tagName);
  }

  onKeyUp(value: string) {
    value = value.trim().toLowerCase();
    this.filteredFeeds = this.globalFeeds.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
  }
}
