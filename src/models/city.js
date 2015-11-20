import ac from '../redux/actionCreators';

export default {
  name: 'city',
  pluralName: 'cities',
  read: ac.readCity,
  create: ac.createCity,
  collumns: {
    name: {
      type: 'string',
      required: true,
      unique: true,
      max: 50,
    },
    country: {
      type: 'string',
      required: true,
      max: 50,
    },
    description: {
      type: 'string',
      voteDuration: 1000 * 3600 / 60,
    },
    userId: {
      type: 'id',
      required: true,
      computed: true,
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