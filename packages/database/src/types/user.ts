export type User = {
  id: number;
  uuid: string;
  username: string;
  password: string;
  email: string;
  failedLoginAttempts: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUser = Pick<
  User,
  'uuid' | 'username' | 'password' | 'email'
>;
