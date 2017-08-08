import { TestBed, inject, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, ResponseOptions, Response, RequestMethod, BaseRequestOptions } from '@angular/http';

import { ProgressbarService } from './progressbar.service';

describe('ProgressbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ProgressbarService, MockBackend, BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [
            MockBackend, BaseRequestOptions
          ]
        }
      ]
    });
  });

  it('should be created', inject([ProgressbarService], (service: ProgressbarService) => {
    expect(service).toBeTruthy();
  }));

  describe('getBars', () => {
    it('should parse response', async(inject([ProgressbarService, MockBackend], (service, mockBackend) => {
      let buttons = [10,38,-13,-18];
      let bars = [62,45,62];
      let limit = 230;

      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url).toBe('http://pb-api.herokuapp.com/bars');
        expect(connection.request.method).toBe(RequestMethod.Get);

        let response = new ResponseOptions({body: '{"buttons": '+ JSON.stringify(buttons) + ',"bars": ' + JSON.stringify(bars) + ',"limit": ' + limit + '}'});
        connection.mockRespond(new Response(response));
      });
      
      service.getBars().subscribe((response) => {
        expect(response.buttons).toEqual(buttons);
        expect(response.bars).toEqual(bars);
        expect(response.limit).toEqual(limit);
        expect(response.status).toBeUndefined();
      });
    })));
  });
});
