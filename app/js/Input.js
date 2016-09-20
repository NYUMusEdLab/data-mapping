var Input = function (template, params) {
    this._template = template;
    this._params = {};

    this.initUI();

    for(var paramName in this._template.parameters) {
        if(params) {
            this._params[paramName] = params[paramName];
        } else {
            this._params[paramName] = this._template.parameters[paramName][0];
        }
    }

    this.updateVisualization();
};

Input.prototype = {
    initUI: function() {
        this.domNode = document.createElement('div');
        this.domNode.classList.add('input-card');

        document.body.appendChild(this.domNode);
    },

    updateVisualization: function() {
        // TODO: This will eventually graduate into a fully-fledged class
        this.domNode.innerHTML = '';

        for(var i = 0; i < this._template.paramOrder.length; ++i) {
            var paramName = this._template.paramOrder[i];
            this.domNode.innerHTML += paramName + ': ' + this._params[paramName] + '<br>';
        }
    }
};

// Object.defineProperty(Input.prototype, 'parentNode', {
//     get: function() {
//         return this._parentNode;
//     },
//
//     set: function(value) {
//         if(this._parentNode != value) {
//             this._parentNode.removeChild(this);
//         }
//     }
// });

module.exports = Input;