import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    console.log(this.url);
    return a.hostname;
  }
});
