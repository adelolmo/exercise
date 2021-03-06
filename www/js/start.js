/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var sessionDiv;
 var timerID = 0;
 var now;
 var end;

// Only needed if you want to fire a callback
window.addEventListener('push', onLoadPage);

function onLoadPage () {
    var viewName = document.getElementById('viewName').innerHTML;
    console.log('viewName: ' + viewName);

    if(viewName == 'start'){
        console.log('start.js - onLoadPage');
        document.querySelector("#start").addEventListener("touchend", start.startSession, false);
        sessionDiv = document.querySelector("#session");
        sessionDiv.innerHTML = "page loaded";
    }
}

var start = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },


    bindEvents: function() {
        // document.querySelector("#startScan").addEventListener("touchend", startScan, false);
        // resultDiv = document.querySelector("#results");
    },

    startSession: function () {
        console.log('start');
        timerID=0;
        now = null
        end = null;
        exerciseIndex = 0;

        var secondsTimeout = exercises[exerciseIndex].split('|')[1];
        initTimer(secondsTimeout);
        showImage(exercises, exerciseIndex);
        counter=setInterval(timer, 1000); //1000 will  run it every 1 second
        // timer();
    }
};

var exercises = ['plank|5',
'rest|2',
'side_plank_right|5',
'rest|2',
'side_plank_left|5',
'finish|1'];

var count;
var counter; 
var exerciseIndex=0;

function initTimer (countValue) {
    count = countValue;
    console.log("initTimer: " + count);
}

function timer() {


    count=count-1;
    if (count <= 0) {
        clearInterval(counter);
        //counter ended, do something here
        exerciseIndex++;
        if(exerciseIndex < exercises.length){
            var secondsTimeout = exercises[exerciseIndex].split('|')[1];
            document.getElementById("timer").innerHTML= secondsTimeout+" secs";
            initTimer(secondsTimeout);
            showImage(exercises, exerciseIndex);
            counter=setInterval(timer, 1000);
        }
        // exerciseIndex++;
        return;
    }

    //Do code for showing the number of seconds here
    document.getElementById("timer").innerHTML=count + " secs";
}

function showImage (exercises, index) {
    var name = exercises[index].split('|')[0];
    var time = exercises[index].split('|')[1];
    console.log('showImage: ' + name);

    sessionDiv.innerHTML = '<img src="img/'+ name +'.jpg"/>'; 
    // pausecomp(time * 1000);

}

/*function startCount (exercises) {
    if(exerciseIndex + 1 > exercises.length){
        return;
    }
    var name = exercises[exerciseIndex].split('|')[0];
    var time = exercises[exerciseIndex].split('|')[1];
    var timeMillis = time * 1000;
    console.log('name: ' + name + ' time: ' + time);

    sessionDiv.innerHTML = '<img src="img/'+ name +'.jpg"/>'; 

    var timeCount = 0;
    now = new Date();
    end = new Date(now.getTime() + timeMillis);
    console.log('now: ' + now.getTime());
    console.log('end: ' + end.getTime());
    executionPause();

    startCount(exercises, ++index);
}*/

/*function executionPause(){
    now = new Date();
    if(now.getTime() > end.getTime()){
        console.log("timeout");
        clearTimeout(timerID);
    }
    timerID = setTimeout("executionPause()", 500)    
}*/


function pausecomp(millis) {
    var date = new Date();
    var curDate = null;
    console.log('start pause. ' + new Date());

    do { 
        curDate = new Date(); 
        // console.log(curDate-date);
    } while(curDate-date < millis);
} 
