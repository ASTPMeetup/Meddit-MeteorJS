Template.postsList.onRendered(function(){
  Session.set('sortOptions', 'sortByRecent');
});

Template.postsList.helpers({
  posts: function() {
    if(Session.equals('sortOptions', 'sortByVotes')){
        return Posts.find({}, {sort: { votes: -1}});
    }
    if(Session.equals('sortOptions', 'sortByRecent')){
        return Posts.find({}, {sort: { submitted: -1}});
    }

    return Posts.find({}, {sort: { submitted: -1}});
  }
});
