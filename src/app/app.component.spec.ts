import { TestBed, inject, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ProgressbarService } from './progressbar.service';

describe('AppComponent', () => {
  let app: AppComponent;
  let compiled: any;

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
      const fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;

      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
    });
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should render title in a h2 tag', async(() => {
    expect(compiled.querySelector('h2').textContent).toEqual('Progress Bars');
  }));

  it('should render button group label in a strong tag with uppercase', async(() => {
    expect(compiled.querySelector('strong').textContent).toMatch('INCREMENT / DECREMENT BY VALUE');
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

    it('the value of the selected progressbar should not exceed the limit', () => {
      let value = 150;
      let activated = 1;
      app.activeProgressBar = activated;
      app.onClickValueButton(value);
      expect(app.bars[app.activeProgressBar]).toEqual(app.limit);
    });
  });
});
