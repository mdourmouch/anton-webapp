import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WalletLayoutComponent} from "./wallet-layout/wallet-layout.component";
import {WalletOverviewComponent} from "./wallet-overview/wallet-overview.component";
import {WalletCreateLayoutComponent} from "./wallet-create-layout/wallet-create-layout.component";
import { ProfileLayoutComponent } from '../profile/profile-layout/profile-layout.component';

const routes: Routes = [
  {
    path: 'create-wallet',
    component: WalletCreateLayoutComponent,
    data: {
      stepper: [
        /*{
          id: 'create-wallet-name',
          label: $localize`Choose name`,
          state: 'in-progress'
        },*/
        {
          id: 'wallet-platform',
          label: $localize`Choose platform`,
          state: undefined
        },
        {
          id: 'create-wallet-keys',
          label: $localize`Attach exchange keys`,
          state: undefined
        },
        {
          id: 'wallet-configuration',
          label: $localize`Configure & launch`,
          state: undefined
        }
      ]
    },
    loadChildren: () => import('./first-wallet-creation/first-wallet-creation.module').then(
      m => m.FirstWalletCreationModule
    )
  },
  {
    path: '',
    component: WalletLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        component: WalletOverviewComponent
      },
      {
        path: 'profile',
        component: ProfileLayoutComponent,
        loadChildren: () => import('../profile/profile.module').then(
          m => m.ProfileModule
        )
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
