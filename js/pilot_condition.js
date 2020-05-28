// Get uid from session storage (user pc)
var uid = localStorage.getItem('uid');
console.log(uid);
// Generate firebase reference
var db = firebase.database();

// OTHER GLOBAL VARIABLES
// String containing the current model preset
var currentModel = 'none';
var condition;
var condIdx;
var dbCond;
var labBlocks = [0, 0, 0];

// Strings correspond to preset names in the sliders.js presets variable
var easyLink = ['easy_1', 'easy_2', 'easy_2'];
var chains = ['pos_chain_1', 'pos_chain_2', 'pos_chain_3'];
var colliders = ['collider_1', 'collider_2', 'collider_3'];
var commonCause = ['ccause_1', 'ccause_2', 'ccause_3'];
// Labelled and control preset names
var condLabel = shuffleArray(['crime', 'finance', 'estate']);
var condControl = shuffleArray(['crime_control', 'finance_control', 'estate_control']);

var easyBlocks = [
    easyLink,
    chains,
    colliders,
    commonCause
];

// If the condition is label, assign labelled presets, otherwise add control presets

// Variables that define the number of experimental block of each type.
var numLinkBlocks = 4;
var numLinkScenario = 3;
var numGenBlocks = 3;
var numLabelBlocks = 4;

// Define variables that keep track of block indices
var linkTrainingIdx = [];
var linkScenarioIdx = [];
var genGraphIdx = [];
var labGraphIdx = [];

// Generate a new uid if it not a new user
if (uid == null) {
    console.log('No uid in localStorage')
    // if does not exists, generate a new one
    uid = 'pilot_'.concat(Math.random().toString().slice(2, 11));
    // Generate a list of all user ids.
    // Generate a new uid and push it to the db
    db.ref('uids').push(uid);
    // Push it also to localstorage
    localStorage.setItem('uid', uid);

    // Define condition
    // Get condition list from db, shift element and replace
    db.ref('cond').once('value').then(function(snapshot) {
        dbCond= snapshot.val().toString()

        if (dbCond == "label") {
            console.log('changing to control')
            db.ref('cond').set('control');
        } else {
            console.log('changing to label')
            db.ref('cond').set('label');
        }

        condition = dbCond;

        if (condition == 'label') {
            labBlocks = [
                condLabel[0],
                condLabel[1],
                condLabel[2]
            ]
        } else {
            labBlocks = [
                condControl[0],
                condControl[1],
                condControl[2]
            ]
        }

        db.ref('data').child(uid).child('condition').set(condition);
        localStorage.setItem('condition', condition)
        localStorage.setItem('condIdx', condIdx)
        localStorage.setItem('currentModel', currentModel)
    });
    
    // Set condition to be bd cond and replace condition in database
    //condition = dbCond;
    condIdx = 0;

} else {
    // Recover state from database
    condition = localStorage.getItem('condition');
    condIdx = parseInt(localStorage.getItem('condIdx'));
    currentModel = localStorage.getItem('currentModel');

    if (condition == 'label') {
        labBlocks = [
            condLabel[0],
            condLabel[1],
            condLabel[2]
        ]
    } else {
        labBlocks = [
            condControl[0],
            condControl[1],
            condControl[2]
        ]
    }
}


function setupLinkTraining(condIdx) {
    $('.page-4-graph').css('display', 'none')
    
    
    resetInterface();
    if (linkTrainingIdx.includes(condIdx)) {
        var linkNum = linkTrainingIdx.indexOf(condIdx) + 1;
        currentModel = 'links'.concat(linkNum.toString());
        if (linkNum == 1) {
            $('#page-4-graphOne').css('display', 'flex');
        } else if (linkNum == 2) {
            $('#page-4-graphTwo').css('display', 'flex');
        } else if (linkNum == 3) {
            $('#page-4-graphThree').css('display', 'flex');
        } else if (linkNum == 4) {
            $('#page-4-graphFour').css('display', 'flex');
        }
        var localPreset = ['A', 'B', 'C'];
    } else {
        // Do Labelled stuff
        linkScenarioIdx.shift()
        var scenario = condLabel[2 - linkScenarioIdx.length];
        currentModel = 'links'.concat(scenario);
        var localPreset = presets[scenario].slice(9, 12);
        $('#page-4-graph-'.concat(scenario)).css('display', 'flex');
    }
    
    resetFeedback(localPreset);
    // Feedback report
    $(nodeList[0]).css({'display': 'flex'});
    $('.val-link-button').css({'display': 'flex'});
}

