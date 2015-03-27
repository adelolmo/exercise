var availableExerciseList = [
{name:"plank", duration:5},
{name:"side_plank_right", duration:5},
{name:"side_plank_left", duration:5}
];

// Only needed if you want to fire a callback
window.addEventListener('push', onLoadPage);

function onLoadPage (argument) {
    var viewName = document.getElementById('viewName').innerHTML;
    console.log('viewName: ' + viewName);

    if(viewName == 'create'){
    	create.showExercises();
		selector.ready();
	}
}

var create = {

	initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		console.log('bind events');
		document.addEventListener('deviceready', this.onDeviceReady, false);
		viewName = document.querySelector("#viewName");
		console.log('viewName: ' + viewName);
	},	

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {        
    	app.receivedEvent('deviceready');
    	if(viewName == 'create'){    		
    		app.showExercises();
    	}
    },

    receivedEvent: function(id) {
    	console.log('Received Event: ' + id);
    },    

    showExercises: function () {
    	for(var i=0; i<availableExerciseList.length; i++){
    		name = availableExerciseList[i].name;
    		console.log('exercise: ' + name);
    		// class="media-object pull-left"
    		li = $('<li class="table-view-cell"/>').html('<img src="img/'+name+'.jpg"/>');
    		$("#list").append(li);
    	}
    }
};

var selector = {
	selectElement: function(element) {
		console.log('select exercise: ' + $(element));
		return $(element).addClass('mySelected');
	},
	unselect: function(element) {
		return $(element).removeClass('mySelected');
	},

	ready: function() {
		$('p').click(
			function($e) {
				$('li').selectElement();
			}
		);
		$('li').click(
			function() {
				$(this).hasClass('mySelected')? selector.unselect($(this)) : selector.selectElement($(this));   
			}
		);
	}
};