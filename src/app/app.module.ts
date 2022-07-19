import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleCardComponent } from './layout/article-card/article-card.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ChangeLogComponent } from './components/change-log/change-log.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { FavoriteArticlesComponent } from './components/profile/favorite-articles/favorite-articles.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GlobalFeedComponent } from './components/home/global-feed/global-feed.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MyFeedComponent } from './components/home/my-feed/my-feed.component';
import { TagFeedComponent } from './components/home/tag-feed/tag-feed.component';
import { LoginComponent } from './components/login/login.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MyArticlesComponent } from './components/profile/my-articles/my-articles.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthInterceptor } from './core/auth.interceptor';
import { SpinnerComponent } from './layout/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SettingComponent,
    ProfileComponent,
    SignUpComponent,
    LoginComponent,
    FooterComponent,
    NewArticleComponent,
    NotFoundComponent,
    ArticleDetailComponent,
    MyFeedComponent,
    GlobalFeedComponent,
    ArticleCardComponent,
    TagFeedComponent,
    MyArticlesComponent,
    FavoriteArticlesComponent,
    EditArticleComponent,
    ChangeLogComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
