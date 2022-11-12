type HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const protectedFetchRoute = <T>(
  url: string,
  token: string,
  method: HttpMethod,
  errMessage: string,
  payload?: unknown
): Promise<T> => {
  const options: RequestInit =
    method !== 'GET' && method !== 'DELETE'
      ? {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload || ''),
        }
      : { method, headers: { Authorization: `Bearer ${token}` } };
  return fetch(`${BASE_URL}${url}`, options).then((r) => {
    if (r.status === 404 || r.status === 400) throw new Error(errMessage);
    return r.json();
  });
};