// Flow is always loopy labels x3 > Easy graphs x3 > Labelled or unlabelled hard graphs x3
// Condition A is labels
// Loopy experiment is always page 10
// Graph is always 11
// Graph feedback is always 12

function setupGame(condIdx) {
    var condCase = condSeq[condIdx];
    // Reset sliders
    $('.slider').slider("value", 0);

    if (genGraphIdx.includes(condIdx)) {
        // Remove the first index from genGraph so as to not activate this if statement
        genGraphIdx.shift()
        var easyB = easyBlocks.shift()
        var randgen = easyB[Math.floor(Math.random() * 2) + 1];
        console.log(randgen)
        
        // Sets up the game page given the preset
        var presetLabels = updateModel(randgen);
        setupChart(presetLabels);
        // Sets up the response page given the preset
        resetFeedback(presetLabels);
        // Resets game interface
        resetInterface()

        // Update currentModel for database storage
        currentModel = randgen;
        
    } else if (labGraphIdx.includes(condIdx)) {
        // Define preset as the first index of the labBlocks
        preset = labBlocks.shift();
        console.log(preset);

        // Sets up the game page given the preset
        var presetLabels = updateModel(preset);
        setupChart(presetLabels);
        // Sets up the response page given the preset
        resetFeedback(presetLabels);
        // Resets game interface
        resetInterface()

        // Update currentModel for database storage
        currentModel = preset;
    }
}


// UTILITY FUNCTIONS

function saveState() {
    db.ref('data').child(uid).child('state').set(currentModel);
    db.ref('data').child(uid).child('condIdx').set(condIdx);
    
    localStorage.setItem('condIdx', condIdx);
    localStorage.setItem('currentModel', currentModel);
}

function saveLinkData() {
    // Feedback sliders values
    var report = [
        $('#AonB').slider("value"),
        $('#AonC').slider("value"),
        $('#BonA').slider("value"),
        $('#BonC').slider("value"),
        $('#ConA').slider("value"),
        $('#ConB').slider("value")
    ];
    db.ref('data').child(uid).child(currentModel).child('report').set(report);
}

function saveGraphData() {
    // SEND TO DATABASE

    // Graph data
    // Times 
    db.ref('data').child(uid).child(currentModel).child('times').set(steps);
    // Values
    db.ref('data').child(uid).child(currentModel).child('xVals').set(xHist);
    db.ref('data').child(uid).child(currentModel).child('yVals').set(yHist);
    db.ref('data').child(uid).child(currentModel).child('zVals').set(zHist);
    // Interventions
    db.ref('data').child(uid).child(currentModel).child('xInt').set(xInter);
    db.ref('data').child(uid).child(currentModel).child('yInt').set(yInter);
    db.ref('data').child(uid).child(currentModel).child('zInt').set(zInter);

    // Reset Data storage variables
    xHist = [0];
    yHist = [0];
    zHist = [0];
    xInter = [0];
    yInter = [0];
    zInter = [0];
    steps = [0];

    // Feedback sliders values
    var report = [
        $('#XonY').slider("value"),
        $('#XonZ').slider("value"),
        $('#YonX').slider("value"),
        $('#YonZ').slider("value"),
        $('#ZonX').slider("value"),
        $('#ZonY').slider("value")
    ];
    db.ref('data').child(uid).child(currentModel).child('report').set(report);
    if (['crime', 'finance', 'estate'].includes(currentModel)) {
        // Save qual feedback as well
        var $radioSense = $("input:radio[name=radio-1]:checked").attr('id');
        db.ref('data').child(uid).child(currentModel).child('sense').set($radioSense);
        db.ref('data').child(uid).child(currentModel).child('reason').set($('#reason-qual').val())
    }
    
}

