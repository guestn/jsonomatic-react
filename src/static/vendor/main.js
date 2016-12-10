
$(document).ready(function(){
	
	console.log('yo yo');

	/*ace editor setup*/
/*
	var editor = ace.edit('editor');
	editor.setTheme('ace/theme/tomorrow');
	editor.getSession().setMode('ace/mode/javascript');
	editor.setAutoScrollEditorIntoView(true);
	
	sectionWidth = $('#editorContainer').width();

	$('#editorContainer').resizable({

      maxHeight: 1000,
      maxWidth: sectionWidth,
      minHeight: 300,
      minWidth: sectionWidth

    });
*/

	/*slide utilbox*/
	$('aside.right').on('click', function(e){
		$('').toggleClass('slideIn');
	});
	
	$('aside.right').on('click',function(){
		$('body').toggleClass('menu-open');
	})
	
	/*set up repeats*/
/*
	
	$('#repeatsRange').on('change',function(){
		console.log($(this).val())
		$('#repeats').val($(this).val())
	})
	
*/
	var repeatsRange = document.getElementById('repeatsRange')
	var repeatsInput = document.getElementById('repeats')
	var buttonGenerate = document.getElementById('buttonGenerate')

/*
	repeatsRange.addEventListener('input', function() {
		repeatsInput.value = parseInt(this.value);
	}, false);

	repeatsInput.addEventListener('input', function() {
		repeatsRange.value = parseInt(this.value)
	}, false);	

	
*/

	/*generate objects*/
	
	function displayMessage(msg) {

		$('#statusBar').fadeOut(500).stop().text(msg).fadeIn(1000).delay(4000).fadeOut(1000);
	}
	
	$("#buttonGenerate").on('click', function(e){
		e.preventDefault;
		$('#outputPane').val('generating...');
		
		/*get all the relevant values from the editor and input box*/
		var output = editor.getValue();
		var Jobj = JSON.stringify(output)
		var output = output.trim();		
		var repeats = $('#repeats').val();
		
		/*fire it to the backend*/
	    $.ajax({
		  type: "POST",
		  url: '/submit',
		  data: {output: output, repeats: repeats},
		  //success: success,
		  dataType: 'text'
		}).success(function(data){
			console.log(data);
			data = JSON.parse(data);
			data = JSON.stringify(data, null, 4);
			$('#outputPane').val(data);
			
			var msg = repeats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' objects added successfully'
			displayMessage(msg);
		});
	    
	});
	
	
	/*select output*/
	$('#buttonSelectAll').on('click', function(){
		$('#outputPane').select();
	});
	
	$('#buttonCopyClipboard').on('click',function(){
		$('#outputPane').select();
		document.execCommand("copy");
		displayMessage('Copied to Clipboard!');

	});
	
	$('#buttonDownloadJSON').on('click',function(){
		var text = $('#outputPane').val();
		saveTextAs(text, 'object.json');
		displayMessage('Downloaded as object.json');

	});


	/*smoothscroll*/
	$(function() {
		  $('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
		    }
		  });
		});
		
	
	/*animated text pre boxes*/
	var str = '<p>> "name": { "first":"&lt;%FIRSTNAME%&gt;", "last":"&lt;%LASTNAME%&gt;"},</p>',
    i = 0,
    isTag,
    text;

	function type() {
	    text = str.slice(0, ++i);
	    if (text === str) return;
	    
	    $('.explainBox').html(text);
	    var char = text.slice(-1);
	    if( char === '<' ) isTag = true;
	    if( char === '>' ) isTag = false;
	
	    if (isTag) return type();
	    setTimeout(type, 80);
	};
	type();


});

