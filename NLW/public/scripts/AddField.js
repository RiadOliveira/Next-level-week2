function clone() {
    const hora = document.querySelector('.schedule-item').cloneNode(true);
    const itens = document.querySelector("#schedule-items");
    var reset = hora.querySelectorAll('input');
 /*   for(var pos in reset) {
        reset[pos].value = ''
    }*/
    reset.forEach(function(x){
        x.value = ''
    })

    itens.appendChild(hora)
}