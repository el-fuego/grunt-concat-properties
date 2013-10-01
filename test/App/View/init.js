var i,
    inlineProperties;

App.View = function () {
    'use strict';
};

App.View.prototype = {
    test: 'test'

    // @include prototypeProperties
};

inlineProperties = {
    // @include properties
};
for (i in inlineProperties) {
    if (inlineProperties.hasOwnProperty(i)) {
        App.View[i] = inlineProperties[i];
    }
}