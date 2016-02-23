/**
 * Created by Carlos Alexandre on 22/02/2016.
 */
function findCEP(idcep,idrua,idbairro,idcidade,idestado,idnumero,url) {
    //Remove os espaços em braco
    if($.trim($('#'+idcep).val()) != ""){
        $("#ajax-loading").css('display','inline');
        $.ajax({
                url : url+"/"+$('#'+idcep).val().replace("-", ""),/* URL que será chamada */
                type:'GET',
                beforeSend: function(XMLHttpRequest) {
                    $("#ajax-loading").css('display','inline');//Adiciona o Loading
                },
                dataType: 'json',
                failure: function(XMLHttpRequest, textStatus) {
                    alert("Erro, Cep não encontrado"); //Avisa se não achar o CEP
                },
                complete: function(XMLHttpRequest, textStatus) {
                    var data = $.parseJSON(XMLHttpRequest.responseText);
                    if (data.resultado != 0)
                    {
                        //Preenche o fields utilizando JQuery.
                        $('#'+idrua).val(unescape(data.logradouro));
                        $('#'+idbairro).val(unescape(data.bairro));
                        $('#'+idcidade).val(unescape(data.cidade));
                        $('#'+idestado).val(unescape(data.uf));
                        $('#'+idnumero).focus();
                    }
                    $("#ajax-loading").hide(); //Remove o Loading
                }
            }
        );
    }
}
