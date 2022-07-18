import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICurrency {
  [key: string]: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'currency-converter-angular';
  amountFrom: number = 0;
  amountTo: number = 0;
  currencyFrom: string = 'UAH';
  currencyTo: string = 'USD';
  currencyList: ICurrency = {};
  result: any;

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://cdn.cur.su/api/latest.json')
      .subscribe((response) => {
        this.result = response;
        this.currencyList = this.result.rates;
      });
  }

  onChangeValue(e: InputEvent | Event) {
    console.log('e', e);

    switch ((e.target as HTMLInputElement).name) {
      case 'amountFrom':
      case 'currencyFrom':
        this.amountTo = this.exchange(
          this.amountFrom,
          this.currencyFrom,
          this.currencyTo
        );
        break;

      case 'amountTo':
      case 'currencyTo':
        this.amountFrom = this.exchange(
          this.amountTo,
          this.currencyTo,
          this.currencyFrom
        );

        break;

      default:
        break;
    }
  }

  exchange(qtt: number, fromCurrency: string, toCurrency: string) {
    return (
      (qtt * this.currencyList[toCurrency]) / this.currencyList[fromCurrency]
    );
  }
}
