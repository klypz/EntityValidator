EntityValidator.f.isNotNull = function(value, options){
    if(!options){
        return true
    }

    if(value === undefined || value === null){
        return false
    }
    if(typeof value === 'string' && value.trim() === ''){
        return false
    }

    return true
}