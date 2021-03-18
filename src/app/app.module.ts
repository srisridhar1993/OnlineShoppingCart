import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatIconModule,
  MatGridListModule,
  MatMenuModule,
  MatTabsModule,
  MatSelectModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatBottomSheetModule,
} from '@angular/material';
import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import EmployeeService from './shared/api/employee.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import ProductService from './Shared/api/product.service';
import { ProductShopComponent } from './product-shop/product-shop.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AddressListComponent } from './address-list/address-list.component';
import { CustomerAddressComponent } from './customer-address/customer-address.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { languageLoader } from 'src/assets/translation/translation';
// import { EffectsModule } from '@ngrx/effects';


const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent
  },
  {
    path: 'employee-add',
    component: EmployeeEditComponent
  },
  {
    path: 'employee-edit/:id',
    component: EmployeeEditComponent
  },
  {
    path: 'product-add',
    component: ProductAddComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product-shop',
    component: ProductShopComponent
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'product-edit/:id',
    component: ProductAddComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: CustomerAddComponent
  },
  {
    path: 'register/:id',
    component: CustomerAddComponent
  },
  {
    path: 'cart-list',
    component: CartListComponent
  },
  {
    path: 'customer-list',
    component: CustomerListComponent
  },
  {
    path: 'order-list',
    component: OrderListComponent
  },
  {
    path: 'address-list',
    component: AddressListComponent
  },
  {
    path: 'customer-address',
    component: CustomerAddressComponent
  },
  {
    path: 'customer-address/:id',
    component: CustomerAddressComponent
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    LoginComponent,
    DashboardComponent,
    CustomerListComponent,
    CustomerAddComponent,
    ProductAddComponent,
    ProductListComponent,
    ProductShopComponent,
    ProductDetailComponent,
    CartListComponent,
    OrderListComponent,
    AddressListComponent,
    CustomerAddressComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: languageLoader,
          deps: [HttpClient],
      },
      isolate: false,
  }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    // EffectsModule
  ],
  providers: [EmployeeService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
