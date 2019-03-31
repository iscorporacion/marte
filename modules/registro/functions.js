
let mensaje = function(params) {
    if (params.error) {
        alert(`${params.type} : ${params.message}`);
    }else{
        alert(`${params}`); 
    }
}
let errorManager = function(params) {
    switch(params.error) {
        case 200:
            if(params.accion){
                params.accion(params);
            }else{
                mensaje(params);
            }
            break;
        case 204:
            if(params.accion){
                params.accion(params);
            }
            break;
        case 500:
            mensaje(params);
            break;
        default:
            mensaje("Error desconocido");
    }
}
let resetForm = function(result){
    $("#agregarUsuario")[0].reset();
    $("[name=nombre]").val("");
    $("[name=email]").val("");
    $("[name=contra]").val("");
    $('[name=email]').focus(); 
    mensaje(result);
}

$("#agregarUsuario").submit(function(e){
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type: "POST",
        url: "../registro/PHP/registraUsuario.php",
        data: data,
        success: function(result){
            result['accion'] = resetForm;
            errorManager(result);
        },
        dataType: "json"
    });
    
});