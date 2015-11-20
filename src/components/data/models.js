export default {
  user: {
    pseudo: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    email: {
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    firstName: {
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 200,
    },
    lastName: {
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 200,
    },
  },
  city: {
    name: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    country: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 100,
    },
  }
};
