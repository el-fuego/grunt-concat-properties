var i,
    inlineProperties;

View = function () {
    'use strict';
};

View.prototype = {
    test: 'test'

    // @include prototypeProperties
};

inlineProperties = {
    // @include properties
};
for (i in inlineProperties) {
    if (inlineProperties.hasOwnProperty(i)) {
        View[i] = inlineProperties[i];
    }
}