function saveDemographics () {
    var radioGender = $("input:radio[name=gender]:checked").attr('id');
    var radioCausal = $("input:radio[name=causal-familiarity]:checked").attr('id');
    var radioLoopy = $("input:radio[name=loopy-fb]:checked").attr('id');
    var radioGraph = $("input:radio[name=graph-fb]:checked").attr('id');

    db.ref('demo').child(uid).child('age').set($('#age').val());
    db.ref('demo').child(uid).child('gender').set(radioGender);
    db.ref('demo').child(uid).child('activity').set($('#activity_selector').val());
    db.ref('demo').child(uid).child('causal_fam').set(radioCausal);
    db.ref('demo').child(uid).child('loopy_fb').set(radioLoopy);
    db.ref('demo').child(uid).child('graph_fb').set(radioGraph);

    // Save date and time of submission
    db.ref('date').child(uid).set(Date.now());
}

function saveTechnicalFb () {
    var radioScreen = $("input:radio[name=screen]:checked").attr('id');
    var radioPc = $("input:radio[name=pc]:checked").attr('id');
    var radioBrowser = $("input:radio[name=browser]:checked").attr('id');
    var checkGraphTech = $("input:radio[name=graph-tech]:checked").attr('id');
    var techText = $('#tech-fb').val();

    if (radioScreen != null) {
        db.ref('tech').child(uid).child('screen').set(radioScreen);
    }
    if (radioPc != null) {
        db.ref('tech').child(uid).child('pc').set(radioPc);
    }
    if (radioBrowser != null) {
        db.ref('tech').child(uid).child('browser').set(radioBrowser);
    }
    if (checkGraphTech != null) {
        db.ref('tech').child(uid).child('tech').set(checkGraphTech);
    }
    if (techText != "") {
        db.ref('tech').child(uid).child('techText').set(techText);
    }
}


function resetInterface() {
    $('.slider').slider({disabled: true});
    //$('#stop_button').button({disabled: true});
    $('#start_button').css({'display': 'flex'});
    $('#stop_button').css({'display': 'none'});
    $('.slider_box').css({'display': 'flex'})
    $('.button_container').css({'display': 'flex'})
    $('.feedback-slider-container').css({'display': 'none'});
    $('.val-link-button').css({'display': 'none'});
    $('.graph-pred-rec-right').css({'display': 'none'});
}

// Resets feedback page for new input
function resetFeedback(presetLabels) {
    $('.feedback-slider').slider('value', 0);
    $('.fb-handle').html('0');
    $('.X').html(presetLabels[0]);
    $('.Y').html(presetLabels[1]);
    $('.Z').html(presetLabels[2]);
    $('#val-button').button({disabled: true});
    $('#val-btn').button({disabled: true});
    nodeIdx = 0;
    
    //console.log(presetLabels)
    if (presetLabels[1] == 'Red') {
        //console.log('Hello')
        $('.graph-pred-rec-right').css('visibility', 'hidden');
        $('#custom-handle-1, #custom-handle-2, #custom-handle-3').css({
            'line-height': '3em',
            'font-size': 'smaller'
        });
        
    } else {
        $('.graph-pred-rec-right').css('visibility', 'visible');
        $('#custom-handle-1, #custom-handle-2, #custom-handle-3').css({
            'line-height': '1.5em',
            'font-size': 'smaller'
        });
    }

    $('input[type="radio"]').prop('checked', false);
    $('input[type="radio"]').button( "refresh" );

    $('#reason-qual').val('')

    $('.feedback-slider').each(function(index, element) {
        // Init sliders
        var $slider = $(element);
        //console.log($slider);
        var $handle = $('#handle-'.concat($slider.attr('id'))).addClass( "fb-handle" );
        $handle.text('?')
    });
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
