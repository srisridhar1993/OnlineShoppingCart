import { Component, OnInit, OnDestroy } from '@angular/core';
import BillingAddress from '../Shared/models/BillingAddress';
import CustomerService from '../Shared/api/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import SearchAddress from '../Shared/models/SearchAddress';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.css'],
  providers: [CustomerService]
})
export class CustomerAddressComponent implements OnInit, OnDestroy {
  address: BillingAddress = new BillingAddress();
  search: SearchAddress = new SearchAddress();
  country: any; 
  state: any;
  selected:'';
  sub: Subscription;
  logindetails: any;
  addessType:any=[{TypeId:'1',Name:'Billing Address'},{TypeId:'2',Name:'Shipping Address'}]
  constructor(private custService:CustomerService
    , private route: ActivatedRoute
    , private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (sessionStorage.getItem('LoginDetails') !== null && sessionStorage.getItem('LoginDetails') !== undefined) {
        this.logindetails = JSON.parse(sessionStorage.getItem('LoginDetails'));
        this.custService.getCountryList(null).subscribe(result=>{
          this.country = result;
        });
        this.bindState(this.address.CountryId+'');

        if (id) {
          this.search.CustomerId = this.logindetails.CustomerId;
          this.search.AddressId = id;
          this.custService.GetAllAddress(this.search).subscribe((cust: any) => {
            if (cust) {
              this.address = cust[0];
              this.bindState(this.address.CountryId+'');
            } else {
              console.log(
                `Product with id '${id}' not found, returning to list`
              );
            }
          });
        }

      }else {
        this.router.navigate(['/login']);
      }
    });
  }
 
  saveAddress(form:any){
    this.address.CustomerId= this.logindetails.CustomerId;
    this.custService.AddNewAddress(this.address).subscribe(result=>{
      this.router.navigate(['/address-list']);
    });
  }

  bindState(selectedValue:string){
    this.custService.getStateList(selectedValue['value'] ,null).subscribe(result=>{
      this.state = result;
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
