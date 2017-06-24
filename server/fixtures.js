if (Posts.find().count() === 0) {
  let now = new Date().getTime();

  const tomId = Meteor.users.insert({ profile: { name: 'Tom Coleman' }});
  const tom = Meteor.users.findOne(tomId);

  const sallyId = Meteor.users.insert({ profile: { name: 'Sally Smith' }});
  const sally = Meteor.users.findOne(sallyId);

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sally._id,
    author: sally.profile.name,
    url: 'http://sallysmith.com/introducing-telescope/',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [],
    votes: 0
  });

  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sally, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: sally._id,
    author: sally.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });

  Posts.insert({
    title: 'Meteor',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  Posts.insert({
    title: 'The Meteor Book',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: sally.profile.name,
      userId: sally._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: new Date(now - i * 3600 * 1000),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
  }
}
