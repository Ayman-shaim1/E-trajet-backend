export const excludeUserFields = (user, keys) => {
  for (let key of keys) {
    delete user[key];
  }
  return user;
};
