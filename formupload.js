// A $( document ).ready() block.

$( document ).ready(function() {
    console.log( "ready!" );
	
	// click event for my file upload button
	$('#send').click(function(){
		event.preventDefault();
		
		var form = $('#formupload')[0];
		var data = new FormData(form);
		
		
		// uploads the files using ajax. to not refersh the whole page 
		$.ajax({
           type: "POST",
            enctype: 'multipart/form-data',
            url: "/",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
				// message for suceessful upload
				$("#from_data_res").empty();
                $("#from_data_res").append('Data Successful Sent!');
				
				// periodically checks for new uploaded files
				// gets filenames from the server and displays them
				$.ajax({
					// request to node server
					type: 'GET',
					// string the node server with use to id request actions 
					url:'/logs',
					// if successful in getting filenames from ajax and server
					success: function(data){
						console.log("Got the data", data);
						// empty div so some files do not repeat
						$("#filenames").empty();
						var size = data.length;
						// displays each file name with a delete button 
						data.forEach(function(e){
							$("#filenames").append(e);
							$("#filenames").append('<button class=\'delete\' id='+e+'>Delete</button>');
							$("#filenames").append('<br>');
							$("#filenames").append('<br>');
						});
					},
					error: function(){
						// error message to the div if there was a problem
						$("#list_content").empty();
						$("#list_content").append('Error, Data not received!');
					}
				});
				
			},
			error: function(){
				// message for error on upload
				$("#from_data_res").empty();
                $("#from_data_res").append('Error, Data not sent!');
			}
			
        });
		$('#formupload')[0].reset();
	});
	
	
	
	// periodically checks for new uploaded files
	// gets filenames from the server and displays them
	$.ajax({
		// request to node server
		type: 'GET',
		// string the node server with use to id request actions 
		url:'/logs',
		// if successful in getting filenames from ajax and server
		success: function(data){
			console.log("Got the data", data);
			// empty div so some files do not repeat
			$("#filenames").empty();
			var size = data.length;
			// displays each file name with a delete button 
			data.forEach(function(e){
				$("#filenames").append(e);
				$("#filenames").append('<button class=\'delete\' id='+e+'>Delete</button>');
				$("#filenames").append('<br>');
				$("#filenames").append('<br>');
			});
			
		},
		error: function(){
			// error message to the div if there was a problem
			$("#list_content").empty();
            $("#list_content").append('Error, Data not received!');
		}
	});
	
	
	//delete button, to delete files on the server

	$(document).on('click', ".delete", function() {
		$.ajax({
		// request to node server
		type: 'get',
		// string the node server with use to id request actions 
		url:'/delete',
		data: {
			
			filename: $(this).attr('id')
		},
		// if successful in getting filenames from ajax and server
		success: function(data){
			
			console.log("Got the data", data);
			// empty div so some files do not repeat
			$("#filenames").empty();
			var size = data.length;
			// displays each file name with a delete button 
			data.forEach(function(e){
				$("#filenames").append(e);
				$("#filenames").append('<button class=\'delete\' id='+e+'>Delete</button>');
				$("#filenames").append('<br>');
				$("#filenames").append('<br>');
			});
			
			
			$("#msg").empty();
            $("#msg").append('Success, Data Deleted!');
		},
		error: function(error){
			// error message to the div if there was a problem
			$("#list_content").empty();
			console.log(error);
            $("#list_content").append('Error, Data not Deleted!');
		}
	});
		
		
	});
	
});




/*

var data = new FormData();
        data.append('file', $(this[0].files[0]));
		$.ajax({
            url: './',
            type: 'post',
            contentType: attr('enctype', "multipart/form-data"),
            data: data,
            success: function(data){
                alert(data);
            }
        })
		
		
		 url: '../fileupload',
            type: 'POST',
            contentType: attr('enctype', "multipart/form-data"),
            data:data,
            success: function(data){
                console.log('sent');
            }
		
		*/