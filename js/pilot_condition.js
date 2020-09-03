// Get uid from session storage (user pc)
var uid = localStorage.getItem('uid');
console.log(uid);
// Generate firebase reference
var db = firebase.database();
var prolific;

// OTHER GLOBAL VARIABLES
// String containing the current model preset
var currentModel = 'none';
var currentLabels;
var modelName;
var condition;
var condIdx;
var dbCond;
var labBlocks = [0, 0, 0];
var modelNo;

// Time data
var startTime;
var endTime;

// Strings correspond to preset names in the sliders.js presets variable
var easyLink = ['easy_1', 'easy_2', 'easy_2'];
var chains = ['pos_chain_1', 'pos_chain_2', 'pos_chain_3'];
var colliders = ['collider_1', 'collider_2', 'collider_3'];
var commonCause = ['ccause_1', 'ccause_2', 'ccause_3'];
// Labelled and control preset names
var condLabel = shuffleArray(['crime', 'finance', 'estate']);
var labelOptions = {
    'linkscrime': [['Crime rate', 'Police action', 'Population happiness'], 
              ['Police action', 'Population happiness', 'Crime rate'], 
              ['Population happiness', 'Crime rate', 'Police action']]
}
var condControl = shuffleArray(['crime_control', 'finance_control', 'estate_control']);

var easyBlocks = [
    chains,
    colliders,
    commonCause
];

// If the condition is label, assign labelled presets, otherwise add control presets

// Variables that define the number of experimental block of each type.
var numLinkBlocks = 3;
var numLinkScenario = 1;
var numGenBlocks = 3;
var numLabelBlocks = 1;

// Define variables that keep track of block indices
var linkTrainingIdx = [];
var linkScenarioIdx = [];
var genGraphIdx = [];
var labGraphIdx = [];


