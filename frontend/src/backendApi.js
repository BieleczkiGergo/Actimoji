import axios from "axios";

// Tudom mit gondolsz, de hidd el ennek van értelme
// vagyis lesz, ha még nem látszik
const localDomain = "localhost:8080";
//const ddnsDomain = "actimoji.duckdns.org:8080";

const backendDomain = localDomain;

const backendUrlHttp = `http://${backendDomain}`;
const backendUrlWs = `ws://${backendDomain}`;

const backendApi = axios.create({
    baseURL: backendUrlHttp

});

export { backendUrlHttp, backendUrlWs, backendApi, backendDomain };
