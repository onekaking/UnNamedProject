module.exports = function (sails) {
  return {
    initialize: function(cb) {
      //Converter Class
      var Converter = require("csvtojson").Converter;
      var converter = new Converter({});
      converter.fromFile("./rootkey.csv",function(err,result){
        for(var name in result[0]) {
            sails.config.globalConfig.keyAws = name.split("=")[1];
            sails.config.globalConfig.secretAws = result[0][name].split("=")[1];
        }
      });

      return cb();
    }
  }
}
