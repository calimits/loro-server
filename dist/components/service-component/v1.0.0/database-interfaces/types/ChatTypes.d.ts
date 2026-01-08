type ChatUser = {
    userID: string;
    isAdmin: boolean;
    hasArchivedThisChat: boolean;
};
interface Chat {
    _id?: String;
    name: String;
    description: String;
    lastUpdated: Date;
    chatUsers: ChatUser[];
}
interface ChatInfo extends Pick<Chat, "name" | "description"> {
}
interface ChatMember extends Pick<ChatUser, "userID" | "isAdmin"> {
}
export { Chat, ChatInfo, ChatUser, ChatMember };
