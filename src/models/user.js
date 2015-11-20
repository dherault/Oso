import ac from '../redux/actionCreators';

export default {
  name: 'user',
  pluralName: 'users',
  read: ac.readUser,
  create: ac.createUser,
  collumns: {
    pseudo: {
      type: 'string',
      required: true,
      unique: true,
      min: 3,
      max: 15,
    },
    email: {
      type: 'email',
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
    creationIp: {
      type: 'ip',
      required: true,
      computed: true,
    },
    pictureId: {
      type: 'id',
      required: true,
      computed: true,
    }
  }
};
