## Progress Bars ([demo](http://demo.m00moo.com))
- Read data from the endpoint
- Multiple bars (as defined in API)
- One set of controls that can control each bar on the fly
- Can't go under 0
- Can go over limit (defined in API), but limit the bar itself and change its colour
- Display usage amount, centered
- Unit tests
- Implement a responsive solution: testing it on mobile, tablet, etc. Getting it working nicely.
- Animate the bar change, make sure it works well when you tap buttons quickly.
- Version control (git)

## Endpoint
Consume [endpoint](http://pb-api.herokuapp.com/bars)
> Example structure from the endpoint:
```
{
    "buttons": [
        10,
        38,
        -13,
        -18
    ],
    "bars": [
        62,
        45,
        62
    ],
    "limit": 230
}
```

| Key | Description |
| ------ | ---------- |
| buttons | The amount of buttons to display and what value they increment or decrement the selected bar. Randomly generates between 4 and 6 buttons. |
| bars | The number of progress bars to display and their default values. Randomly generates between 2 and 5 progress bars. |
| limit | The equivalent to 100% of each bar. For example, the bar should be 100% filled when the progress hits 230. |


## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if any changes of the source files.

## Build

Run `npm run production` to build the project. The build artifacts will be stored in the `dist/` directory.  
_Note: use the `--prod` flag for a production build._

## Running unit tests

Run `npm run test` or `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Browsers tested

- Chrome (desktop, Android)
- Safari (Mac, iPhone, iPad)