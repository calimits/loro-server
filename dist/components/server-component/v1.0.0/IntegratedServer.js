class IntegratedServer {
    PORT;
    httpServer;
    constructor(PORT, httpServer) {
        this.PORT = PORT;
        this.httpServer = httpServer;
    }
    async start() {
        this.httpServer.listen(this.PORT, () => {
            console.log(`Server running on  http://localhost:${this.PORT}`);
        });
    }
}
export { IntegratedServer };
