import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs';
import CustomerService from '../Shared/api/customer.service';
import M_Customer from '../Shared/models/Customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CustomerService]
})
export class LoginComponent implements OnInit, OnDestroy {
  sub: Subscription;
  customer: M_Customer = new M_Customer();
  username: string;
  password: string;
 
  constructor(private router: Router, private route: ActivatedRoute, private custService: CustomerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {});
  }

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['dashboard']);
    } else if (this.username !== null && this.password !== undefined) {
      this.customer.MobileNo = this.username;
      this.customer.Password = this.password;
      this.custService.checkCustomerLogin(this.customer).subscribe(
        result => {
          sessionStorage.setItem('LoginDetails', JSON.stringify(result));
          this.gotoList();
        },
        error => console.error(error)
      );
    } else {
      alert('Invalid credentials');
    }
  }
  gotoList() {
    this.router.navigate(['/dashboard']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
