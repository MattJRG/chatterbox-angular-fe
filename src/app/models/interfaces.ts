export class CurrentUser {
  username: string;
  email: string;
  password: string;
}

export class User {
  username: string;
  friend: boolean;
  pendingFriend: boolean;
  userId: string;
}

export class Users {
  pendingRequests: User[];
  onlineFriends: User[];
  onlineUsers: User[];
  offlineFriends: User[];
  offlineUsers: User[];
}

export class Conversation {
  _id: string;
  title: string;
}
