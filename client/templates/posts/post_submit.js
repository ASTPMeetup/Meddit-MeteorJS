Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.postSubmit.onRendered(function(){
    Session.set('sortOptions', 'null');
});

Template.postSubmit.helpers({
  errorMessage: function(postAttr) {
    return Session.get('postSubmitErrors')[postAttr];
  },
  errorClass: function(postAttr) {
    return !!Session.get('postSubmitErrors')[postAttr] ? 'has-error' : '';
  }
});

Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    const newPost = {
      url: e.target.url.value,
      title: e.target.title.value
    }

    let errors = validatePost(newPost);
    if (errors.title || errors.url) {
      return Session.set('postSubmitErrors', errors);
    }

    Meteor.call('postInsert', newPost, function(error, result) {
      if (error) {
        throwError(error.reason);
      }

      // show this result but route anyway
      if (result.postExists) {
        throwError('This link has already been posted');
      }

      Router.go('postPage', {_id: result._id});
    });
  }
});
