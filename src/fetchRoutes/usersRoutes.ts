import { FormResponseError } from '@/utils/ResponseError';
import { User, Token, UserResponse, BadRequestResponse } from '@/utils/types';
import { protectedFetchRoute } from './protectedRoutes';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const auth = (url: string, payload: User, errMessage: string): Promise<Token> =>
  fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(async (r) => {
    if (r.status !== 200 && r.status !== 201)
      throw new FormResponseError(
        errMessage,
        r.status,
        ((await r.json()) as BadRequestResponse).errors
      );
    return r.json();
  });

export const register = (user: User): Promise<Token> =>
  auth('/users/register', user, 'failed registering user');

export const login = (user: User): Promise<Token> =>
  auth('/users/login', user, 'failed logging user');

export const getUser = (token: string) =>
  protectedFetchRoute<UserResponse>('/users', token, 'GET', 'cannot find user');
