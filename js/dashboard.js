import Model from './helper/model.class.js';

let model = new Model();

let maps = model.getMaps();

localStorage.hasOwnProperty('selectedMapId') == true ? localStorage.removeItem("selectedMapId") : null;

let mainArea = d3.select('#mapsContainer');

for(let i in maps) {
	var container = mainArea.append('div').attr('class','col-lg-4 col-md-6 col-sm-12 mb-4')
	var cardContainer = container.append('div').attr('class','card rounded bubbly-button p-1')
	.attr('data-map-id',maps[i].id);
	cardContainer.append('img').attr('class','card-img-top').attr('src',maps[i].imageData.src)
	var cardBody = cardContainer.append('div').attr('class','card-body border-top border-thick')
	cardBody.append('div').attr('class','project-name card-text').text('PROJECT NAME')
	cardBody.append('div').attr('class','last-update card-text').text('Last edited 19 hours ago')

}

d3.selectAll('[data-map-id]').on('click', function() {
	let id = d3.select(this).attr('data-map-id');
	let selectedMapId = localStorage.getItem("selectedMapId") || 0;
	localStorage.setItem("selectedMapId", id);
	//console.log("id: ",id);

	window.location.href = 'draw.html';
})




$(document).ready(function() {


	var $toggleButton = $('.toggle-button'),
    	$menuWrap = $('.menu-wrap'),
    	$sidebarArrow = $('.sidebar-menu-arrow');

	// Hamburger button

	$toggleButton.on('click', function() {
		$(this).toggleClass('button-open');
		$menuWrap.toggleClass('menu-show');
	});

	// Sidebar navigation arrows

	$sidebarArrow.click(function() {
		$(this).next().slideToggle(300);
    });
    
    

    // SAVE INFO BUTTON
    var $saveInfoButton = $('button.save-info');

    $saveInfoButton.on('click', function() {
        window.location.href = 'draw.html'
	})

});



