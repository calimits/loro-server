type ack = {
    error: boolean;
    data: object;
};
interface iSocketServer {
    initialize(server: any): void;
    setUpSocketListeners(): this;
    getServer(): any;
}
export { iSocketServer, ack };
