EntityValidator.f.size = function(value, options){
    value = value.trim()
    if (value == "")
        return true

    if (options.min != null)
        options.min = parseInt(options.min)

    if (options.max != null)
        options.max = parseInt(options.max)

    var result = true

    if (options.min != null)
        result = result && value.length >= options.min

    if (options.max != null)
        result = result && value.length <= options.max

    return result
}