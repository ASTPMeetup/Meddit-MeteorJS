Template.profilePage.helpers({
    username: function() {
        return Meteor.user().emails[0]['address'];
    },
    postsNum: function(){
        return Meteor.user().profile.postsNum;
    },
    commentsNum: function(){
        return Meteor.user().profile.commentsNum;
    },
    upVotesReceived: function(){
        return Meteor.user().profile.upVotesReceived;
    }
});