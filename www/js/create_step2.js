// Only needed if you want to fire a callback
window.addEventListener('push', onLoadPage);

function onLoadPage () {
    var viewName = document.getElementById('viewName').innerHTML;
    console.log('viewName: ' + viewName);

    if(viewName == 'stepTwo'){
        stepTwo.initialize();
    } else {
        console.error('nothing to initialize!');
    }
}

var stepTwo = {

    // Application Constructor
    initialize: function() {
        console.log('initialize step two');
        this.bindEvents();
    },

    bindEvents: function() {
        this.showSelectedExercises();
    },  

    showSelectedExercises: function () {
        var createSessionArray = JSON.parse(localStorage['_createSessionArray']);
        console.log('showSelectedExercises: ' + createSessionArray);
        for(var i=0; i<createSessionArray.length; i++){
            var id = createSessionArray[i];
            var exercise = this.findExercise(id);

            li = $('<li class="table-view-cell" id="' + id + '"/>')
            .html('<img src="'+exercise.image+'"/>');
            $("#list").append(li);
        }
    },

    findExercise: function (id) {
        for (var i=0; i<_availableExerciseList.length; i++){
            var exercise = _availableExerciseList[i];
            if(exercise.id == id){
                return exercise;
            }
        }
    }
};