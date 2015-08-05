var Backbone = require("Backbone"),
    MainView = require("../Views/MainView");
    /*MenuView*/
    /*SettingsView*/
    $ = require("jquery-browserify");

Backbone.$ = $;

var AppRouter = Backbone.Router.extend({
    routes: {
        "": "main",
        "menu" : "menu",
        "settings": "settings"
    },

    main: function () {
        this.closeCurrentView();
        var mainView = new MainView({
            el: $("#content")
        });
        mainView.render();

       this.setCurrentView(mainView);
    },

    menu: function () {
        this.closeCurrentView();

        //var menuView = new menuView({

        //this.setCurrentView(menuView);

    },

    settings: function() {
        this.closeCurrentView();

        //var settingsView = new SettingsView();

        // this.setCurrentView(settingsView);
    },

    closeCurrentView: function () {
        if (this.currentView) {
            this.currentView.close();
        }
    },

    setCurrentView: function (view) {
        this.currentView = view;
    }
});

module.exports = AppRouter;