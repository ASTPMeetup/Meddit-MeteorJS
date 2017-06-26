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
  upvoteButtonView: function() {
    let userId = Meteor.userId();

    if(userId && this.upvoters.indexOf(userId) === -1) {
      return 'btn-outline-primary upvotable';
    }
    else {
      return 'btn-primary';
    }
  }
});

Template.postItem.events({
   'click .upvote': function(e){
     e.preventDefault();
     Meteor.call('upvote', this._id, function(error, result){
         if (error) {
             throwError(error.reason);
         }
     });
   }
});
