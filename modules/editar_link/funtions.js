
$("body").on("click",".btnEditar",function(e){
    e.preventDefault();
    let icono = $(this).data("icono");
    let TituloLink = $(this).data("TituloLink");
    let urlink = $(this).data("urlink");
    let Descripcionlink = $(this).data("Descripcionlink");
   
    $("[name=icon]").val(icono);
    $("[name=Titulo]").val(TituloLink);
    $("[name=url]").val(urlink);
    $("[name=Descripcion]").val(Descripcionlink);
    $('[name=icon]').focus();  
    

});