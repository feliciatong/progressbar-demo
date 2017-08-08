import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ProgressbarService } from './progressbar.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        ProgressbarService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      compiled = fixture.debugElement;
    });
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should render title in a h2 tag', async(() => {
    expect(compiled.nativeElement.querySelector('h2').textContent).toEqual('Progress Bars');
  }));

  it('should render button group label in a strong tag with uppercase', async(() => {
    expect(compiled.nativeElement.querySelector('strong').textContent).toMatch('INCREMENT / DECREMENT BY VALUE');
  }));

  it('should render 3 progressbars', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
        app.bars = [73,38,45];
        fixture.detectChanges();

        expect(compiled.queryAll(By.css('div.progress-bar')).length).toBe(3);
      });
  }));

  it('should render 6 buttons', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
        app.buttons = [23,18,-17,-38,45,60];
        fixture.detectChanges();

        expect(compiled.queryAll(By.css('button.btn')).length).toBe(6);
      });
  }));

  describe('onSelectProgressBar', () => {
    beforeEach(() => {
      app.buttons = [44,14,-12,-10];
      app.bars = [73,38,45,40];
      app.limit = 140;
      app.payload = '{"buttons":' + JSON.stringify(app.buttons) + ',"bars":' + JSON.stringify(app.bars) + ',"limit":' + app.limit + '}';
    });

    it('by default, none of progressbar should be selected', async(() => {
      app.onSelectProgressBar(null);
      expect(app.activeProgressBar).toEqual(-1);
    }));

    it('third progressbar should be selected', async(() => {
      let activate: number = 2;
      app.onSelectProgressBar(activate);
      expect(app.activeProgressBar).toEqual(activate);
    }));

    it('should not activate any progressbar, if index out of bounds', async(() => {
      app.onSelectProgressBar(10);
      expect(app.activeProgressBar).toEqual(-1);
    }));
  });

  describe('onClickValueButton', () => {
    beforeEach(() => {
      app.buttons = [44,14,-12,-10];
      app.bars = [73,38,45,40];
      app.limit = 140;
      app.payload = '{"buttons":' + JSON.stringify(app.buttons) + ',"bars":' + JSON.stringify(app.bars) + ',"limit":' + app.limit + '}';
    });

    it('increase the value of the selected progressbar by 12', () => {
      let value = 12;
      let activated = 0;
      app.activeProgressBar = activated;
      let before = app.bars[activated];
      before += value;
      app.onClickValueButton(value);
      expect(app.bars[app.activeProgressBar]).toEqual(before);
    });

    it('decrease the value of the selected progressbar by 5', () => {
      let value = -5;
      let activated = 0;
      app.activeProgressBar = activated;
      let before = app.bars[activated];
      before += value;
      app.onClickValueButton(value);
      expect(app.bars[app.activeProgressBar]).toEqual(before);
    });

    it('the value of the selected progressbar cannot be negative value', () => {
      let value = -100;
      let activated = 2;
      app.activeProgressBar = activated;
      app.onClickValueButton(value);
      expect(app.bars[app.activeProgressBar]).toEqual(0);
    });

    it('the value of the selected progressbar should exceed the limit', () => {
      let value = 150;
      let activated = 1;
      app.activeProgressBar = activated;
      app.onClickValueButton(value);
      expect(app.bars[app.activeProgressBar]).toBeGreaterThan(app.limit);
    });
  });

  describe('fnComputeBarPercentage', () => {
    beforeEach(() => {
      app.buttons = [44,14,-12,-10];
      app.bars = [73,38,45,40];
      app.limit = 140;
      app.payload = '{"buttons":' + JSON.stringify(app.buttons) + ',"bars":' + JSON.stringify(app.bars) + ',"limit":' + app.limit + '}';
    });

    it('should be less than 100 percent', () => {
      let value = 130;
      expect(app.fnComputeBarPercentage(value)).toBeLessThan(100);
    });

    it('should be 100 percent', () => {
      let value = 140;
      expect(app.fnComputeBarPercentage(value)).toEqual(100);
    });

    it('should be 0 percent, if the value is zero', () => {
      let value = 0;
      expect(app.fnComputeBarPercentage(value)).toEqual(0);
    });

    it('should be 0 percent, if the value is negative', () => {
      let value = -10;
      expect(app.fnComputeBarPercentage(value)).toEqual(0);
    });
  });
});
