Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Meteor.methods({
  postInsert: function(postAttr) {

    // data security and error handling
    check(Meteor.userId(), String);
    check(postAttr, { title: String, url: String });

    let errors = validatePost(postAttr);
    if(errors.title || errors.url) {
      throw new Meteor.Error('invalid-post', 'You must set a title and url for your post');
    }

    postDuplicate = Posts.findOne({ url: postAttr.url });

    if(postDuplicate) {
      return {
        postExists: true,
        _id: postDuplicate._id
      }
    }

    const user = Meteor.user();

    const post = _.extend(postAttr, {
      userId: user._id,
      author: user.emails[0]['address'],
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });

    const postId = Posts.insert(post);

    return {
      _id: postId
    };
  },
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    let post = Posts.findOne(postId);

    if(!post) {
      throw new Meteor.Error('invalid', 'Post not found');
    }

    if(post.upvoters.indexOf(this.userId) > -1) {
      throw new Meteor.Error('invalid', 'Already upvoted this post');
    }

    Posts.update(post._id, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    return post.upvoters;
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    let errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

validatePost = function(post) {
  let errors = {};

  if (!post.title) {
    errors.title = "Please fill in a headline";
  }
  if (!post.url) {
    errors.url = "Please fill in a url";
  }

  return errors;
}
