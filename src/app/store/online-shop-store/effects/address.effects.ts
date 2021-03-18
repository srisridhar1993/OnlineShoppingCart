// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { of } from "rxjs";
// import { catchError, map, switchMap } from "rxjs/operators";
// import CustomerService from "src/app/Shared/api/customer.service";
// import SearchAddress from "src/app/Shared/models/SearchAddress";
// import * as AddressActions from '../actions/address.actions'

// export class AddressEffects {
//     constructor(private actions$: Actions, private customerService: CustomerService) {}
//     addNewAddres$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(AddressActions.addNewAddress),
//             switchMap(() => {
//                 return this.customerService
//                     .AddNewAddress()
//                     .pipe(
//                         map((data) =>
//                             AddressActions.addNewAddressSuccess()
//                         ),
//                         catchError((error) => of(AddressActions.addNewAddressFail()))
//                     );
//             })
//         )
//     );
//     getAllAddress$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(AddressActions.getAllAddress),
//             switchMap((prop) => {
//                 return this.customerService
//                     .GetAllAddress(search)
//                     .pipe(
//                         map((data) =>
//                             AddressActions.getAllAddressSuccess()
//                         ),
//                         catchError((error) => of(AddressActions.getAllAddressFail()))
//                     );
//             })
//         )
//     );
// }