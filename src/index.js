const { default: app } = require("./apps")

import apps from './apps';
import "./database";

apps.listen(4000)

console.log('server listen on port',4000);