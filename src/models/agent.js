import ac from '../redux/actionCreators';

// HABTM skills

export default {
  name: 'agent',
  pluralName: 'agents',
  read: ac.readAgent,
  create: ac.createAgent,
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
      type: 'id',
      required: true,
      computed: true,
    },
    userId: {
      type: 'id',
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
