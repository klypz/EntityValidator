EntityValidator.f.isInt = function(value, options){
    if(!options){
        return true
    }

    if(value === undefined || value === null){
        return true
    }
    var tst = new RegExp(/^\d+$/)
    return  tst.test(value.toString())
}