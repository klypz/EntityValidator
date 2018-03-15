var EntityValidateRule = {}
var EntityValidate = function(entity, validation) {
    if (validation === undefined && entity.DataValidation !== null) {
        validation = entity.DataValidation
    }
    if (validation === undefined) {
        return true
    }
    var props = Object.keys(validation.rule)
    var result = {}
    for (var i = 0; i < props.length; i++) {
        var meth = Object.keys(validation.rule[props[i]])
        for (var j = 0; j < meth.length; j++) {
            if (!EntityValidate[meth[j]](entity[props[i]], validation.rule[props[i]][meth[j]])) {
                if (result[props[i]] === undefined) {
                    result[props[i]] = []
                }
                result[props[i]].push(meth[j])
            }
        }
    }
    return result
}
EntityValidate.notEmpty = function(v, option) {
    return !(v === undefined || v === null || v === '')
}
EntityValidate.cpf = function(v, options) {
    v = v.trim();
    if (v.trim() == "") return true;
    v = v.replace(/[.-]/gi, '');
    if (options) {
        if (v.length != 11 || v == "00000000000" || v == "11111111111" || v == "22222222222" || v == "33333333333" || v == "44444444444" || v == "55555555555" || v == "66666666666" || v == "77777777777" || v == "88888888888" || v == "99999999999") return false;
        add = 0;
        for (i = 0; i < 9; i++) add += parseInt(v.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(v.charAt(9))) return false;
        add = 0;
        for (i = 0; i < 10; i++) add += parseInt(v.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(v.charAt(10))) return false;
        return true;
    }
};
