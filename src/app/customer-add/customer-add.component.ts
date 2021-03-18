import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import CustomerService from '../Shared/api/customer.service';
import M_Customer from '../Shared/models/Customer';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
  providers: [CustomerService]
})
export class CustomerAddComponent implements OnInit, OnDestroy {
  sub: Subscription;
  customer: M_Customer = new  M_Customer();
  // customer = {CustomerId: 0, CustomerName: '', MobileNo: '', EmailId: '', Password: '', ConfirmPassword: ''};
  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.customerService.getCustomer(id).subscribe((cust: any) => {
          if (cust) {
            this.customer = cust[0];
            this.customer.ConfirmPassword = cust[0].Password;
          } else {
            console.log(
              `Product with id '${id}' not found, returning to list`
            );
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/login']);
  }

  save(form: any) {
    this.sub = this.customerService.save(form).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }
}
