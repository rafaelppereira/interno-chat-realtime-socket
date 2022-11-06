const { serverHttp } = require("./http");
require('./websocket');

const port = process.env.PORT || 3000
serverHttp.listen(port, () => console.log(`🌎 App chat socket is running on port: ${port}`));