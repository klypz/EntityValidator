EntityValidator.f.regex = function(value, options){
  var rgx = new RegExp(options)
  
  return !rgx.exec(value)
}
