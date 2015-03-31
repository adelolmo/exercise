// Only needed if you want to fire a callback
window.addEventListener('push', onLoadPage);

function onLoadPage () {
	var viewName = document.getElementById('viewName').innerHTML;
	console.log('viewName: ' + viewName);

	if(viewName == 'stepOne'){
		stepOne.initialize();
	}
}

var stepOne = {

    // Application Constructor
    initialize: function() {
    	console.log('initialize step one');
    	localStorage.removeItem('_createSessionArray');
    	this.bindEvents();
    },

    bindEvents: function() {
    	// document.querySelector("#next").addEventListener("touchend", this.nextStep, false);
    	this.showExercises();
    	selector.ready();
    },

    showExercises: function () {
    	console.log('showExercises: ' + _availableExerciseList);
    	for(var i in _availableExerciseList){
            var id = _availableExerciseList[i].id;
    		var image = _availableExerciseList[i].image;
    		// console.log('exercise: ' + id);
    		// class="media-object pull-left"
    		li = $('<li class="table-view-cell" id="' + id + '"/>')
    		.html('<img src="'+ image +'"/>');
    		$("#list").append(li);
    	} 
    },

    nextStep: function (argument) {
    	console.log('nextStep...')
    	var createSessionArray = [];
    	var listItems = $("#list li");
    	for(var i=0; i<listItems.length; i++) {
			// console.log('i: ' + i);
			var li = listItems[i];
    		// console.log('li: ' + li.id + ' class:' + li.classList);
    		if(li.classList.contains('mySelected')){
    			// console.log('selected: : ' + li.id);
    			createSessionArray.push(li.id);
    		}
    	}
    	localStorage.setItem('_createSessionArray', createSessionArray); 
    	console.log('_createSessionArray: ' + createSessionArray);
    }
};

var selector = {
	selectElement: function(element) {
		var exerciseId = $(element).attr('id');
		console.log('select exercise: ' + exerciseId);
    	
    	if (localStorage['_createSessionArray'] == undefined) {
    		createSessionArray = [];
    	} else {
    		createSessionArray = JSON.parse(localStorage['_createSessionArray']);
    	}
    	console.log('createSessionArray: ' + createSessionArray);
    	createSessionArray.push(exerciseId);
		localStorage['_createSessionArray'] = JSON.stringify(createSessionArray);

		return $(element).addClass('mySelected');
	},

	unselectElement: function(element) {
        var exerciseId = $(element).attr('id');
        console.log('unselect exercise: ' + exerciseId);

        var createSessionArray = JSON.parse(localStorage['_createSessionArray']);
        var index = createSessionArray.indexOf(exerciseId);
        if (index > -1) {
            createSessionArray.splice(index, 1);
        }
        localStorage['_createSessionArray'] = JSON.stringify(createSessionArray);

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
				$(this).hasClass('mySelected')? selector.unselectElement($(this)) : selector.selectElement($(this));   
			}
		);
	}
};