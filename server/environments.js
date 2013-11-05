Environments = new Meteor.Collection("environments");

Meteor.publish('environments', function() {
    console.log('getting environments');
    return Environments.find();
});

Meteor.publish('env_detail', function(environment_id) {
    console.log('publish details got called');
    var env = Environments.findOne({ _id : environment_id });
    console.log('found environment ' + env.Name);
    return env;
});

