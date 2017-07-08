Template.postPage.onRendered(function(){
    Session.set('sortOptions', 'null');
});

Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});

Template.postPage.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  username: function() {
    if (this.author) {
      return 'Submitted by ' + this.author;
    }
    return 'public post';
  },
  domain: function() {
    let a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});
