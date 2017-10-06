$(document).ready(function(){

    $('#tabinsert').click(function(){
	$('#updateOne, #update, #findOne, #findall, #delete').hide();
	$('li').removeClass('is-active is-primary is-focused');
	$(this).addClass('is-active is-primary is-focused');
    $('#insert').show('slow');
    });
    
    $('#tabupdateOne').click(function(){
	$('#insert, #update, #findOne, #findall, #delete').hide();
	$('li').removeClass('is-active is-primary is-focused');
	$(this).addClass('is-active is-primary is-focused');
    $('#updateOne').show('slow');	
    });
    
    $('#tabupdateMany').click(function(){
	$('#updateOne, #insert, #findOne, #findall, #delete').hide();
	$('li').removeClass('is-active is-primary is-focused');
	$(this).addClass('is-active is-primary is-focused');
    $('#update').show('slow');	
    });

    $('#tabfindOne').click(function(){
	$('#updateOne, #update, #insert, #findall, #delete').hide();
	$('li').removeClass('is-active is-primary is-focused');
	$(this).addClass('is-active is-primary is-focused');
    $('#findOne').show('slow');	
    });
    
    $('#tabfindMany').click(function(){
	$('#updateOne, #update, #findOne, #insert, #delete').hide();
	$('li').removeClass('is-active is-primary is-focused');
	$(this).addClass('is-active is-primary is-focused');
    $('#findall').show('slow');	
    });
    
    $('#tabdelete').click(function(){
	$('#updateOne, #update, #findOne, #findall, #insert').hide();
	$('li').removeClass('is-active is-primary is-focused');
	$(this).addClass('is-active is-primary is-focused');
    $('#delete').show('slow');	
    });
    
    $('#insertButton').click(function(e) {

        var name = $("#insert input[name='name']").val();
        var desc = $("#insert textarea[name='desc']").val();
        var rating = $("#insert input[name='rating']").val();
        var stars = $("#insert input[name='stars']").val();
        var date = $("#insert input[name='date']").val();
    
    $.ajax({
      url: '/mongo/insert',
      data: {name: name, desc: desc, rating: rating, stars: stars, date: date},
      type: 'POST',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          alert(data.Error);
        }else{
            $('#output').html(JSON.stringify(data)); 
        }
      }
    });
  });
    
    $('#updateOneButton').click(function(e) {

        var name = $("#updateOne input[name='name']").val();
        var desc = $("#updateOne textarea[name='desc']").val();

    
    $.ajax({
      url: '/mongo/updateOne',
      data: {name: name, desc: desc},
      type: 'POST',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          alert(data.Error);
        }else{
            $('#output').html(JSON.stringify(data)); 
        }
      }
    });
  });
    
    $('#updateButton').click(function(e) {

        var rating = $("#update input[name='rating']").val();
        var stars = $("#update input[name='stars']").val();
    
    $.ajax({
      url: '/mongo/update',
      data: {rating: rating, stars: stars},
      type: 'POST',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          alert(data.Error);
        }else{
            $('#output').html(JSON.stringify(data)); 
        }
      }
    });
  });
    
    $('#findOneButton').click(function(e) {

        var name = $("#findOne input[name='name']").val();
    
    $.ajax({
      url: '/mongo/findone',
      data: {name: name},
      type: 'GET',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          alert(data.Error);
        }else{
            $('#output').html(JSON.stringify(data)); 
        }
      }
    });
  });
    
    $('#findManyButton').click(function(e) {

        var rating = $("#findall input[name='rating']").val();
    
    $.ajax({
      url: '/mongo/findall',
      data: {rating: rating},
      type: 'GET',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          alert(data.Error);
        }else{
            $('#output').html(JSON.stringify(data)); 
        }
      }
    });
  });
    
    $('#deleteButton').click(function(e) {

        var name = $("#delete input[name='name']").val();

    $.ajax({
      url: '/mongo/delete',
      data: {name: name},
      type: 'GET',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          alert(data.Error);
        }else{
            $('#output').html(JSON.stringify(data)); 
        }
      }
    });
  });
    
});
