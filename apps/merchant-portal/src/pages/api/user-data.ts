// This is an example of how to read a JSON Web Token from an API route
import { getToken } from 'next-auth/jwt';
import fetch from 'node-fetch';
export default async (req, res) => {
  const token = await getToken({ req });
  if (token) {
    // Signed in
    const url = process.env.FUSIONAUTH_URL + '/oauth2/introspect';
    const params = new URLSearchParams();
    params.append('client_id', process.env.FUSIONAUTH_CLIENT_ID);
    params.append('token', token.accessToken);
    const response = await fetch(url, {
      method: 'post',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const data = await response.json();
    console.log('JSON Web Token', JSON.stringify(token, null, 2));
    res.json(data);
  } else {
    // Not Signed in
    res.status(401);
  }
};
