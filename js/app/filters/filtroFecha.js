/**
 * Created by marco on 08/11/2016.
 */

angular.module("wellnessApp").filter("fechaFilter", function() {
    return function(filas, from, to) {
        result = [];
        if(from != undefined && to != undefined) {
            var entre = new Date(from);
            var y = new Date(to);
            for(i=0; i < filas.length; i++) {
                fecha = new Date(filas[i].fechaNormal);
                if (fecha >= entre && fecha <= y)
                    result.push(filas[i]);
            }
            return result;
        }
        else {
            return filas;
        }
    }
});