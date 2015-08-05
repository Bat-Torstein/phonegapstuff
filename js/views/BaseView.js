var Backbone = require("Backbone"),
    $ = require("jquery-browserify");

Backbone.$ = $;

var BaseView = Backbone.View.extend({
    close: function () {

        this.undelegateEvents();
        this.stopListening();
        
        if (this.onClose) {
            this.onClose(); 
        }
    }
});

module.exports = BaseView;