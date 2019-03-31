/*var confValidation = {
    framework: 'bootstrap',
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    locale: 'es_ES',
    icon: {
        valid: 'zmdi zmdi-check',
        validating: 'zmdi zmdi-close'
    },
    row: {
        valid: 'field-success',
        invalid: 'field-error'
    }
};
let sesion = function(params) {
    console.log(`llamado por ${params.modulo}`);
    let ejecutar = function(result) {
        if(result.error == 204){
            window.location.href = "index.html";
        }else{
            $(".usuario").empty().append(`
                <b>${result.rows.nombre}</b> [${result.rows.email}]
            `);
        }
    }
    $.get("modules/login/validarUsuario.php",{},function(result){
        result['accion'] = ejecutar;
        errorManager(result);
    },"json");
}*/

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

let solicitud = function (params) { 
    $.ajax({
        url: params.url,
        type: params.type || "POST",
        dataType: "json",
        data: params.data,
        contentType: false,
        cache: false,
        processData: false,
        mineType: "multipart/form-data",
        beforeSend: function (param) {

        },
        success: function (result) {
            errorManager(result);
        }
    })
}