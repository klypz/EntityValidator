var EntityValidator = function(entity, validators) {
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
            var fnVal = EntityValidator.f[methods[j]]
            if (typeof fnVal === 'function') {
                var val = entity[props[i]]
                var obj = rules[props[i]][methods[j]]
                if (!fnVal(val, obj)) {
                    if (result[props[i]] === undefined) {
                        result[props[i]] = {}
                    }
                    if (messages !== undefined && messages !== null && messages[methods[j]] !== null) {
                        result[props[i]][methods[i]] = messages[methods[j]]
                    } else {
                        result[props[i]][methods[i]] = EntityValidator.g.getGlobalization(methods[j])
                    }
                }
            } else {
                throw EntityValidator.g.getGlobalization('ex002')
            }
        }
    }
    return result
}
EntityValidator.config = function(prop, value) {
    if (value === undefined) {
        return EntityValidator.config[prop]
    } else {
        EntityValidator.config[prop] = value
    }
}
EntityValidator.g = {
    getGlobalization: function(code, glob) {
        if (glob === undefined) {
            glob = EntityValidator.config('globalization')
        }
        return EntityValidator.g[glob][code]
    }
}
EntityValidator.f = {}
EntityValidator.g['pt-br'] = {
    ex001: 'Não existe regra de validação',
    ex002: 'Metodo informado não existe',
    'isNotNull': 'Campo obrigatório'
}
EntityValidator.f.isNotNull = function(value, options) {
    if (value === undefined || value === null) {
        return false
    }
    if (typeof value === 'string' && value.trim() === '') {
        return false
    }
    return true
}
EntityValidator.config('globalization', 'pt-br')
