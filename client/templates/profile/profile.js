Template.profilePage.helpers({
    username: function() {
        let user = Meteor.user();
        let userName = user.emails[0]['address'];
        return userName;
    },
    postCount: function(){
        let publications = Posts.find({userId : Meteor.userId()});
        return publications.count();
    }
});