var Backbone = require('backbone'),
    AppRouter = require('./router/AppRouter'),
    $ = require('jquery-browserify');
    

$(document).ready(function () {
    var router = new AppRouter();

    Backbone.history.start();

    /*$(document).ajaxStart(function () {
        $("#loading").addClass('spinner');
    });

    $(document).ajaxStop(function () {
        $("#loading").removeClass('spinner');
    });
    */
});
    