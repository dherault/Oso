export default {
  name: 'skill',
  pluralName: 'skills',
  authCode: '0000',
  adminCode: '0000',
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
    creationIp: {
      type: 'ip',
      required: true,
      computed: true,
    },
  }
};
