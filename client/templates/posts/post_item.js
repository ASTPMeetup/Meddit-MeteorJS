import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.postItem.helpers({
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
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  commentsNum: function() {
    var commentCounter = this.commentsCount;
    if (commentCounter === 1) {
      return commentCounter + ' comment';
    }

    return commentCounter + ' comments';
  }
});
