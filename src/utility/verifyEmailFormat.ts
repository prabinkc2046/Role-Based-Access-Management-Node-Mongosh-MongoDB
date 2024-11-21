export const isValidEmail = (email: string) => {
  const myemail = 'pkmiracle36@gmail.com';

  const isValidEmail = email.includes('@');
  return isValidEmail;
};
