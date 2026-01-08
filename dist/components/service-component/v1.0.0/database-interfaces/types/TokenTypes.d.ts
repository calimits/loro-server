interface Token {
    _id?: string;
    token: string;
    userID: string;
    type: "refresh" | "access";
}
export { Token };
