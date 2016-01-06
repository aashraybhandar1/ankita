$(function(){
 		$('#ajax').on('keyup', function(e){
   		if($(this).val().length != 0) {
   			console.log("In if");
     		var parameters = { search: $(this).val() };
       		$.get( '/search',parameters, function(data) {
       				$('#testing').html("");
       				$('#testing').append("<ul class='list_of_companies'>");
       				for(var i=0;i<data.length;i++){
       					console.log("I'm in for");
       					$('#testing ul').append(
    						$('<li>').attr('class', 'full_list').append(data[i])
								);
       					}
       				$(".full_list").css("background-color", "yellow");	
					});
       				$( "#testing" ).on("click","li", function() {    
       					$('#ajax').val(($(this).text()));
       					$('#testing').html("");
    				});
   				};
   				if($(this).val().length == 0){
   					$('#testing').html("");
   					};
   					 /*console.log("In else");
   					 var parameters = { search: $(this).val() };
       						$.get( '/search',parameters, function(data) {
       						$('#testing').html(data);
     					});*/
 				});
			});


var flag=0;

  $(function(){

    $('#button').on('click',function(){
      if(($('#ajax').val() == "")||($('#ratio').val()=="Add a stat")){
        //console.log($('#ajax').text());
        alert("Fuck off mate fill all the fields");
      }
      else{
        
        $('#first_answer').html("");
        var numItems = $('.ratio_class').length ;
        var temp=("ratio"+numItems);
        if($(temp).val !="Add a stat"){
          var parameters={'company_name':$('#ajax').val(),'ratio':$('#ratio').val(),'size_tot':numItems,'chain':''};
          for(var i=2;i<=numItems;i++){
            var temp="ratio"+i;
            var temp2="#ratio"+i;
            parameters[temp]=$(temp2).val();
            parameters['chain']=parameters['chain']+', `'+$(temp2).val()+'`';
          }
          parameters['chain']='`'+parameters['ratio']+'`'+parameters['chain'];
          console.log(parameters);

        }
        else{

          var parameters={'company_name':$('#ajax').val(),'ratio':$('#ratio').val(),'size_tot':(numItems-1)};
          for(var i=2;i<numItems;i++){
            var temp="ratio"+i;
            var temp2="#ratio"+i;
            parameters[temp]=$(temp2).val();

          }

          console.log(parameters);
        }
        
        console.log(parameters);
        $.get('/matrix_eval',parameters,function(data){
          var result=data;

          $('#first_answer').html(data);
          console.log(data);
          $('#first_answer').append("<div id='bar'> </div>");
          
          $('#bar').css("color","green");
          $('#bar').html(data);
          var fore={
            foreColor : 'green',
            colorRange:true
            
          };
          $('#bar').barIndicator(fore);
          console.log(flag);
          if(flag==1){
          $.get('/snipet',function(data2){
            
            $('#second').html(data2);
            //$('#second').append("<button id='button2'> button 2 </button>")
          });
          };
        })
        flag ++;
        console.log("Yolo good job");
      }
    });
  });

$(function(){
  $('#ratio').on('click',function(){

      if($('#ratio').val() != "Add a stat"){

        $('#first').append("<select name='ratio2' class='ratio_class' id='ratio2' placeholder='Add a stat'>");
        $('#ratio2').append("<option value='Add a stat'> </option>");
        $('#ratio2').append("<option value='ratio1'>ratio1</option>");
        $('#ratio2').append("<option value='ratio2'>ratio2</option>");
        $('#ratio2').append("<option value='ratio3'>ratio3</option>");
        $('#ratio2').append("<option value='ratio4'>ratio4</option>");
        
        //console.log(numItems);
      }

  });
});



/**/