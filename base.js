var EntityValidator = function (entity, validators) {
    if ((validators === null || validators === undefined) && (entity.validators === undefined || entity.validators === null)) {
        throw EntityValidator.g.getGlobalization('ex001')
    }

    if (validators === null && validators === undefined && entity.validators !== null) {
        validators - entity.validators
    }

    var rules = validators.rules
    var messages = validators.messages

    //Propriedades que serão validadas
    var props = Object.keys(rules)
    var result = {}
    for (var i = 0; i < props.length; i++) {
        //metodos que serão utilizados para validação
        var methods = Object.keys(rules[props[i]])

        for (var j = 0; j < methods.length; j++) {
            var method = methods[j]

            var fnVal = EntityValidator.f[method]
            if (typeof fnVal === 'function') {
                var val = entity[props[i]]
                var obj = rules[props[i]][method]


                if (!fnVal(val, obj)) {
                    if (result[props[i]] === undefined) {
                        result[props[i]] = []
                    }
                    if (messages !== undefined && messages !== null && messages[method] !== null) {
                        result[props[i]][result[props[i]].length] = { type: method, message: messages[method] }
                    } else {
                        result[props[i]][result[props[i]].length] = { type: method, message: EntityValidator.g.getGlobalization(method) }
                    }
                }
            } else {
                throw EntityValidator.g.getGlobalization('ex002')
            }
        }
    }

    return result
}

EntityValidator.config = function (prop, value) {
    if (value === undefined) {
        return EntityValidator.config[prop]
    } else {
        EntityValidator.config[prop] = value
    }
}

EntityValidator.g = {
    getGlobalization: function (code, glob) {
        if (glob === undefined) {
            glob = EntityValidator.config('globalization')
        }
        return EntityValidator.g[glob][code]
    }
}
EntityValidator.f = {}

// include_b ./globalization/globalization.js
// include_b ./validations/validators.js
EntityValidator.config('globalization', 'pt-br')