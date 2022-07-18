import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'currency-converter-angular';
  amountFrom: number = + 0
  amountTo?: number = + 0
  currencyFrom?: string
  currencyTo?: string
  currencyList: any
  result: any

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.http.get("https://cdn.cur.su/api/latest.json")
      .subscribe((response) => {
        this.result = response
        this.currencyList = Object.keys(this.result.rates)
      })
  }

  onChangeInputFrom(e: any): void {
    this.amountFrom = e.target.value
    console.log('amountFrom :>> ', this.amountFrom);
  }

  onChangeInputTo(e: any) {
    this.amountTo = e.target.value
    console.log('amountTo :>> ', this.amountTo);
  }

  onChangeSelectFrom(e: any): void {
    this.currencyFrom = e.target.value
    console.log('currencyFrom :>> ', this.currencyFrom);

  }

  onChangeSelectTo(e: any): void {
    this.currencyTo = e.target.value
    console.log('currencyTo :>> ', this.currencyTo);

  }

  count(amountFrom: number = this.amountFrom) {}

  getCurrentCurrency(currencyList = this.currencyList) {

  }
}
