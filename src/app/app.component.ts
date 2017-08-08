import { Component, OnInit } from '@angular/core';
import { ProgressbarService } from './progressbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public payload: string;
  public bars: any;
  public limit: number;
  public buttons: any;
  public activeProgressBar: number;

  ngOnInit(): void {
    this.payload = "";
    this.bars = [];
    this.limit = 100;
    this.buttons = [];
    this.activeProgressBar = -1;

    this.progressbarService.getBars()
      .subscribe(
      data => {
        this.payload = JSON.stringify(data);
        this.bars = data.bars;
        this.limit = data.limit;
        this.buttons = data.buttons;
      },
      error => {
        console.log("API call failed.");
      }
      );
  }

  constructor(private progressbarService: ProgressbarService) {
  }

  // events
  public onSelectProgressBar(selected: number): void {
    if (selected == null || selected > this.bars.length) {
      // default
      this.activeProgressBar = -1;
    } else {
      this.activeProgressBar = selected;
    }
  }

  public onClickValueButton(value: number): void {
    if (this.activeProgressBar >= 0) {
      let currentVal = this.bars[this.activeProgressBar];
      currentVal += value;
      if (currentVal < 0) {
        currentVal = 0;
      } else if (currentVal > this.limit) {
        currentVal = this.limit;
      }
      this.bars[this.activeProgressBar] = currentVal;
    }
  }
}
