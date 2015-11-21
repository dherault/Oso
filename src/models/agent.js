export default {
  name: 'agent',
  pluralName: 'agents',
  authCode: '0000',
  adminCode: '0000',
  // hasAndBelongToMany: ['skill'],
  collumns: {
    name: {
      type: 'string',
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    xp: {
      type: 'integer',
      required: true,
      computed: true,
    },
    jobId: {
      type: 'string/id',
      ref: 'job',
      required: true,
      computed: true,
    },
    userId: {
      type: 'string/id',
      ref: 'user',
      required: true,
      computed: true,
    },
    imageId: {
      type: 'string/id',
      ref: 'image',
      required: true,
      computed: true,
    },
    skillsIds: {
      type: 'array/ids',
      ref: 'skill',
    }
  }
};
