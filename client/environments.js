
Environments = new Meteor.Collection("environments");

// currently selected environment
Session.setDefault('environment_id', null);

/*
var environmentsHandle = Meteor.subscribe('environments', function() {
    if(!Session.get('environment_id')) {
        var list = Environments.find()
});
*/

var detailsHandle = null;
Deps.autorun(function() {
    var env_id = Session.get('environment_id');
    if(env_id) {
        detailsHandle = Meteor.subscribe('env_detail', env_id);
    } else {
        detailsHandle = null;
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

var EnvironmentsRouter = Backbone.Router.extend({
    routes: {
        ":environment_id": "main"
    },
    main: function (environment_id) {
        var oldEnv = Session.get("environment_id");
        if(oldEnv != environment_id) {
            Session.set("environment_id", environment_id);
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
