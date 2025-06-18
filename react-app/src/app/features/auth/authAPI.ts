const BASE_URL = 'https://travel-app-api.up.railway.app/api/v1';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || response.statusText);
  }
  return response.json();
};

// GET /auth/authenticated-user
export const getUserAPI = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/auth/authenticated-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleResponse(response); // => { id, fullName, email }
};

// POST /auth/sign-in
export const signInAPI = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return await handleResponse(response); // => { token: string }
};

// POST /auth/sign-up
export const signUpAPI = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password }),
  });

  return await handleResponse(response); // => { token: string }
};
// DELETE /auth/authenticated-user
export const deleteUserAPI = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/auth/authenticated-user`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await handleResponse(response);
};
