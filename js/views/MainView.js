var BaseView = require("./BaseView"),
    template = require("../../templates/main.html");

var MainView = BaseView.extend({
    render: function () {
        var html = template({});
        this.$el.html(html);

        return this;
    }
});

module.exports = MainView;