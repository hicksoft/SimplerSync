import webui from "./webui";
import server from "./server";

server.addListener(6000);
webui.addListener(9292);
