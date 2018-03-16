EntityValidator.f.regex = function(value, options){
  var rgx = new Regex(options)
  
  return rgx.exec(value)
}
