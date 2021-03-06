Meteor.startup(function() {
    if(Environments.find().count() == 0) {
        Environments.insert({
            Name: "Server 1",
            Tag: "Development Environment",
            Uri: "http://testserver1.com",
            Status: "Ready",
            Applications: [
                { 
                    Name: "Windows Vista",
                    Version: "1.0.0.7",
                    TestSuites : [{
                        Name: "Unit Tests",
                        Status: "Passed"
                    }, {
                        Name: "UAT",
                        Status: "Failed"
                    }]
                },
                { 
                    Name: "OS/2 Warp",
                    Version: "3.2",
                    TestSuites : [{
                        Name: "Unit Tests",
                        Status: "Passed"
                    }, {
                        Name: "UAT",
                        Status: "Passed"
                    }]
                },
                { 
                    Name: "Solitaire",
                    Version: "0.2",
                    TestSuites : [{
                        Name: "Unit Tests",
                        Status: "Passed"
                    }, {
                        Name: "UAT",
                        Status: "Passed"
                    }]
                }
            ]   
        });
        Environments.insert({
            Name: "Slot 3",
            Tag: "QA Integration",
            Uri: "http://www.savolab3.com",
            Status: "Ready",
            Applications: [
                { 
                    Name: "Windows Vista",
                    Version: "1.0.0.7",
                    TestSuites : [{
                        Name: "Unit Tests",
                        Status: "Passed"
                    }, {
                        Name: "UAT",
                        Status: "Failed"
                    }]
                },
                { 
                    Name: "OS/2 Warp",
                    Version: "3.2",
                    TestSuites : [{
                        Name: "Unit Tests",
                        Status: "Passed"
                    }, {
                        Name: "UAT",
                        Status: "Passed"
                    }]
                },
                { 
                    Name: "Solitaire",
                    Version: "0.2",
                    TestSuites : [{
                        Name: "Unit Tests",
                        Status: "Passed"
                    }, {
                        Name: "UAT",
                        Status: "Passed"
                    }]
                },
        ]
        });
    }
});
