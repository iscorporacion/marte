$(document).ready(async function () {
    async function listarLinks(params) {
        await solicitud({
            url: "PHP/listarLinks.php",
            loader: "Cargando links...!",
            ejecutar: hacer, /*quitar si no quiere que ejecute una función después de terminar*/
            loaderStop:true
        });        
    }
    await sesion({ href: true, loaderStop:true });
    async function hacer(result, params) {
        let data = await result.rows;
        if (data.length) {
            data = await data.map(function (link, i) {
                return `
                    <div class="col-md-2 p-2">
                        <div class="card card-block ${data.length > 6 ? "h-100" : ""}">
                            <div class="card-body">
                                <span class="card-title blue-text"><img class="pt-0" src="http://www.google.com/s2/favicons?domain=${link.url}"> ${link.titulo}</span>
                                <hr>
                                <p class="card-text text-justify">${link.descripcion}</p>
                                <a href="${link.url}" target="_blank" class="px-2 fa-lg li-ic"><i class="fas fa-share-alt"></i> Ir</a>
                                <a class="px-2 fa-lg tw-ic pull-right btnDelete" data-id="${link.id}"><i class="fas fa-trash red-text"></i></a>
                                <a href="../editar_link" class="px-2 fa-lg tw-ic pull-right btnEdit" data-id="${link.id}"><i class="fas fa-edit orange-text"></i></a>
                            </div>
                        </div>
                    </div>
                `
            });
            await $(".mislinks").empty().append(data);
            await $(".mislinks").getNiceScroll().resize();
            await loader("close");
        }else{
            await loader("close");
        }
    }
    await listarLinks();
    $(".mislinks").niceScroll({
        cursorcolor: 'rgba(194, 194, 194, 1)',
        cursorborder: 0,
        cursorborderradius: 0,
        cursorwidth: "5px",
        bouncescroll: true,
        mousescrollstep: 100,
        autohidemode: true
    });
    $("body").on("click",".btnDelete",async function (e) {
        let id = $(this).data("id");
        let formData = new FormData();
        formData.append("id",id);
        await solicitud({
            url: "PHP/deleteLinks.php",
            loader: "Eliminando link...!",
            data:formData,
            ejecutar: listarLinks, /*quitar si no quiere que ejecute una función después de terminar*/
            loaderStop:true
        });
    });
    $("body").on("click",".btnEdit",async function (e) {
        let id = $(this).data("id");
        localStorage.setItem("idLink",id);
    });
});