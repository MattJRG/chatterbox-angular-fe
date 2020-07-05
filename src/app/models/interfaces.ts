export class CurrentUser {
  username: string;
  email: string;
  password: string;
}

export class User {
  username: string;
  friend: boolean;
  userId: string;
  pending?: boolean;
}
