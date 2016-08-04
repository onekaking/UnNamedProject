/**
 * MajorController
 *
 * @description :: Server-side logic for managing Majors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function(req, res) {
    Major.create({
      name: req.param('major.name'),
      description: req.param('major.description')
    }).exec(function createCB(err, created){
        if (err) throw(err);
        console.log('Created major with name ' + created.name);

        res.redirect('/major/'+ created.id);
    });
  },

  delete: function(req, res) {
    Major.destroy({
      id: req.param('id')
    }).exec(function(err) {
      if (err) {
        return res.negotiate(err);
      }

      return res.ok();
    });
  },

  getRemainBySchool: function(req, res) {
    Major.find().populate('schools').exec(function(err, majors) {
      if (err) { 
        console.log(err);
        return;
      }

      return res.json({ majors: majors });

    })
  },

  update: function(req, res) {
    Major.update(req.param('major.id'), {
      name: req.param('major.name'),
      description: req.param('major.description')
    }).exec(function(err, updated) {
      if (err) { 
        console.log(err);
        return;
      }

      console.log('Updated major with name ' + updated[0].name);
      res.redirect('/major/'+ req.param('major.id'));
    });
  }

};

