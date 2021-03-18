import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import M_Customer from '../models/Customer';
import { Observable } from 'rxjs';
import SearchAddress from '../models/SearchAddress';
import BillingAddress from '../models/BillingAddress';

@Injectable()
export default class CustomerService {
    public API = 'http://localhost:64861/api/Customer';
    // public API = 'http://10.22.28.5:1993/api';
    public CUSTOMER_API = `${this.API}/GetCustomer/?customerId=`;
    public COUNTRY_API = `${this.API}/GetCountry/?countryId=`;
    public STATE_API = `${this.API}/GetState/?countryId=`;
    public CUSTOMER_ADDRESSAPI = `${this.API}/AddNewAddress`;
    public GET_ADDRESSAPI = `${this.API}/GetAllAddress`;
    public CUSTOMER_SAVEAPI = `${this.API}/SaveCustomer`;
    public CUSTOMER_LOGINAPI = `${this.API}/CheckCustomerLogin`;

    constructor(private http: HttpClient) {}

    save(customer: M_Customer): Observable<M_Customer> {
        let result: Observable<M_Customer>;
        if (customer.CustomerId) {
            result = this.http.post<M_Customer>(`${this.CUSTOMER_SAVEAPI}`, customer);
        } else {
            result = this.http.post<M_Customer>(this.CUSTOMER_SAVEAPI, customer);
        }
        return result;
    }
    checkCustomerLogin(customer: M_Customer) {
        let result: Observable<M_Customer>;
        if (customer) {
            result = this.http.post<M_Customer>(`${this.CUSTOMER_LOGINAPI}`, customer);
        }
        return result;
    }
    AddNewAddress(address:any){
        let result: Observable<any>;
        if (address.AddressId) {
            result = this.http.post<any>(`${this.CUSTOMER_ADDRESSAPI}`, address);
        } else {
            result = this.http.post<any>(this.CUSTOMER_ADDRESSAPI, address);
        }
        return result;
    }
    GetAllAddress(search: SearchAddress) {
        let result: Observable<BillingAddress>;
        if (search) {
            result = this.http.post<BillingAddress>(`${this.GET_ADDRESSAPI}`, search);
        }
        return result;
    }
    getCustomer(id: string) {
        return this.http.get(`${this.CUSTOMER_API}${id}`);
    }
    getCountryList(id: string) {
        return this.http.get(`${this.COUNTRY_API}${id}`);
    }
    getStateList(countryId: string, stateId: string) {
        return this.http.get(`${this.STATE_API}${countryId}&stateId={stateId}`);
    }
}
