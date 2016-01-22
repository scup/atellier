// require all `spec/**/*.jsx`
const specContext = require.context('./', true, /\.spec\.jsx$/);
specContext.keys().forEach(specContext);

// require all `lib/**/*.jsx`
const libContext = require.context('../lib/', true, /\.jsx$/);
libContext.keys().forEach(libContext);
