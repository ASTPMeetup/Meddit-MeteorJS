Accounts.onCreateUser(function(options, user){
    let customProfile = {
        commentsNum: 0,
        postsNum: 0,
        upVotesReceived: 0
    };

    user.profile = customProfile;
    return user;
});
