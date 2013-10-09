var i,
    inlineProperties;

View = function () {
    'use strict';
};

View.prototype = {
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
        View[i] = inlineProperties[i];
    }
}
