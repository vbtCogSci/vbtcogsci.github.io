// Method that sets up the game when arriving on a game trial
// Called in survey.nextPage()
function setupGame(condIdx) {
    // Reset sliders
    $('.slider').slider("value", 0);

    // GenGraphs are in the case of basic models
    if (genGraphIdx.includes(condIdx)) {
        // Remove the first index from genGraph so as to not activate this if statement
        genGraphIdx.shift()
        var easyB = easyBlocks.shift()
        var randgen = easyB[Math.floor( Math.random() * 3 )];
        console.log(randgen)
        
        // Sets up the game page given the preset
        var presetLabels = updateModel(randgen);
        setupChart(presetLabels);
        // Sets up the response page given the preset
        resetFeedback(presetLabels);
        // Resets game interface
        resetInterface();

        // Update currentModel for database storage
        currentModel = randgen;
        
    // Deals with conditioned models
    } else if (labGraphIdx.includes(condIdx)) {
        // Define preset as the first index of the labBlocks
        preset = condLabel[currentLinkIdx]; // NEW VERSION
        
        console.log(preset);

        // Sets up the game page given the preset
        var presetLabels = updateModel(preset);
        setupChart(presetLabels);
        // Sets up the response page given the preset
        resetFeedback(presetLabels);
        // Resets game interface
        resetInterface();

        // Update currentModel for database storage
        currentModel = preset;
    }
}


// Methods dealing with the links reporting interface
// Called in survey.nextPage()
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
        //var scenario = condLabel[2 - linkScenarioIdx.length];
        var scenario = condLabel[currentLinkIdx]; 
        currentModel = 'links'.concat(scenario);
        
        var randint = getRandomInt(3)
        currentLabels = labelOptions[currentModel][randint];
        randint += 1;
        console.log('#page-4-graph-'.concat(scenario).concat("-").concat(randint.toString()))
        $('#page-4-graph-'.concat(scenario).concat("-").concat(randint.toString())).css('display', 'flex');
    }
    
    resetFeedback(currentLabels);
    
    // Feedback report
    //$(nodeList[0]).css({'display': 'flex'});
    $('.feedback-slider').slider({disabled:false})
    $('.val-link-button').css({'display': 'flex'});
}


//// COMMON FUNCTIONS
// Resets the interface of the game
// Called in interface_methods.setupGame() and interface_methods.setupLinkTraining()
function resetInterface() {
    $('.slider').slider({disabled: true});
    $('.feedback-slider').slider({disabled: true});
    $('#start_button').button({disabled: false});
    $('#start_button').css({'display': 'flex'});
    $('#stop_button').css({'display': 'none'});
    $('.feedback-container').css('display', 'flex');
    $('.slider_box_container').css('display', 'flex');
    $('.slider_box').css({'display': 'flex'});
    $('.button_container').css({'display': 'flex'});
    $('.feedback-slider-container').css({'display': 'flex'});
    $('#val-button').css({'display': 'none'});
    $('.graph-pred-rec-right').css({'display': 'none'});
}

// Resets feedback page for new input
// Called in interface_methods.setupGame() and interface_methods.setupLinkTraining()
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
    
    console.log(presetLabels)
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


