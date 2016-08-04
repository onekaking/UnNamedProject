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
      if (!school) { return res.notFound('Could not find a school named Finn.'); }

      school.majors.add(req.param('majorid'));
      school.save(function(err){
        if (err) { return res.serverError(err); }
        return res.ok();
      });//</save()>

    });
  }
};

