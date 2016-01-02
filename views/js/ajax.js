
function get_company(){
	var company_name=$(#ajax).val();
	$.ajax({
		type:'POST',
		data:JSON.stringfy(company_name),
		contentType: 'application/json',
        url: 'http://localhost:3000/dummy',
        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                            process_result(data,text_status);
                        }
	});
}
function process_result(data,text_status){
	$(#testing).html(data);
}