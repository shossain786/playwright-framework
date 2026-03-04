export const testData = {
  validUser: {
    username: 'admin',
    password: 'password',
    firstName: 'Rahul',
    lastName: 'Singh',
  },
  invalidUser: {
    username: 'invalid@cc.com',
    password: 'wrongpassword',
  },
  emptyUser: {
    username: '',
    password: '',
  },
  registration: {
    newUser: {
      firstName: 'Komal',
      lastName: 'Pal',
      email: `komal.pal@n.com`,
      password: 'Test@1234',
    },
  },
  errorMessages: {
    invalidCredentials: 'Invalid username and password! Please check your credentials.',
    emptyUsername: 'Username is required',
    emptyPassword: 'Password is required',
  },
};

export type TestData = typeof testData;