import User from '../models/user.model';

export const isUserExists = async (username: string, email: string) => {
  const isExistingUser = await User.findOne({
    $or: [{ username }, { email }],
  }).exec();
  return isExistingUser;
};
