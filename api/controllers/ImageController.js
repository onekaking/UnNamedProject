/**
 * ImageController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res) {
    Image.find().exec(function(err, images) {
      if (err) { 
        console.log(err);
        return;
      }

      console.log(images);

      return res.view('image', {
        images: images
      });

    });
  },

  add: function(req, res) {
    // req.file('image').upload({ // Authorization
    //   adapter: require('skipper-s3'),
    //   key: 'AKIAIXLOFEYKWB2UBPGA',
    //   secret: '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',
    //   bucket: 'egoproject',
    //   ACL: 'public-read',
    //   headers: {
    //     'x-amz-acl': 'public-read'
    //   }
    // }, function (err, filesUploaded) {
    //   if (err) return res.negotiate(err);
    //   console.log(filesUploaded[0]);
    //   Image.create({
    //     url: filesUploaded[0].extra.Location ,
    //   }).exec(function createCB(err, created){
    //       if (err) throw(err);
    //       console.log('Created image with url ' + created.url);

    //       res.redirect('/image');
    //   });
    // });
  },

  delete: function(req, res) {
    Image.destroy({
      id: req.param('id')
    }).exec(function(err) {
      if (err) {
        return res.negotiate(err);
      }

      res.redirect('/image'); 
    });
  } 

};

