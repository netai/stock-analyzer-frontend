import { Component, OnInit } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServerService, StockService, WatchlistService } from '../../services'
import { StockModel, WatchlistStockModel, WatchlistModel } from '../../../models';
import { BuySellComponent } from '../../modal';
import { ErrorService, MessageService } from '../../../shared/services';

@Component({
  selector: 'analyzer-watchlist',
  templateUrl: 'watchlist.component.html',
  styleUrls: ['watchlist.component.less']
})

export class WatchlistComponent implements OnInit {

  isBs3 = isBs3();
  searchInstrument: string = '';
  stocks: StockModel[] = [];
  watchlist: WatchlistModel[] = [];
  loading: boolean = true;
  stockLoading: boolean = true;
  watchlistLoading: boolean = true;
  activeWatchlist: number = 1;
  activeWatchlistStocks: WatchlistStockModel[] = [];
  searchDataSource: Observable<any>;
  bsModalRef: BsModalRef;

  constructor(
    private _ss: ServerService,
    private _stokServ: StockService,
    private _ws: WatchlistService,
    private _mmodser: BsModalService,
    private _es: ErrorService,
    private _ms: MessageService,
  ) {
    this.searchDataSource = Observable.create((observer: any) => {
      observer.next(this.searchInstrument);
    }).pipe(mergeMap((token: string) => this._getInstrumentAsObservable(token)));

    this.loading = false;
  }

  ngOnInit() {
    this._loadServerWatchlist();
    this._loadStockList();
  }

  private _getInstrumentAsObservable(token: string): Observable<any> {
    const startRegex = new RegExp('^' + token, 'i');
    const containRegex = new RegExp(token, 'i');
    return of(
      this.stocks.filter((stock: StockModel) => {
        return startRegex.test(stock.symbol) || containRegex.test(stock.company_name);
      })
    );
  }

  private _loadStockList(): void {
    this._ss.getStockList()
      .subscribe(
        stockList => {
          if (stockList.status === 'success') {
            this._stokServ.setStockList(stockList.data.stocks);
            this.stocks = this._stokServ.getStockList();
          } else {
            this._ms.addMessage({ message: stockList.message, title: 'Error', type: 'error' });
            this._ms.showMessage();
          }
          this.stockLoading = false;
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  private _loadServerWatchlist(): void {
    this.watchlistLoading = true;
    this._ss.getWatchlistStock()
      .subscribe(
        watchlist => {
          if (watchlist.status === 'success') {
            this._ws.setWatchlist(watchlist.data.watchlist);
            this.watchlist = this._ws.getWatchlist();
            this.loadWatchlist(this.activeWatchlist);
          } else {
            this._ms.addMessage({ message: watchlist.message, title: 'Error', type: 'error' });
            this._ms.showMessage();
            this.watchlistLoading = false;
          }
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  public onSearchSelect(event: TypeaheadMatch): void {
    this.searchInstrument = '';
    this.watchlistLoading = true;
    let data = {
      watchlist_no: this.activeWatchlist,
      stock_id: event.item.id
    }
    this._ss.saveWatchlistStock(data)
      .subscribe(
        watchlist => {
          this.watchlistLoading = false;
          if (watchlist.status === 'success') {
            this._loadServerWatchlist();
            this._ms.addMessage({ message: watchlist.message, title: 'Success', type: 'success' });
          } else {
            this._ms.addMessage({ message: watchlist.message, title: 'Error', type: 'error' });
          }
          this._ms.showMessage();
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  public deleteStock(stockId: number): void {
    this.searchInstrument = '';
    this.watchlistLoading = true;
    let data = {
      watchlist_no: this.activeWatchlist,
      stock_id: stockId
    }
    this._ss.deleteWatchlistStock(data)
      .subscribe(
        watchlist => {
          this.watchlistLoading = false;
          if (watchlist.status === 'success') {
            this._loadServerWatchlist();
            this._ms.addMessage({ message: watchlist.message, title: 'Success', type: 'success' });
          } else {
            this._ms.addMessage({ message: watchlist.message, title: 'Error', type: 'error' });
          }
          this._ms.showMessage();
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  public loadWatchlist(watchlist_no: number): void {
    this.activeWatchlistStocks = [];
    this.activeWatchlist = watchlist_no;
    for (let i = 0; i < this.watchlist.length; i++) {
      if (this.watchlist[i].watchlist_no === watchlist_no) {
        this.activeWatchlistStocks = this.watchlist[i].stocks;
      }
    }
    this.watchlistLoading = false;
  }

  public buySell(stock: WatchlistStockModel, is_sell: boolean): void {
    const modalConfig = {
      animated: true,
      backdrop: false,
      ignoreBackdropClick: true,
      class: 'buy-sell-modal',
      initialState: {
        stock: stock,
        is_sell: is_sell
      }
    };
    this.bsModalRef = this._mmodser.show(BuySellComponent, modalConfig);
  }

  private _errorHandler(error: any): void {
    this._es.errorHandler(error);
    this.stockLoading = false;
    this.watchlistLoading = false;
    this.loading = false;
  }

}
