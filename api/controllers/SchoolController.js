/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res) {
    School.find().exec(function(err, schools) {
      if (err) { 
        console.log(err);
        return;
      }

      return res.view('school', {
        schools: schools
      });

    })
  },

  add: function(req, res) {
    School.create({
      name: req.param('school.name'),
      address: req.param('school.address')
    }).exec(function createCB(err, created){
        if (err) throw(err);
        console.log('Created school with name ' + created.name);

        res.redirect('/school/'+ created.id);
    });
  },

  delete: function(req, res) {
    School.destroy({
      id: req.param('id')
    }).exec(function(err) {
      if (err) {
        return res.negotiate(err);
      }

      return res.ok();
    });
  },

  dataList: function(req, res) {
    School.find().exec(function(err, schools) {
      if (err) { 
        console.log(err);
        return;
      }

      return res.json({ schools: schools});
    });
  },

  update: function(req, res) {
    School.update(req.param('school.id'), {
      name: req.param('school.name'),
      address: req.param('school.address')
    }).exec(function(err, updated) {
      if (err) { 
        console.log(err);
        return;
      }

      console.log('Updated school with name ' + updated[0].name);
      res.redirect('/school/'+ req.param('school.id'));
    });
  },

  addMajor: function(req, res) {
    School.findOne(req.param('schoolid')).populate('majors').exec(function(err, school) {

      if (err) { return res.serverError(err); }
      if (!school) { return res.notFound('Could not find a school'); }

      school.majors.add(req.param('majorid'));
      school.save(function(err){
        if (err) { return res.serverError(err); }
        return res.ok();
      });//</save()>

    });
  },

  removeMajor: function(req, res) {
    School.findOne(req.param('schoolid')).populate('majors').exec(function(err, school) {

      if (err) { return res.serverError(err); }
      if (!school) { return res.notFound('Could not find a school'); }

      school.majors.remove(req.param('majorid'));
      school.save(function(err){
        if (err) { return res.serverError(err); }
        return res.ok();
      });//</save()>

    });
  },

  processData: function(req, res) {
    var recursive = require('recursive-readdir');

    recursive('./source', function (err, files) {
      // Files is an array of filename
      var path = require("path");
      var fs = require("fs");

      console.log("Length : " + files.length);
      for(var i in files) {
        if(!fs.lstatSync(files[i]).isDirectory()) {
          School.create({
            name: path.basename(files[i]).replace('.docx','').split("Trường")[1]
          }).exec(function createCB(err, created){
              if (err) throw(err);
              console.log(i + " - " + created.name);
          });
        }
      }
    });
  },

  destroyAll: function(req, res) {
    School.destroy({}).exec(function(err) {
      if(err) {
        console.log(err);
        return;
      }
      console.log("Remove sucess");
      return res.ok('Ok');
    });
  },

  writeJson: function(req, res) {
    School.find().exec(function(err, schools) {
      if(err) {
        console.log(err);
        return res.error(err);
      }

      var jsonfile = require('jsonfile');
 
      var file = './source/data.json';
       
      jsonfile.writeFile(file, schools , {spaces: 2}, function (err) {
        console.error(err);
      });
    });
  },

  readJson: function(req, res) {
    var fs = require('fs');
 
    var file = './source/data.json';

    fs.readFile(file, 'utf8', function (err, data) {
      files = JSON.parse(data.toString('utf8').replace(/^\uFEFF/, ''));
      for(var i in files) {

        console.log(files[i].name);
        console.log(files[i].name.split("Trường"));
        School.create({
          name: files[i].name.split("Trường")[1]
        }).exec(function createCB(err, created){
            if (err) throw(err);
            //console.log(i + " - " + created.name);
        });
      }
    });


    // jsonfile.readFile(file, function(err, files) {
    //   for(var i in files) {

    //     console.log(files[i].name);
    //     console.log(files[i].name.split("Trường"));
    //     School.create({
    //       name: files[i].name.split("Trường")[1]
    //     }).exec(function createCB(err, created){
    //         if (err) throw(err);
    //         //console.log(i + " - " + created.name);
    //     });
    //   }
    // })
  },

  maps: function(req, res) {
    var GoogleMapsAPI = require('googlemaps');

    var publicConfig = {
      key: 'AIzaSyDCOpw7yInGHdmiPGRZZ4NpZMXWcfN9YgI',
      stagger_time:       1000, // for elevationPath
      encode_polylines:   false,
      secure:             false, // use https
      //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
    };
    var gmAPI = new GoogleMapsAPI(publicConfig);
    // var geocodeParams = {
    //   "address":    "121, Curtain Road, EC2A 3AD, London UK",
    //   "components": "components=country:GB",
    //   "bounds":     "55,-1|54,1",
    //   "language":   "en",
    //   "region":     "uk"
    // };

    // gmAPI.geocode(geocodeParams, function(err, result){
    //   console.log('geocode');
    //   console.log(result);
    // });

    var placeParams = {
      //"name": req.param("name"),
      "location": "10.762622, 106.660172",
      "types": "university",
      // "keyword": "Trường",
      "language": "vi"
    };

    gmAPI.placeSearch(placeParams, function(err, result){
      console.log('place');
      if(err) {
        console.log(err);
        return;
      }
      
      return res.ok(result);
    });
  }
};

