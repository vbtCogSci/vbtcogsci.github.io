// Get uid from session storage (user pc)
var uid = localStorage.getItem('uid');
console.log(uid);

if (uid != null) {
    if (uid.slice(0, 4) == 'test') {
        var uid = null;
    }
}


// Generate firebase reference -- Uncomment this to connect to database
var db = firebase.database();
var prolific;

// Defines the experiment currently running (DO NOT CHANGE)
// Possibilities:
//// exp1: control and label conditions
//// exp2: long and short conditions
//// exp3: congruent and incongruent
var experiment = 'exp3';

// Debug mode
// /!\ MUST BE FALSE FOR DATA COLLECTION /!\
var debug = false;

// OTHER GLOBAL VARIABLES
// String containing the current model preset
var currentModel = 'none';
var currentLabels;
var modelName;

// Key globabl navigation variables
var condition;
var condIdx;
var condSeq;

var dbCond;
var labBlocks;
var modelNo;

// Time data
var startTime;
var endTime;

// Strings correspond to preset names in the sliders.js presets variable
var easyLink = ['easy_1', 'easy_2', 'easy_2'];
var chains = ['pos_chain_1', 'pos_chain_2', 'pos_chain_3'];
var colliders = ['collider_1', 'collider_2', 'collider_3'];
var commonCause = ['ccause_1', 'ccause_2', 'ccause_3'];
var confounds = ['confound_1', 'confound_2', 'confound_3'];
// Labelled and control preset names
var condLabel = shuffleArray(['crime', 'finance', 'estate']);
var condDifficulty;
var currentLinkIdx = 0;

var labelOptions = {
    'linkscrime': [['Crime rate', 'Police action', 'Population happiness'], 
                   ['Police action', 'Population happiness', 'Crime rate'], 
                   ['Population happiness', 'Crime rate', 'Police action']],
    'linksfinance': [['Lockdown measures', 'Virus cases', 'Stock prices'],
                     ['Virus cases', 'Stock prices', 'Lockdown measures'],
                     ['Stock prices', 'Lockdown measures', 'Virus cases']],
    'linksestate': [['House prices', 'Population density', 'Desirability'],
                    ['Population density', 'Desirability', 'House prices'],
                    ['Desirability', 'House prices', 'Population density']]  
}

var exp3_conds = [
    {'finance':'incongruent', 'estate':'implausible', 'crime':'congruent'},
    {'finance':'incongruent', 'estate':'congruent', 'crime':'implausible'},
    {'finance':'implausible', 'estate':'congruent', 'crime':'incongruent'},
    {'finance':'implausible', 'estate':'incongruent', 'crime':'congruent'},
    {'finance':'congruent', 'estate':'incongruent', 'crime':'implausible'},
    {'finance':'congruent', 'estate':'implausible', 'crime':'incongruent'}
]

var condControl = shuffleArray(['crime_control', 'finance_control', 'estate_control']);

var easyBlocks = shuffleArray([
    shuffleArray(chains),
    shuffleArray(confounds)
]);

// If the condition is label, assign labelled presets, otherwise add control presets

// Variables that define the number of experimental block of each type.
var numLinkBlocks = 3;
var numGenBlocks = 3;
var numLabelBlocks = 1;

if (experiment == 'exp3') {
    var numGenBlocks = 1;
    var numLabelBlocks = 3;
}

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
        if (debug == true) {
            uid = 'victor_'.concat(Math.random().toString().slice(2, 11));
        } else {
            uid = 'beta_'.concat(Math.random().toString().slice(2, 11));
        }
        prolific = false;
        // Change href for prolific return as person is not from prolific
    } else {
        prolific = true
    }
    localStorage.setItem('prolific', prolific)

    // Push it also to localstorage
    localStorage.setItem('uid', uid);
    // Set condition to be bd cond and replace condition in database
    //condition = dbCond;
    condIdx = 0;

    // Generate a list of all user ids.
    db.ref('uids').orderByValue().equalTo(uid).once('value').then(function(snapshot) {
        request = snapshot;
        console.log(request.val())
        if (request.val() != undefined) {
            // Retrieve state and bring user back there
            db.ref('states').child(uid).once('value').then(function (snapshot) {
                var states = snapshot.val();
                condIdx = states.condIdx;
                condition = states.condition;
                currentModel = states.state;
                currentLinkIdx = states.currentLinkIdx;
                condLabel = states.condLabel;
                condDifficulty = states.condDifficulty;


                // Redefine condition
            
                // Rebuild survey
                // Build the sequencing of blocks
                condSeq = buildBlockSeq();

                // Set up number of pages and current page
                pageIdx = condSeq[condIdx];
                numPages = condSeq.length;

                // Set current page to page idx
                currentPage = '#page-'.concat(pageIdx.toString());

                // Display current page
                $(currentPage).css({'display':'flex'});
                
                setupPage(true);
                console.log(condIdx)

                saveState(false)
            })
        } else {
            // No entry in DB means new user id
            console.log('Hello, I work')

            db.ref('uids').push(uid);

            // Define condition
            // Get condition list from db, shift element and replace
            db.ref('cond').child(experiment).once('value').then(function(snapshot) {
                dbCond = snapshot.val().toString();
            
                // Changes the next participant's condition based on the current participant and the experiment number
                if (experiment == 'exp1') {
                    if (dbCond == "label") {
                        console.log('changing to control')
                        db.ref('cond').child(experiment).set('control');
                    } else {
                        console.log('changing to label')
                        db.ref('cond').chiled(experiment).set('label');
                    }
                } else if (experiment == 'exp2') {
                    if (dbCond == "long") {
                        console.log('changing to short')
                        db.ref('cond').child(experiment).set('short');
                    } else {
                        console.log('changing to long')
                        db.ref('cond').child(experiment).set('long');
                    }
                } else if (experiment == 'exp3') {
                    // Some randomisation to define here
                    dbCond = parseInt(dbCond);
                    console.log(dbCond)
                    if (dbCond > 5) {
                        dbCond = 0
                    }
                    
                    if (dbCond == 5) {
                        db.ref('cond').child(experiment).set(0)
                    } else {
                        db.ref('cond').child(experiment).set(dbCond + 1)
                    }

                    // Set condDifficulty
                    var pairings = exp3_conds[dbCond];
                    condDifficulty = [null, null, null];
                    
                    for (i=0; i<3; i ++) {
                        condDifficulty[i] = pairings[condLabel[i]]
                    }
                }
            
                condition = dbCond;

                // Adjust sequence 
                condSeq = buildBlockSeq();
                // Initiate condition idx
                condIdx = 0;
                // Save state to DB
                saveState();
            });
        }
    })
    
} else {
    // Recover state from localstorage
    console.log('Found UID in local storage')
    condition = localStorage.getItem('condition');
    condIdx = parseInt(localStorage.getItem('condIdx'));
    currentLinkIdx = parseInt(localStorage.getItem('currentLinkIdx'));
    condLabel = localStorage.getItem('condLabel').split(',');
    condDifficulty = localStorage.getItem('condDifficulty').split(',');
    prolific = localStorage.getItem('prolific');

    if (prolific == 'true') {
        prolific = true;
    } else {
        prolific = false;
    }
    currentModel = localStorage.getItem('currentModel');

}









