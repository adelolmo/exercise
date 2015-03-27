var checkPage = function(){
    //Only run if twitter-widget exists on page
    var viewName = document.getElementById('viewName').innerHTML;
    console.log('checkPage invoked. viewName: ' + viewName);
    if(viewName == 'create') {
        // loadTwitterFeed(document,"script","twitter-wjs");
        create.showExercises();
    }
};

window.addEventListener('push', checkPage);