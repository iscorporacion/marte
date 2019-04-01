
function hacer(params,result) { 
    // params = parametros de la petición
    // result = resultado de la petición
    // $("#agregarUsuario")[0].reset();
    // $('[name=email]').focus();
    if(result.error == 200){
        window.location.href = result.url;
    }else{
        $('[name=email]').focus();
    }
}
$("#agregarUsuario").formValidation(confValidation)
    .on('success.form.fv', function (e) {
        e.preventDefault();
        solicitud({
            url: "PHP/registraUsuario.php",
            data: new FormData(this),
            loader:"Registrando...!",
            ejecutar:hacer /*quitar si no quiere que ejecute una función después de terminar*/ 
        });
    });