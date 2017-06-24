Errors = new Mongo.Collection(null);

throwError = function(errorMessage) {
  Errors.insert({message: errorMessage});
}

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.onRendered(function() {
  let error = this.data;

  Meteor.setTimeout(function(){
    Errors.remove(error._id);
  }, 4000);
});

