import { Injectable } from '@angular/core';
import { WatchlistModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private _watchlist: WatchlistModel[] = [];

  constructor() { }

  public setWatchlist(watchlist: WatchlistModel[]): void {
    this._watchlist = watchlist;
  }

  public getWatchlist(): WatchlistModel[] {
    return this._watchlist
  }

  public setSingleWatchlist(watchlist: WatchlistModel): void {
    let isFind = false;
    for(let i=0;i<this._watchlist.length;i++){
      if(this._watchlist[i].watchlist_no === watchlist.watchlist_no) {
        this._watchlist[i] = watchlist;
        break;
      }
    }
    if(!isFind) {
      this._watchlist.push(watchlist);
    }
  }

}