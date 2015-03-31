// Only needed if you want to fire a callback
window.addEventListener('push', onLoadPage);

function onLoadPage () {
    var viewName = document.getElementById('viewName').innerHTML;
    console.log('viewName: ' + viewName);

    if(viewName == 'stepTwo'){
        stepTwo.initialize();
        changeOrder.ready();    
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
        this.showExercises(createSessionArray);
    },

    showExercises: function (exerciseArray) {
        console.log('showExercises: ' + exerciseArray);
        $("#list").html('');
        for(var i=0; i<exerciseArray.length; i++){
            var id = exerciseArray[i];
            var exercise = this.findExercise(id);
            var upNav = i != 0 ? '<span class="icon icon-up-nav"></span>':'';
            var downNav = i != exerciseArray.length - 1 ? '<span class="icon icon-down-nav"></span>':'';
            var type = exercise.type == 'duration' ?
            '<input type="text" placeholder="Seconds Duration">'
            : '<input type="text" placeholder="Repetitions">';
            var html = '<div>' + exercise.name + '</div>'
            + '<div class="pull-right">'
            + upNav
            + downNav
            + '</div>'
            + '<img src="' + exercise.image + '">'
            + type;

            li = $('<li class="table-view-cell" id="' + id + '"/>')
            .html(html);
            $("#list").append(li);
        }
        changeOrder.ready();
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

var changeOrder = {

    moveUp: function (element) {
        var exerciseId = $(element).attr('id');
        console.log('move up: ' + exerciseId);
       
        var createSessionArray = JSON.parse(localStorage['_createSessionArray']);

        createSessionArray = this.reorganizeArray(createSessionArray, exerciseId, -1);


        localStorage['_createSessionArray'] = JSON.stringify(createSessionArray);
        stepTwo.showExercises(createSessionArray);
    },

    moveDown: function (element) {
        var exerciseId = $(element).attr('id');
        console.log('move up: ' + exerciseId);
  
        var createSessionArray = JSON.parse(localStorage['_createSessionArray']);

        createSessionArray = this.reorganizeArray(createSessionArray, exerciseId, +1);


        localStorage['_createSessionArray'] = JSON.stringify(createSessionArray);
        stepTwo.showExercises(createSessionArray);   },

    reorganizeArray: function (array, id, newIndexDelta) {
        var exerciseIndex = array.indexOf(id);
        var id = array[exerciseIndex];
        var newExerciseIndex = exerciseIndex + newIndexDelta;
        var idAbove = array[newExerciseIndex];
        array[newExerciseIndex] = id;
        array[exerciseIndex] = idAbove;

        return array;
    },

    ready: function() {
        $('li div span').click(
            function() {
                if($(this).hasClass('icon-down-nav')) {
                    changeOrder.moveDown($(this).parent().parent());

                } else if ($(this).hasClass('icon-up-nav')) {
                    changeOrder.moveUp($(this).parent().parent());

                }
            }
        );
    },

    getExerciseIndex: function (liArray, exerciseId) {
        for (var i=0; i< liArray.length; i++){
            li = liArray[i];
            if(li.id == exerciseId){
                return i;
            }
        }
        return -1;
    }
}