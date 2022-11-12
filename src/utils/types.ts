export interface User {
  email: string;
  password: string;
}

export interface Note {
  title: string;
  body: string;
}

export interface UserResponse {
  user: {
    _id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface UserNote {
  _id: string;
  title: string;
  body: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteResponse {
  note: UserNote;
}

export interface NotesResponse {
  notes: UserNote[];
}

export interface Token {
  token: string;
}

export type AuthUser = Omit<UserResponse['user'], 'password' | '_id'>;

export type LocalStorageUser = AuthUser & Token;

export interface BadRequestResponse {
  errors: string[];
}
