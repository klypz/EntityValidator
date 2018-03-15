EntityValidate.size = function (v, option) {
    v = v.trim();
    if (v == "")
        return true;

    if (option.min != null)
        option.min = parseInt(option.min);

    if (option.max != null)
        option.max = parseInt(option.max);

    var retorno = true;

    if (option.min != null)
        retorno = retorno && v.length >= option.min;

    if (option.max != null)
        retorno = retorno && v.length <= option.max;

    return retorno;
};