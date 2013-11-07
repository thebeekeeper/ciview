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

Meteor.methods({
    testCall: function(testParam) {
        console.log('got test call: ' + testParam);
    },
    addEnvironment: function(envName, tag, uri, envStatus) {
        console.log('adding environment ' + envName);
        Environments.insert({ Name: envName, Tag: tag, Uri: uri, Status: envStatus });
    },
});

Router.map(function() {
	console.log('in Router.map');
	this.route('serverRoute', {
		where: 'server',
		path: '/testRoute',
		action: function() {
			console.log('testRoute got called');
			this.response.writeHead(200);
			this.response.write('hello\n');
			this.response.end();
		}
	});
});

