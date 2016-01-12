# react attelier

Get the AMD module located at `react-attelier.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactAttelier': 'react-attelier'
  }
});

require(['react', 'ReactAttelier'], function(React, ReactAttelier) {

  React.render(React.createElement(ReactAttelier), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
