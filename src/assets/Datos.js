function ValorElementId(id) {
    return document.getElementById(id).value;
}
function FechaFormato(fecha) {
    var
    patron = /-/g,
    nuevoValor    = "/",
    FechaFinal = fecha.replace(patron, nuevoValor);
    return FechaFinal
}
function invertir(cadena) {
    var x = cadena.length;
    var cadenaInvertida = "";   
    while (x>=0) {
      cadenaInvertida = cadenaInvertida + cadena.charAt(x);
      x--;
    }
    return cadenaInvertida;
}
function formato(string){
    // return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    var info = string.split('-');
    return info[1] + '/' + info[0] + '/' + info[2];
}
function fechaAñoMesDia(string){
    // return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    var info = string.split('/');
    return info[2] + '-' + info[0] + '-' + info[1];
}
function convertDateFormat(string) {
    var info = string.split('-');
    return info[1] + '/' + info[2] + '/' + info[0];
  }