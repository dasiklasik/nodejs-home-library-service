import { User } from '../resources/user/user.model';

const privateFields = ['password'];

export const getPublicUserData = (user: User) => {
  const publicUserEntries = Object.entries(user).filter(
    ([key]) => !privateFields.includes(key),
  );

  return Object.fromEntries(publicUserEntries);
};