// Generate a new uid if it not a new user
if (uid == null) {
    console.log('No uid in localStorage')
    // if does not exists, generate a new one
    uid = getQueryVariable('PROLIFIC_PID')
    if (uid == false) {
        uid = 'test_'.concat(Math.random().toString().slice(2, 11));
        prolific = false;
        // Change href for prolific return as person is not from prolific
    } else {
        prolific = true
    }
    localStorage.setItem('prolific', prolific)

    // Generate a list of all user ids.
    // Generate a new uid and push it to the db
    db.ref('uids').orderByValue().equalTo(uid).once('value').then(function(snapshot) {
        request = snapshot;
        console.log(request.val())
        if (request.val() != undefined) {
            // Retrieve state and bring user back there
            db.ref('states').child(uid).once('value').then(function (snapshot) {
                var states = snapshot.val();
                //console.log(states)
                condIdx = states.condIdx;
                //console.log(condIdx)
                condition = states.condition;
                currentModel = states.state;

                // Redefine condition
                if (condition == 'label') {
                    labBlocks = [
                        condLabel[0],
                        condLabel[1],
                        condLabel[2]
                    ]
                    // Select only crime
                    labBlocks = [condLabel[condLabel.indexOf('crime')]];
                } else {
                    labBlocks = [
                        condControl[0],
                        condControl[1],
                        condControl[2]
                    ]
                    // Select only crime
                    labBlocks = [condControl[condControl.indexOf('crime_control')]];
                }

                // Rebuild survey
                // Build the sequencing of blocks
                condSeq = buildBlockSeq(condition);

                // Set up number of pages and current page
                pageIdx = condSeq[condIdx];
                numPages = condSeq.length;

                // Set current page to page idx
                currentPage = '#page-'.concat(pageIdx.toString());

                // Display current page
                $(currentPage).css({'display':'flex'});
                
                setupPage(true);
                console.log(condIdx)

                localStorage.setItem('condition', condition)
                localStorage.setItem('condIdx', condIdx)
                localStorage.setItem('currentModel', currentModel)

            })
        } else {
            // No entry in DB means new user id
            console.log('Hello, I work')
            db.ref('uids').push(uid);

            // Define condition
            // Get condition list from db, shift element and replace
            db.ref('cond').once('value').then(function(snapshot) {
                dbCond = snapshot.val().toString();
            
                if (dbCond == "label") {
                    console.log('changing to control')
                    db.ref('cond').set('control');
                } else {
                    console.log('changing to label')
                    db.ref('cond').set('label');
                }
            
                condition = dbCond;
                
                //// Normal if statement sequence
                //if (condition == 'label') {
                //    labBlocks = [
                //        condLabel[0],
                //        condLabel[1],
                //        condLabel[2]
                //    ]
                //    // Select only crime
                //    labBlocks = [condLabel[condLabel.indexOf('crime')]];
                //} else {
                //    labBlocks = [
                //        condControl[0],
                //        condControl[1],
                //        condControl[2]
                //    ]
                //    // Select only crime
                //    labBlocks = [condControl[condControl.indexOf('crime_control')]];
                //    // Adjust sequence 
                //    condSeq = buildBlockSeq(condition);
                //}
                // Only run Control Condition
                condition = 'control'
                labBlocks = [
                    condControl[0],
                    condControl[1],
                    condControl[2]
                ]
                // Select only crime
                labBlocks = [condControl[condControl.indexOf('crime_control')]];
                // Adjust sequence 
                condSeq = buildBlockSeq(condition);
            
                db.ref('states').child(uid).child('condition').set(condition);
                localStorage.setItem('condition', condition)
                localStorage.setItem('condIdx', condIdx)
                localStorage.setItem('currentModel', currentModel)
                // Save state to DB
                saveState()
            });
        }
    })
    // Push it also to localstorage
    localStorage.setItem('uid', uid);
    // Set condition to be bd cond and replace condition in database
    //condition = dbCond;
    condIdx = 0;
    //console.log(condIdx)
    
} else {
    // Recover state from localstorage
    console.log(localStorage)
    condition = localStorage.getItem('condition');
    condIdx = parseInt(localStorage.getItem('condIdx'));
    prolific = localStorage.getItem('prolific');
    if (prolific == 'true') {
        prolific = true;
    } else {
        prolific = false;
    }
    currentModel = localStorage.getItem('currentModel');

    if (condition == 'label') {
        labBlocks = [
            condLabel[0],
            condLabel[1],
            condLabel[2]
        ]
        // Select only crime
        labBlocks = [condLabel[condLabel.indexOf('crime')]];
    } else {
        labBlocks = [
            condControl[0],
            condControl[1],
            condControl[2]
        ]
        // Select only crime
        labBlocks = [condControl[condControl.indexOf('crime_control')]];
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
            currentLabels = ['A', 'B', 'C'];
        } else if (linkNum == 2) {
            $('#page-4-graphThree').css('display', 'flex');
            currentLabels = ['A', 'B', 'C'];
        } else if (linkNum == 3) {
            $('#page-4-graphFour-p').css('display', 'flex');
            $('#page-4-graphFour').css('display', 'flex');
            currentLabels = ['Asthma', 'Flu', 'Cough'];
        } else if (linkNum == 4) {
            $('#page-4-graphTwo').css('display', 'flex');
            currentLabels = ['A', 'B', 'C'];
        }
        
    } else {
        // Do Labelled stuff
        linkScenarioIdx.shift()
        //var scenario = condLabel[2 - linkScenarioIdx.length];
        var scenario = condLabel[condLabel.indexOf('crime')];
        currentModel = 'links'.concat(scenario);
        var localPreset = presets[scenario].slice(9, 12);
        
        var randint = getRandomInt(3)
        currentLabels = labelOptions[currentModel][randint];
        randint += 1;
        $('#page-4-graph-'.concat(scenario).concat("-").concat(randint.toString())).css('display', 'flex');
    }
    
    
    resetFeedback(currentLabels);
    
    // Feedback report
    //$(nodeList[0]).css({'display': 'flex'});
    $('.feedback-slider').slider({disabled:false})
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
function resetInterface() {
    $('.slider').slider({disabled: true});
    $('.feedback-slider').slider({disabled: true});
    $('#start_button').button({disabled: false});
    //$('#stop_button').button({disabled: true});
    $('#start_button').css({'display': 'flex'});
    $('#stop_button').css({'display': 'none'});
    $('.slider_box').css({'display': 'flex'})
    $('.button_container').css({'display': 'flex'})
    $('.feedback-slider-container').css({'display': 'flex'});
    $('#val-button').css({'display': 'none'});
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
    nodeIdx = 2;

    // Reset moved
    first_moved = false;
    second_moved = false;
    third_moved = false;
    fourth_moved = false;
    fifth_moved = false;
    sixth_moved = false;
    
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


// Get uid from prolific string
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
    return false
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
