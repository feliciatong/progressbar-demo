import { Component, OnInit } from '@angular/core';
import { ProgressbarService } from './progressbar.service';
import { trigger, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('progressChange',[
      transition('* => *', animate('40ms ease-in-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
  public payload: string;
  public bars: any;
  public limit: number;
  public buttons: any;
  public activeProgressBar: number;
  public barsWidth: any;

  ngOnInit(): void {
    this.payload = "";
    this.bars = [];
    this.limit = 100;
    this.buttons = [];
    this.activeProgressBar = -1;
    this.barsWidth = [];

    this.progressbarService.getBars()
      .subscribe(
      data => {
        this.payload = JSON.stringify(data);
        this.bars = data.bars;
        this.limit = data.limit;
        this.buttons = data.buttons;
        this.activeProgressBar = 0;
      },
      error => {
        console.log("API call failed.");
      }
      );
  }

  constructor(private progressbarService: ProgressbarService) {
  }

  // functions
  public fnComputeBarPercentage(value: number): any {
    if (value<=0) {
      return 0;
    }
    return value / this.limit * 100;
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
      } 
      this.bars[this.activeProgressBar] = currentVal;
    }
  }

  public onProgressChangeCompleted(value: number, index: number): void {
    this.barsWidth[index] = value;
  }
}
