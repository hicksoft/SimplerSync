import webui from "./webui";
import server from "./server";

server.listen(6000, () => "Server listening on port 6000");
webui.listen(9191, () => "Webui listening on port 9191");
