'use strict';

const app = require('./express-static-server/server');

app.listen(3000, () => console.log('Local app listening on port 3000!'));
