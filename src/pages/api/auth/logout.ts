import Cookie from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const cookie = new Cookie(req, res, {
      secure: process.env.NODE_ENV !== 'development',
    });
    cookie.set('accessToken', '', {
      maxAge: 0, //1 year
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      expires: new Date(Date.now()),
    });
    cookie.set('refreshToken', '', {
      maxAge: 0, //1 year
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      expires: new Date(Date.now()),
    });
    res.status(200).send({ status: 200 });
  } else {
    res.status(405).send({ status: 405 });
  }
}
