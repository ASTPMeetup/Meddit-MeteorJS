Template.postEdit.onCreated(function() {
  Session.set('postEditErrors', {});
});

Template.postEdit.onRendered(function(){
    Session.set('sortOptions', 'null');
});

Template.postEdit.helpers({
  errorMessage: function(postAttr) {
    return Session.get('postEditErrors')[postAttr];
  },
  errorClass: function(postAttr) {
    return !!Session.get('postEditErrors')[postAttr] ? 'has-error' : '';
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    const currentPostId = this._id;

    const postProperties = {
      url: e.target.url.value,
      title: e.target.title.value
    }

    let errors = validatePost(postProperties);
    if (errors.title || errors.url) {
      return Session.set('postEditErrors', errors);
    }

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      }
      else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Are you sure?")) {
      Posts.remove(this._id);
      Router.go('postsList');
    }
  }
});
