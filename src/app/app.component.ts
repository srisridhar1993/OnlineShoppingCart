import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  title = 'OnlineShopping';
  details: any;
  sub: Subscription;
  WelcomeMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private translate: TranslateService) { 
    this.translate.setDefaultLang('en');
    this.translate.use('en');
   }

  ngOnInit() {
    console.log(this.translate.use('ADDRESS_LIST.TITLE'));
    this.sub = this.route.params.subscribe(params => {});
    if (sessionStorage.getItem('LoginDetails') !== null && sessionStorage.getItem('LoginDetails') !== undefined) {
        this.details = JSON.parse(sessionStorage.getItem('LoginDetails'));
        this.WelcomeMessage = 'Welcome ' + this.details.CustomerName;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  logout() {
    sessionStorage.removeItem('LoginDetails');
    this.router.navigate(['/login']);
  }
}
