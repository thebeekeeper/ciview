
Environments = new Meteor.Collection("environments");

// currently selected environment
Session.setDefault('environment_id', null);

// currently selected application - for resolved issues
Session.setDefault('selected_app', null);

/*
var environmentsHandle = Meteor.subscribe('environments', function() {
    if(!Session.get('environment_id')) {
        var list = Environments.find()
});
*/

var detailsHandle = null;
var selectedAppHandle = null;
Deps.autorun(function() {
    var env_id = Session.get('environment_id');
    if(env_id) {
        detailsHandle = Meteor.subscribe('env_detail', env_id);
    } else {
        detailsHandle = null;
    }

    var selected = Session.get('selected_app');
    if(selected) {
        console.log('selected');
        selectedAppHandle = Meteor.subscribe('resolved_bugs', selected);
    } else {
        selectedAppHandle = null;
    }
});

Template.env_list.environment = function() {
    return Environments.find();
};

Template.env_list.events({
    'mousedown .env-link': function (evt) {
        Router.setEnvironment(this._id);
    },
    'click .env-link': function (evt) {
        evt.preventDefault();
    }
});

Template.env_list.selected = function() {
    return Session.equals('environment_id', this._id) ? 'selected' : '';
};

Template.env_detail.detail = function() {
    var env_id = Session.get('environment_id');
    return Environments.findOne( { _id: env_id });
};

Template.env_detail.events({
    'mousedown .app-link': function(evt) {
        var selected_app = evt.toElement.innerHTML;
        console.log('setting selected app: ' + selected_app);
        Session.set("selected_app", selected_app);
    }
});

Template.env_detail.selected = function() {
     console.log('name in selected: ' + this.Name);
    return Session.equals('selected_app', this.Name) ? 'app-selected' : '';
}

Template.resolved_bugs.bugs = function() {
    console.log('setting bugs');
    var app = Session.get('selected_app');
    console.log('updating template for ' + app);
    var env_id = Session.get('environment_id');
    if(env_id == null) {
        return null;
    }
    console.log('env id: ' + env_id);
    var env = Environments.findOne({ _id: env_id });
    if(env == null) {
        return null;
    }
    console.log('environment: ' + env);
    console.log('loading issues for ' + app);
    for(var i = 0 ; i < env.Applications.length ; i++) {
        var a = env.Applications[i]; 
        console.log('looking at ' + a.Name);
        if(a.Name == app) {
            console.log('found ' + a.Name);
            var resolved = a.ResolvedIssues;
            return resolved;
        }
    }
    return null;
};

var EnvironmentsRouter = Backbone.Router.extend({
    routes: {
        ":environment_id": "main"
    },
    main: function (environment_id) {
        var oldEnv = Session.get("environment_id");
        if(oldEnv != environment_id) {
            Session.set("environment_id", environment_id);
            Session.set("selected_app", null);
        }
    },
    setEnvironment: function(environment_id) {
        this.navigate(environment_id, true);
    }
});

Router = new EnvironmentsRouter;

Meteor.startup(function() {
    Backbone.history.start({pushState: true});
});

Handlebars.registerHelper('toStatusClass', function(options) {
    if(options == 'Passed') {
        return "label-success";
    } else if (options == 'Failed') {
        return 'label-important';
    } else if (options == 'Running') {
        return 'label-info';
    }
    return '';
});
