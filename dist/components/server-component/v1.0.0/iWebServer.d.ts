interface iWebServer {
    setDomain(domain: String): this;
    setPort(port: number): this;
    configGlobalMiddleWare(): this;
    listen(message: String): Promise<void>;
    getServer(): any;
}
export { iWebServer };
