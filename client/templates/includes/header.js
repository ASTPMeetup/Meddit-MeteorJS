/**
 * Created by Piero on 6/26/2017.
 */
Template.header.helpers({
    activeTopTab: function() {
        if(Session.equals('sortOptions', 'sortByVotes')) {
            return 'active';
        }
    },
    activeRecentTab: function() {
        if(Session.equals('sortOptions', 'sortByRecent')) {
            return 'active';
        }
    }
});

Template.header.events({
    'click .sortByVotes': function(e) {
        e.preventDefault();
        Session.set('sortOptions', 'sortByVotes');
    },
    'click .sortByRecent': function(e) {
        e.preventDefault();
        Session.set('sortOptions', 'sortByRecent');
    }
});