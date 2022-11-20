import Cookie from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';
import { BaseResponse } from '../../../models/baseResponse.model';
import { UserTokenModel } from '../../../models/user.model';
import { loginUser } from '../../../services/auth.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await loginUser(req.body);
    console.log(user);
    const data = user.data as BaseResponse<UserTokenModel>;
    const date = new Date();
    const cookie = new Cookie(req, res, {
      secure: process.env.NODE_ENV !== 'development',
    });
    cookie.set('accessToken', data?.data.accessToken, {
      maxAge: 1800000, //15 mins
      domain: 'https://worker-production-3a23.up.railway.app',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });
    cookie.set('refreshToken', data?.data.refreshToken, {
      maxAge: 3.154e10, //1 year
      domain: 'https://worker-production-3a23.up.railway.app',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      expires: new Date(
        new Date().setFullYear(
          date.getFullYear() + 1,
          date.getMonth(),
          date.getDate()
        )
      ),
    });
    res.json(data);
  } else {
    res.status(405).send({ status: 405 });
  }
}
