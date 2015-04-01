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

var hideAnimation = "slide";
var showAnimation = "slide";
var options = {};
var animationDuration = 300;

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

    showExercises: function (exerciseArray, newIndex) {
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
            var html = '<div>' + (i+1) + '. ' + exercise.name + '</div>'
            + '<div class="pull-right">'
            + upNav
            + downNav
            + '</div>'
            + '<img src="' + exercise.image + '">'
            + type;

              
            var style = '';
            if(newIndex != undefined && newIndex==i) {
                style = ' style="display:none"';
            }

            li = $('<li class="table-view-cell"'+ style +' id="' + id + '"/>')
            .html(html);
            $("#list").append(li);
        }
        if(newIndex != undefined) {
            liAnimated = $("#list").children()[newIndex];
            $(liAnimated).show(showAnimation, options, animationDuration, (
                function () {
                    $(liAnimated).removeAttr( "style" );
                    console.log('show animation done');
                }));
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

        $(element).hide(hideAnimation, options, animationDuration , (function () {
            changeOrder.onAnimationDone(exerciseId, -1);
        }));
    },

    moveDown: function (element) {
        var exerciseId = $(element).attr('id');
        console.log('move up: ' + exerciseId);

        $(element).hide(hideAnimation, options, animationDuration , (function () {
            changeOrder.onAnimationDone(exerciseId, +1);
        }));
    },

    onAnimationDone: function (exerciseId, newIndexDelta) {
        console.log('hide animation done');

        var createSessionArray = JSON.parse(localStorage['_createSessionArray']);
        createSessionArray = changeOrder.reorganizeArray(createSessionArray, exerciseId, newIndexDelta);

        localStorage['_createSessionArray'] = JSON.stringify(createSessionArray);
        stepTwo.showExercises(createSessionArray, createSessionArray.indexOf(exerciseId));  
    },

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