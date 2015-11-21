export default {
  name: 'skill',
  pluralName: 'skills',
  authCode: '0000',
  adminCode: '0000',
  // hasAndBelongToMany: ['agent'],
  collumns: {
    name: {
      type: 'string',
      required: true,
      unique: true,
      min: 1,
      max: 25,
    },
    description: {
      type: 'string',
      required: true,
      min: 1,
      max: 200,
    },
  }
};
