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

        res.redirect('/school');
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
  }
};

