# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
# = require ./shared/shared
update_site = (event) ->
	n=event.data.c
	i=event.data.i
	site_num=$('#input'+i).val()
	$.ajax '/sites/'+i+'.json',
		type: 'PATCH'
		dataType: 'json'
		data: { site: { number: site_num, x: event.data.x, y: event.data.y }}
		error: (xhr) ->
			alert "AJAX Error: "+ xhr.statusText + ", Could not update site number " + site_num
		success: (result) ->
			siteID='[data-sid='+i+']'
			$(siteID).removeClass('site_tmpmark')
			$(siteID).addClass('site_mark')
			$(siteID).text(site_num)
			$(siteID).data('startPos', { x:  -1, y: -1, sx: -1, sy: -1 } )
			$('#form'+i).fadeOut()
create_miniform = () ->
		x = $('.site').length
		if (x > 0)
			sitenum=parseInt($('.site').last().data('sug_num'))+1
			console.log('Calculated sitenum from existing miniforms: '+sitenum)
		else
			sitenum=parseInt($('#mapcontainer').data('num'))
			console.log('Got sitenum from mapcontainer data: '+sitenum)
		miniform = document.createElement('span')
		$(miniform).data('sug_num',sitenum)
		$(miniform).addClass('site newform')
		$(miniform).html('position')
		$(miniform).css('display','none')
		$("<div id='miniforms'></div>").insertAfter($("#mapcontainer"))
		$("#miniforms").append(miniform)

# map page save button action
save_function = (event) ->
		n=event.data.c
		site_num=$('#input'+n).val()
		$.ajax '/sites.json',
			type: 'POST'
			data: { site: { number: site_num, x: event.data.x, y: event.data.y }}
			error: (xhr) ->
				alert( "An error occured: "+ xhr.statusText +". The site number " + site_num + " already exists. ")
			success: (result) ->
				siteID='#site_mark'+n;
				i=result.id
				$(siteID).attr('id','site_mark'+i)
				siteID='#site_mark'+i;
				$(siteID).addClass('site_mark site_vacant_mark draggable');
				$(siteID).data('startPos', { x:  $(siteID).css('left'), y: $(siteID).css('top'), sx: $(siteID).css('left'), sy: $(siteID).css('top') } )
				$(siteID).draggable({
					containment: '#mapcontainer',
					cursor: 'move',
					start: (e, ui) ->
						$(this).data('startPos', { x:  ui.position.left, y: ui.position.top, sx: $(this).css('left'), sy: $(this).css('top') } )
						$(this).data('id', $(this).text())
					drag: ( event, ui ) ->
						$(this).css("background-color", "blue")
						return true
				})
				$(siteID).attr('data-sid',i)
				$(siteID).text(site_num)
				$('#form'+n).fadeOut()

create_new_buttons = (relX,relY,i,n) ->
	bar=$('<div>').addClass('btn-toolbar text-center')
	# save button
	btn1=$('<input type="button" value="save" class="btn btn-xs btn-primary">')
	btn1.className='site'
	$(btn1).click({x: relX, y: relY, c: i, n: n}, save_function)
	# cancel button
	btn2 = $('<input type="button" value="cancel" class="btn btn-xs btn-primary"></input>')
	$(btn2).attr('id','cbtn'+i)
	$(btn2).text('cancel')
	$(btn2).click ->
		n=$(this).parents('.site').attr('id').substring(4)
		siteID='#site_mark'+n
		$(siteID).remove()
		$(this).parents('span.site').remove()
	$(bar).append(btn1).append(btn2)
	return bar

create_buttons = (x,y,n,i) ->
	bar=$('<div>').addClass('btn-toolbar text-center')
	# save button
	btn1=$('<input type="button" value="update" class="btn btn-xs btn-primary">')
	$(btn1).text('save')
	$(btn1).click({x: x, y: y, c: n, i: i}, update_site)
	# cancel button
	btn2 = $('<input type="button" value="cancel" class="btn btn-xs btn-primary"></input>')
	btn2.id='cbtn'+n
	$(btn2).click ->
		siteID='#site_mark'+i
		# get the start position which is set at the start of the drag
		getx=$(siteID).data('startPos').x
		gety=$(siteID).data('startPos').y
		$(siteID).css({left: getx, top: gety, background: 'white', color: 'blue'})
		$(this).parents('.site').remove()
	$(bar).append(btn1).append(btn2)
	return bar

create_update_box = (i,n,x,y) ->
	if $('.site#form'+i).length > 0
		ubox = $('.site#form'+i)[0]
		$('.site#form'+i+' #pos').html('X: '+x+'<br>Y: '+y)
		$(ubox).css('display','inline-block')
		v=$(ubox).data('visits') || 0
		$(ubox).data('visits',v+1)
		return
	else
		ubox = $('<span>').addClass('site').attr('id',"form"+i)
		ubox.data('visits',0)
		miniform = $('<div>').addClass('panel panel-default')
		$(ubox).append(miniform)
		# text field
		number_field = $('<input>')
		$(number_field).attr({
		'id': 'input'+i,
		'type': 'text',
		'size': 5,
		'value': n
		})
		bar=create_buttons(x,y,n,i)

		# put it all in the miniform underneath the container div
		dheading=$('<div>').addClass('panel-heading').text('Move')

		dpos= $('<div>').addClass('text-small').attr('id','pos').html('X: '+x+'<br>Y: '+y)
		sitenum=$('<div>').text('Number: ').append(number_field)
		dbody=$('<div>').addClass('panel-body').append(dpos).append(sitenum)

		$(miniform).append(dheading).append(dbody).append(bar)
		$("#miniforms").append(ubox)

