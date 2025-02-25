import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletLayoutComponent } from './wallet-layout/wallet-layout.component';
import { WalletOverviewComponent } from './wallet-overview/wallet-overview.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIconsModule} from "@ng-icons/core";
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';
import { WalletCreateLayoutComponent } from './wallet-create-layout/wallet-create-layout.component';
import { WalletCardComponent } from './wallet-card/wallet-card.component';
import { AddToBlacklistComponent } from './add-to-blacklist/add-to-blacklist.component';
import { DeleteBlacklistSymbolComponent } from './delete-blacklist-symbol/delete-blacklist-symbol.component';


@NgModule({
    declarations: [
        WalletLayoutComponent,
        WalletOverviewComponent,
        ConnectWalletComponent,
        WalletCreateLayoutComponent,
        WalletCardComponent,
        AddToBlacklistComponent,
        DeleteBlacklistSymbolComponent
    ],
    exports: [
        WalletCardComponent
    ],
    imports: [
        CommonModule,
        WalletRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgIconsModule
    ]
})
export class WalletModule { }
