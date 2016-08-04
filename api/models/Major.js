/**
 * Major.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    schools: {
      collection: 'school',
      via: 'majors',
      dominant: true
    },

    // Override toJSON method to remove password from API
    // toJSON: function() {
    //   var obj = this.toObject();
    //   delete obj.schools;
    //   return obj;
    // }
  }
};

