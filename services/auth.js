import jwt from 'jsonwebtoken';

import constants from '../config/constants';
import User from '../models/user';

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error('Unauthorized!');
  }

  const me = await User.findById(user._id);

  if (!me) {
    throw new Error('Unauthorized!');
  }

  return me;
}

export function decodeToken(token) { console.log('token: '); console.log(token);
  const arr = token.split(' ');
  if (arr[0] === 'Bearer') {
      const verifyTokenResult = jwt.verify(arr[1], constants.JWT_SECRET);
      console.log(verifyTokenResult);
    return verifyTokenResult;
  }

  throw new Error('Token not valid!');
}

/*
export function decodeToken(token) {
  const arr = token.split(' ');

  if (arr[0] === 'Bearer') {
    return jwt.verify(arr[1], constants.JWT_SECRET);
  }

  throw new Error('Token not valid!');
}

*/