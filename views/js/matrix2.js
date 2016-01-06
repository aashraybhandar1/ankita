$(function(){
    $('#ajax2').on('keyup', function(e){
      if($(this).val().length != 0) {
        console.log("In ajax2");
        var parameters = { search: $(this).val() };
          $.get( '/search',parameters, function(data) {
              $('#testing2').html("");
              $('#testing2').append("<ul class='list_of_companies'>");
              for(var i=0;i<data.length;i++){
                console.log("I'm in for");
                $('#testing2 ul').append(
                $('<li>').attr('class', 'full_list').append(data[i])
                );
                }
              $(".full_list").css("background-color", "yellow");  
          });
              $( "#testing2" ).on("click","li", function() {    
                $('#ajax2').val(($(this).text()));
                $('#testing2').html("");
            });
          };
          if($(this).val().length == 0){
            $('#testing2').html("");
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

    $('#button2').on('click',function(){
      console.log("button 2");
      if(($('#ajax2').val() == "")||($('#ratio2').val()=="Add a stat")){
        //console.log($('#ajax').text());
        alert("Fuck off mate fill all the fields");
      }
      else{
        
        $('#second_answer').html("");
        
        var parameters={'company_name':$('#ajax2').val(),'ratio':$('#ratio2').val()};
        console.log(parameters);
        $.get('/matrix_eval',parameters,function(data){
          var result=data;

          $('#second_answer').html(data);
         
          $('#second_answer').append("<div id='bar2'> </div>");
          
          $('#bar2').css("color","green");
          $('#bar2').html(data);
          var fore={
            foreColor : 'green',
            colorRange:true
            
          };
          $('#bar2').barIndicator(fore);
          console.log(flag);
          if(flag==1){
          $.get('/snipet',function(data2){
            
            $('#third').html(data2);
            //$('#third').append("<button id='button3'> button 3 </button>")
          });
          };
        })
        flag ++;
        console.log("Yolo good job");
      }
    });
  });