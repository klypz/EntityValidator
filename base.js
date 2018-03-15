var EntityValidate = function(entity, validation){
	if(validation === undefined && entity.DataValidation !== null){
  	validation = entity.DataValidation
  }
  
  if(validation === undefined){
  	return true
  }
  
  var props = Object.keys(validation.rule)
  var result = {}
  for(var i = 0; i < props.length; i++){
  	var meth = Object.keys(validation.rule[props[i]])
    for(var j = 0; j < meth.length; j++){
    	if(!EntityValidate[meth[j]](entity[props[i]], validation.rule[props[i]][meth[j]])){
      	if(result[props[i]] === undefined){
        	result[props[i]] = []
        }
        result[props[i]].push(meth[j])
      }
    }
  }
  
  return result
}

// include_b ./validators/validators.js