
export default {
  name: 'user',
  pluralName: 'users',
  authCode: '0000',
  adminCode: '0000',
  // hasMany: ['agent', 'item'],
  collumns: {
    pseudo: {
      type: 'string',
      required: true,
      unique: true,
      min: 3,
      max: 15,
    },
    email: {
      type: 'string/email',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
      min: 8,
      max: 200,
      notSaved: true,
    },
    passwordHash: {
      type: 'string',
      required: true,
      computed: true,
    },
    fullName: {
      type: 'string',
      max: 50,
    },
    description: {
      type: 'string',
      max: 500,
    },
    imageId: {
      type: 'string/id',
      required: true,
      computed: true,
    },
    agentsIds: {
      type: 'array/id',
    },
    itemsIds: {
      type: 'array/id',
    },
  }
};
