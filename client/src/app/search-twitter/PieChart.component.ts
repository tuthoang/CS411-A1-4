import {Component} from '@angular/core';

@Component({
    templateUrl: './piechart.html'
})
export class PieChart {
    data: any;

  constructor() {
    this.data = {
      labels: ['anger','joy','fear', 'sadness', 'surprise'],
      datasets: [
          {
              data: [1, 1, 1, 1, 1],                    
              hoverBackgroundColor: [
                  "#FF6371",
                  "#36A2EB",
                  "#FFCE45",
                  '#FF1919',
                  '#329932'
              ],
              backgroundColor: [
                  "#FF6371",
                  "#36A2EB",
                  "#FFCE45",
                  '#FF1919',
                  '#329932'

              ]
          }]    
      };
  }
}
