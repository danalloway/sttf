module.exports = {
    formatDate: function(date, format) {
        var moment = require("moment");

        return moment(date).format(format);
    }
}
