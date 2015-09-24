!function(){

  function randomIdGen(length, plugin){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1) + (plugin ? '-' + plugin : '-zf-rnd');
  }

  Foundation.GetYoDigits = randomIdGen;
}(window.Foundation);
