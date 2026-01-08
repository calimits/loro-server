interface iServerHttp {
    DOMAIN: String;
    PORT: number;
    setDomain(domain: String): this;
    setPort(port: number): this;
    configGlobalMiddleWare(): this;
    configRoutes(): this;
    listen(message: String): Promise<void>;
}
export { iServerHttp };
