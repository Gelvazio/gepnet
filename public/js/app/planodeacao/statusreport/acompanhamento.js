$(function () {
    var
        grid = null,
        lastsel = null,
        gridEnd = null,
        colModel = null,
        colNames = null,
        actions = {
            pesquisar: {
                form: $("form#form-pesquisar"),
                url: base_url + "/planodeacao/statusrepot/pesquisarjson?" + $("form#form-pesquisar").serialize()
            },
            detalhar: {
                dialog: $('#dialog-detalhar')
            }
        };


    actions.pesquisar.form.on('submit', function (e) {

        e.preventDefault();
        console.log($("#idacompanhamento").val());

        window.location.href = base_url + "/planodeacao/statusreport/detalhar/idplanodeacao/" + $("#idplanodeacao").val() + "/idstatusreport/" + $("#idstatusreport").val();
//        grid.setGridParam({
//            url: base_url + "/planodeacao/statusreport/pesquisarjson?" + $("form#form-pesquisar").serialize(),
//            page: 1
//        }).trigger("reloadGrid");
//        //$("a.actionfrm").tooltip();

    });
});