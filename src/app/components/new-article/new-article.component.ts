import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  newArticleForm: FormGroup;
  slug: string;
  savedDraft: boolean = false;
  isPublished: boolean = false;
  errorOccurs: boolean = false;
  draftArticle: any = {};

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.newArticleForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      body: new FormControl('', [Validators.required, Validators.minLength(1)]),
      tagList: new FormControl(''),
    });

    // ** Check if there is any draft saved in LS
    let localDraft = localStorage.getItem('draft');
    if (localDraft) {
      this.draftArticle = JSON.parse(localDraft);

      // ** Draft content loaded
      this.newArticleForm.setValue({
        title: this.draftArticle.title,
        description: this.draftArticle.description,
        body: this.draftArticle.body,
        tagList: this.draftArticle.tagList,
      });
    }
  }

  publishArticle(): void {
    this.articleService.publishArticle(this.newArticleForm.value).subscribe(
      (res: any) => {
        let tagList: string[] = [
          ...this.newArticleForm.value.tagList.split(', '),
        ];

        this.newArticleForm.patchValue({
          tagList: tagList,
        });

        this.savedDraft = false;
        this.errorOccurs = false;
        this.isPublished = true;
        setTimeout(() => {
          // ** If publishing successfully, delete draft from LS
          localStorage.removeItem('draft');
          this.router.navigateByUrl(
            // ! User this router if you want to navigate back to profile instead
            // `/profile/${this.authService.getUser().username}`
            `/articles/${res.article.slug}`
          );
        }, 2000);
      },
      (err: any) => {
        this.savedDraft = false;
        this.errorOccurs = true;
        this.isPublished = false;
      }
    );
  }

  saveDraftArticle() {
    this.savedDraft = true;
    this.errorOccurs = false;
    this.isPublished = false;
    localStorage.setItem('draft', JSON.stringify(this.newArticleForm.value));
  }
}
