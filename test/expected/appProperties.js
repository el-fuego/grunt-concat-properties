App.Models.WithProperties = function () {
    'use strict';
};

App.Models.WithProperties.prototype = {

    firstPropertyAtFolder: [
        function (test) {
            'use strict';

            return !!test;
        }
    ],

    secondPropertyAtFolder: ['test'],

    firstPoperty: {
        secondDepthProperty: function () {
            'use strict';
        }
    },

    secondPoperty: /(test{1,2})[a-z0-9]+/gi,


    multilineFunction: function (test) {
        'use strict';
        return !!test;
    },

    /**
     *
     * @param test
     * @returns {boolean}
     */
    multilineFunctionWithComment: function (test) {
        'use strict';
        return !!test;
    },

    // @param test
    // @returns {boolean}
    multilineFunctionWithInlineComment: function (test) {
        'use strict';
        return !!test;
    }
};

App.Models.WithoutProperties = function () {
    'use strict';
};

App.Models.WithoutProperties.prototype = {
    test: 'test'
};

var i,
    inlineProperties;

App.View = function () {
    'use strict';
};

App.View.prototype = {
    test: 'test',

    prototypeProperty: "{xvx}(xvx){vxv}[]" + "}" + '}',

    secondDepth: {
        firstProperty: {
            test: 'test'
        },

        secondProperty: function (test) {
            'use strict';
            return !!test;
        }
    }
};

inlineProperties = {

    inlineProperty: (/[a-z]/).test('{a}[]')
};
for (i in inlineProperties) {
    if (inlineProperties.hasOwnProperty(i)) {
        App.View[i] = inlineProperties[i];
    }
}
