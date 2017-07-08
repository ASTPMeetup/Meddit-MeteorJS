Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttr) {

    // data security and error handling
    check(this.userId, String);
    check(commentAttr, { postAuthor: String, postId: String, body: String });

    const user = Meteor.user();
    const post = Posts.findOne(commentAttr.postId);

    if (!post) {
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');
    }

    const comment = _.extend(commentAttr, {
      userId: user._id,
      author: user.emails[0]['address'] || user.username,
      submitted: new Date()
    });

    //update Post view to reflect increment in CommentsCount
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    comment._id =  Comments.insert(comment);

    Meteor.users.update(commentAttr.postAuthor, {$inc: {"profile.commentsNum": 1}});

    createCommentNotification(comment);

    return comment._id;
  }
});
