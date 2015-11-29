export default {
  name: 'item',
  pluralName: 'items',
  authCode: '0000',
  adminCode: '0000',
  collumns: {
    name: {
      type: 'string',
      required: true,
      unique: true,
      min: 3,
      max: 15,
    },
    description: {
      type: 'string',
      max: 500,
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
    // },
  }
};
