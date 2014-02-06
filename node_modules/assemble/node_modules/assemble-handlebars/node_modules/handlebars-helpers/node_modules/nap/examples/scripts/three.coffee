alert 'Refrigerator'
setTimeout (->
  el = document.getElementById('container')
  el.innerHTML = JST['make_it_rain']()
), 500