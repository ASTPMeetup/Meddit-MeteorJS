Template.commentSubmit.onCreated(function() {
  Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
  errorMessage: function(commentAttr) {
    return Session.get('commentSubmitErrors')[commentAttr];
  },
  errorClass: function(commentAttr) {
    return !!Session.get('commentSubmitErrors')[commentAttr] ? 'has-error' : '';
  }
});

Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    console.log(template);

    const commentPost = $(e.target).find('[name=body]');

    const newComment = {
      body: commentPost.val(),
      postId: template.data._id
    }

    let errors = {};
    if (!newComment.body) {
      errors.body = "Please write some content";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', newComment, function(error, commentId) {
      if (error) {
        throwError(error.reason);
      }
      else {
        commentPost.val('');
      }
    });
  }
});
