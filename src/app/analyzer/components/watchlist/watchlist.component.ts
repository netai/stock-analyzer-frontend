import { Component, OnInit } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServerService, StockService, WatchlistService } from '../../services'
import { StockModel, WatchlistStockModel, WatchlistModel } from '../../../models';
import { BuySellComponent } from '../../../shared/modal';

@Component({
  selector: 'analyzer-watchlist',
  templateUrl: 'watchlist.component.html',
  styleUrls: ['watchlist.component.less']
})

export class WatchlistComponent implements OnInit {

  isBs3 = isBs3();
  searchInstrument: string;
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
    private _mmodser: BsModalService
  ) {
    this.searchDataSource = Observable.create((observer: any) => {
      observer.next(this.searchInstrument);
    }).pipe(mergeMap((token: string) => this._getInstrumentAsObservable(token)));

    this.loading = false;
  }

  ngOnInit() {
    this._ss.getWatchlistStock()
      .subscribe(
        watchlist => {
          this._ws.setWatchlist(watchlist.data.watchlist);
          this.watchlist = this._ws.getWatchlist();
          this.loadWatchlist(1);
        },
        error => {
          this._errorHandler(error);
        }
      );

    this._ss.getStockList()
      .subscribe(
        stockList => {
          this._stokServ.setStockList(stockList.data.stocks);
          this.stocks = this._stokServ.getStockList();
          this.stockLoading = false;
        },
        error => {
          this._errorHandler(error);
        }
      );
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

  private _errorHandler(error: any): void {
    console.log(error);
    this.stockLoading = false;
    this.watchlistLoading = false;
    this.loading = false;
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
          this._ws.setSingleWatchlist(watchlist.data.watchlist);
          this.watchlist = this._ws.getWatchlist();
          this.loadWatchlist(this.activeWatchlist);
          this.watchlistLoading = false;
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
          this._ws.setSingleWatchlist(watchlist.data.watchlist);
          this.watchlist = this._ws.getWatchlist();
          this.loadWatchlist(this.activeWatchlist);
          this.watchlistLoading = false;
        },
        error => {
          this._errorHandler(error);
        }
      );
  }

  public loadWatchlist(watchlist_no: number): void {
    this.activeWatchlistStocks = [];
    this.activeWatchlist = watchlist_no;
    for(let i=0;i<this.watchlist.length;i++) {
      if (this.watchlist[i].watchlist_no === watchlist_no) {
        this.activeWatchlistStocks = this.watchlist[i].stocks;
      }
    }
    this.watchlistLoading = false;
  }

  public buySell(stock: WatchlistStockModel, isBuyOrSell: string): void {
    const modalConfig = {
      animated: true,
      backdrop: false,
      ignoreBackdropClick: true,
      class: 'buy-sell-modal',
      initialState: {
        stock: stock,
        isBuyOrSell: isBuyOrSell
      }
    };
    this.bsModalRef = this._mmodser.show(BuySellComponent, modalConfig);
  }

}
