var uid = sessionStorage.getItem('uid');
console.log(uid);
var db = firebase.database();

// Generate a list of all user ids.
var uidList = [];
db.ref('uids').on('child_added', function(localId, prevChildkey) {
    //console.log(localId.val)
    uidList.push(localId.val().toString());
});

// Generate a new uid if it not a new user
if (uid == null) {
    console.log('No uid in sessionStorage')
    // if does not exists, generate a new one
    uid = 'pilot_'.concat(Math.random().toString().slice(2, 7));
    while ($.inArray(uid, uidList) > -1) {
        console.log('I am in')
        uid = 'pilot_'.concat(Math.random().toString().slice(2, 7));
    }
    // Generate a new uid and push it to the db
    db.ref('uids').push(uid);
} 

// Handle condition here, if new participants, assign condition and push to db. //

var condition = sessionStorage.getItem('condition');
var condIdx = sessionStorage.getItem('condIndex');

if (condition == null) {
    // New participant, assign condition, logic to be defined.
    //condition = [1, 1, 1]; //Placeholder
    var condition = 'label';
    condIdx = 0;
}

// Condition is a string
// Info
// Survey sequence, string of page indices
// Labels with reference to indices
var sets = {
    'a':['Crime Rate', 'Police Action', 'Population Satisfaction'],
    'b':['Stock Prices', 'Confinement Measures', 'Number of Covid cases'],
    'c':['House prices', 'Population density', 'Desireability'],
    'd':['X', 'Y', 'Z']
}

// Strings correspond to preset names in the sliders.js presets variable
var chains = ['pos_chain_1', 'pos_chain_2', 'pos_chain_3'];
var colliders = ['collider_1', 'collider_2', 'collider_3'];
var commonCause = ['ccause_1', 'ccause_2', 'ccause_3'];
// Labelled and control preset names
var condLabel = shuffleArray(['crime', 'finance', 'estate']);
var condControl = shuffleArray(['crime_control', 'finance_control', 'estate_control']);

var easyBlocks = [
    chains,
    colliders,
    commonCause
];
// If the condition is label, assign labelled presets, otherwise add control presets
if (condition == 'label') {
    var labBlocks = [
        condLabel[0],
        condLabel[1],
        condLabel[2]
    ]
} else {
    var labBlocks = [
        condControl[0],
        condControl[1],
        condControl[2]
    ]
}

// Variables that define the number of experimental block of each type.
var numLoopyBlocks = 1;
var numLabelBlocks = easyBlocks.length;
var numGenBlocks = labBlocks.length;

// Define variables that keep track of block indices
var genGraphIdx = [];
var labGraphIdx = [];

// Flow is always loopy labels x3 > Easy graphs x3 > Labelled or unlabelled hard graphs x3
// Condition A is labels
// Loopy experiment is always page 10
// Graph is always 11
// Graph feedback is always 12

function setupGame(condIdx) {
    var condCase = condSeq[condIdx];
    // Reset sliders
    $('.slider').slider("value", 0);

    if (condIdx == 7) {
        console.log('Practice, run no links')
        updateModel('no_link');
        setupChart(['X', 'Y', 'Z']);
    } else if (genGraphIdx.includes(condIdx)) {
        // Remove the first index from genGraph so as to not activate this if statement
        genGraphIdx.shift()
        var easyB = easyBlocks.shift()
        var randgen = easyB[Math.floor(Math.random() * 2) + 1];
        console.log(randgen)
        updateModel(randgen);
        setupChart(['X', 'Y', 'Z']);
        
    } else if (labGraphIdx.includes(condIdx)) {
        // Define preset as the first index of the labBlocks
        preset = labBlocks.shift();

        console.log(preset);

        var presetLabels = updateModel(preset);
        $('.X').html(presetLabels[0]);
        $('.Y').html(presetLabels[1]);
        $('.Z').html(presetLabels[2]);
        setupChart(presetLabels);
  
    }

    
}


// UTILITY FUNCTIONS
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}