$(document).on "page:change", ->
	$('[data-toggle="tooltip"]').tooltip()
	$('div.rside').css(display: 'block')
	$('#account_logo').change ->
		readLogoURL(this)
	$('#account_groundmap').change ->
		readGroundmapURL(this)
	$('#previewbtn').click ->
		$('#preview').data('path', 'value')
		$('#preview').text('hello')
	$('.draggable').draggable({
		containment: '#linkedmap',
		cursor: 'move',
		start: (e, ui) ->
			if !$(this).data('startPos') || $(this).data('startPos') == -1
				$(this).data('startPos', { x:  ui.position.left, y: ui.position.top, sx: $(this).css('left'), sy: $(this).css('top') } )
			#console.log("Drag start: "+JSON.stringify($(this).data('startPos')))
			$(this).data('id', $(this).text())
		drag: ( event, ui ) ->
			$('.position').text(JSON.stringify(ui.position))
			$(this).css("background-color", "blue")
			return true
	})
	# offset is top,left on window while position is top,left of container
	$('.droppable').droppable({ 
		accept: ".draggable", 
		drop: ( event, ui ) ->
			num=parseInt(ui.draggable.data('id'))
			i=parseInt(ui.draggable.data('sid'))
			startX=ui.draggable.data('startPos').x
			startY=ui.draggable.data('startPos').y

			$(ui.draggable).css("background-color", "blue")
			$(ui.draggable).css("color", "white")
			offset = $(this).offset()

			relX = ui.position.left
			relY = ui.position.top
			create_update_box(i,num,ui.position.left,ui.position.top)
			return true
	})
	# pan image
	# TODO update crop image or change to map page
	$(".admin #panimage").draggable({
		stop: (e, ui) ->
			if confirm('Save?')
				a_img_type=$('#account_img_type').val()
				$.ajax '/campground/pan.json',
					type: 'POST'
					data: { account: { pan_left: ui.position.left, pan_top: ui.position.top, img_type: a_img_type }}
			else
				$(this).css({ top: 0 + 'px', left: 0 + 'px' })
	})
	# New site mark
	# create a hidden miniform to use for click or drag events
	# TODO make this happen only on map page
	# alert('should only be once')
	create_miniform()
	$(".admin #linkedmap").click (e) ->
		sitenum=parseInt($('.site.newform').last().data('sug_num'))+1
		offset = $(this).offset()
		pos = $(this).position()
		#console.log(JSON.stringify($(this).position()))
		#console.log(JSON.stringify($(this).offset()))
		#console.log(JSON.stringify(e.pageX))
		centerDot = get_centerdot()
		relX = Math.round(e.pageX - offset.left - centerDot)
		relY = Math.round(e.pageY - offset.top - centerDot)
		# new site marker on diagram
		tmpmark = document.createElement('div')
		new_id = new Date().getTime()
		tmpmark.id='site_mark'+new_id
		tmpmark.className='site_mark site_new_mark'
		$(tmpmark).css({'left':relX, 'top':relY, 'position':'absolute'})
		$('#mapcontainer').append(tmpmark)
		# text field
		number_field = document.createElement('input');
		$(number_field).attr({
			'id': 'input'+new_id,
			'type': 'text',
			'size': 5,
			'value': sitenum
		})

		bar=create_new_buttons(relX,relY,new_id,sitenum)

		miniform = $('<span>').addClass('site newform').attr('id',"form"+new_id)
		$(miniform).data('sug_num',sitenum)
		mpanel = $('<div>').addClass('panel panel-default')
		$(miniform).append(mpanel)
		dheading=$('<div>').addClass('panel-heading').text('New')
		dpos= $('<div>').addClass('text-small').attr('id','pos').html('X: '+relX+'<br>Y: '+relY)
		sitenum=$('<div>').text('Number: ').append(number_field)
		dbody=$('<div>').addClass('panel-body').append(dpos).append(sitenum)
		$(mpanel).append(dheading).append(dbody).append(bar)
		$("#miniforms").append(miniform)
		return
	return
check_type_and_size = (f) ->
	filename = f.name

	patt = new RegExp(/\.(png|jpeg|jpg|gif)$/i)
	if ( !patt.test(filename) )
		return filename+" Unsupported Image extension\n"

	sizeInKiB = (f.size / 1024)
	sizeInMiB = (sizeInKiB / 1024).toFixed(2)
	if sizeInMiB > 3
			return (sizeInMiB+"M should be less than 3 MB")
	return "ok"
readLogoURL = (input) ->
	x=$(input).parent().find('.account_errors')
	if (input.files && input.files[0])
		thefile=input.files[0]
		res = check_type_and_size(thefile)
		errspan=$(x)
		if res == 'ok'
			dangerindicator.clearDanger(errspan)
		else
			dangerindicator.setDanger(errspan,res)
		reader = new FileReader()
		reader.onload = (e) ->
			$('#account_logo_image').attr('src', e.target.result)
		reader.readAsDataURL(input.files[0])
readGroundmapURL = (input) ->
	x=$(input).parent().find('.account_errors')
	if (input.files && input.files[0])
		thefile=input.files[0]
		res = check_type_and_size(thefile)
		errspan=$(x)
		if res == 'ok'
			dangerindicator.clearDanger(errspan)
		else
			dangerindicator.setDanger(errspan,res)
		reader = new FileReader()
		reader.onload = (e) ->
			$('#account_groundmap_image').attr('src', e.target.result)
		reader.readAsDataURL(input.files[0])
get_centerdot = () ->
	centerDot = ($('.site_mark:first').outerWidth())/(2)
	return centerDot
