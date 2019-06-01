$(document).ready(function(){

    $("input").keyup(function(event){
        if(event.keyCode == 13){
            $("button").click();
        }
    });

	$("button").on('click', () => {

		$('#store').load("https://juniordnts.github.io/Request/resumo.txt", function(responseTxt, statusTxt, xhr){

            var data = $("#store").text();
            var dataMod = data.split("**");
            console.log(dataMod);
            var valor;
            var render = '';
            var renderCount = 0;

            for (var e = 0; e < dataMod.length; e++) {
                console.log($('input'))
                valor = dataMod[e].search($('input').val());
                if (valor >= 0) {
                    render = render + dataMod[e];
                    if (renderCount >= -1 ) {
                        render = render + '\n \n -------------------------------- \n \n';
                    };

                    renderCount++;
                }
            }

            $("#content").text(render);

            if(statusTxt == "success"){

            	$(".reply").slideDown().text('Request success');
            	$(".box").slideDown();

                if(render != ''){
                    $(".reply").addClass('done');
                    $(".fa").addClass('fa-check-circle');
                    $(".reply").append('. Reply: ' + renderCount);
                } else {
                    $(".reply").addClass('erro');
                    $(".fa").addClass('fa-times-circle');
                    $(".reply").append('. No reply');
                }
                

            }
            if(statusTxt == "error"){
                $(".fa").addClass('fa-times-circle');
            	$(".reply").addClass('erro').slideDown().text('Algo deu errado');
            }

            $(".reply").delay(3000).slideUp();

            
        });

		// $.get("https://juniordnts.github.io/Request/resumo.txt", function(data, status){
  //       	$("pre").text("data");
  //       	$(".box").show();
  //   	});

	});
})