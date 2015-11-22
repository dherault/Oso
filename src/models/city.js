export default {
  name: 'city',
  pluralName: 'cities',
  authCode: '0000',
  adminCode: '0000',
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
      type: 'string/id',
      ref: 'user',
      // required: true,
      // computed: true,
    },
    // imageId: {
    //   type: 'string/id',
    //   ref: 'image',
    //   required: true,
    //   computed: true,
    // }
  }
};