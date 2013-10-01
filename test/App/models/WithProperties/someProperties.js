App.Models.WithProperties.prototype.firstPoperty = {
    secondDepthProperty: function () {
        'use strict';
    }
};
App.Models.WithProperties.prototype.secondPoperty = /(test{1,2})[a-z0-9]+/gi;

App.Models.WithProperties.prototype.multilineFunction = function (test) {
    'use strict';
    return !!test;
};


/**
 *
 * @param test
 * @returns {boolean}
 */
App.Models.WithProperties.prototype.multilineFunctionWithComment = function (test) {
    'use strict';
    return !!test;
};
// @param test
// @returns {boolean}
App.Models.WithProperties.prototype.multilineFunctionWithInlineComment = function (test) {
    'use strict';
    return !!test;
};