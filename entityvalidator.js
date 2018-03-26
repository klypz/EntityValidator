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
                        result[props[i]][methods[j]] = messages[methods[j]]
                    } else {
                        result[props[i]][methods[j]] = EntityValidator.g.getGlobalization(methods[j])
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
    'isNotNull': 'Campo obrigatório',
    'regex': 'Valor não obedeceu a regra'
}
EntityValidator.f.isNotNull = function(value, options) {
    if (!options) {
        return true
    }
    if (value === undefined || value === null) {
        return false
    }
    if (typeof value === 'string' && value.trim() === '') {
        return false
    }
    return true
}
EntityValidator.f.regex = function(value, options) {
    if (value === undefined || value === null) {
        return true
    }
    var rgx = new RegExp(options)
    return rgx.test(value)
}
EntityValidator.f.isInt = function(value, options) {
    if (!options) {
        return true
    }
    if (value === undefined || value === null) {
        return true
    }
    var tst = new RegExp(/^\d+$/)
    return tst.test(value.toString())
}
EntityValidator.f.email = function(value, options) {
    if (value == null || value == '') {
        return true
    }
    var exp = new RegExp("[A-Za-z0-9\\._-]+@[A-Za-z0-9]+\\.[A-Za-z]+");
    var data = value.trim();
    if (options) {
        return exp.exec(data);
    } else {
        return true;
    }
}
EntityValidator.f.size = function(value, options) {
    value = value.trim()
    if (value == "") return true
    if (options.min != null) options.min = parseInt(options.min)
    if (options.max != null) options.max = parseInt(options.max)
    var result = true
    if (options.min != null) result = result && value.length >= options.min
    if (options.max != null) result = result && value.length <= options.max
    return result
}
EntityValidator.f.cpf = function(value, options) {
    if (value.trim() == "") return true;
    value = value.trim();
    value = replaceAll(replaceAll(value, '.', ''), '-', '');
    if (options) {
        if (value.length != 11 || value == "00000000000" || value == "11111111111" || value == "22222222222" || value == "33333333333" || value == "44444444444" || value == "55555555555" || value == "66666666666" || value == "77777777777" || value == "88888888888" || value == "99999999999") {
            return false;
        }
        add = 0;
        for (i = 0; i < 9; i++) {
            add += parseInt(value.charAt(i)) * (10 - i);
        }
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) {
            rev = 0;
        }
        if (rev != parseInt(value.charAt(9))) {
            return false;
        }
        add = 0;
        for (i = 0; i < 10; i++) {
            add += parseInt(value.charAt(i)) * (11 - i);
        }
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) {
            rev = 0;
        }
        if (rev != parseInt(value.charAt(10))) {
            return false;
        }
        return true;
    }
}
EntityValidator.config('globalization', 'pt-br')
