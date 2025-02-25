import {WalletModel} from "../wallet/models/wallet.model";
import {State} from "@antonlabs/rack";
import {OcoOrderModel} from "../wallet/models/order.model";
import {getOrders, getTransactions, PaginationToken} from "../shared/helpers";
import {TransactionModel} from "../core/clients/models/transaction.model";

export interface WalletProperties extends WalletModel {
  transactions: {[key: string]: TransactionModel}
}

export class WalletState extends State<WalletProperties> {

  onCreate(): WalletProperties {
    return {
      name: '',
      symbolMarket: undefined,
      alias: undefined,
      earnings: undefined,
      totalEarnings: undefined,
      type: undefined,
      accessKey: undefined,
      secretKey: undefined,
      maxOrderValue: 50,
      budget: 0,
      balances: [],
      blacklist: [],
      transactions: {}
    };
  }

  async refreshState(): Promise<void> {}

  async refreshTransactions(mode?: 'OPEN' | 'CLOSE', paginationToken?: PaginationToken): Promise<{data: TransactionModel[], lastKey: PaginationToken | undefined}> {
    const response = await getTransactions(mode, paginationToken);
    const transactions = response.data;
    const result: {[key: string] : TransactionModel} = this.val.transactions;
    for(const transaction of transactions) {
      result[transaction.id] = transaction;
    }
    this.set({
      transactions: result
    });
    return response;
  }

  async getTransactionOrders(transactionId: string): Promise<OcoOrderModel[]> {
    const transactions = this.val.transactions;
    const transaction = transactions[transactionId];
    if(transaction) {
      return (await getOrders(transactionId)).sort((a, b) => b.orders.slice(-1)[0].transactTime - a.orders.slice(-1)[0].transactTime);
    }
    return [];
  }



}
