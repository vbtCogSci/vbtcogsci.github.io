// Define key survey navigation variables.
var survey_pages;

// Restart at last stop given the
var pageIdx;

var numPages; // Has to be equal to the length of survey_pages
var currentPage;

// Define navigation global variables
var introIdx = [];
var loopyIdx = [];
var graphIdx = [];
var fbIdx = [];
var outroIdx = [];

var condSeq;


// Function calls on document load
$('document').ready(function () {
    // Build experiment according to the condition, survey_pages has to be an array of strings in order. Indices defines page number
    survey_pages = buildSurvey();

    // Build the sequencing of blocks
    condSeq = buildBlockSeq();
    // Set up number of pages and current page
    pageIdx = condSeq[condIdx];
    numPages = condSeq.length;

    // Set current page to page idx
    currentPage = '#page-'.concat(pageIdx.toString());

    // Store current state, uid and condition in sessionStorage
    sessionStorage.setItem('uid', uid);
    sessionStorage.setItem('state', pageIdx.toString())

    // Display current page
    $(currentPage).css({'display':'flex'});
    // Set up logic for navigation
    setupNavigation();
    // Set up logic for submitting loopy link
    setupLoopySubmit();
    // Set up logic for slider feedback
    setupFeedback();
});


// Navigation functions 
function setupNavigation() {
    $('.nav-button').button();
    $('#prev_button').click(function () {
        if (pageIdx > 0) {
            condIdx -= 1;
            pageIdx = condSeq[condIdx];
            updatePage(pageIdx);
            // Disable next if next page has a loopy input
            $('#next_button').button('enable');

            // Maintain state item up to date
            sessionStorage.setItem('state', pageIdx.toString())
            sessionStorage.setItem('condIndex', condIdx);
        }
    })
    $('#next_button').click(function () {
        if (condIdx < numPages-1) {
            condIdx += 1;
            pageIdx = condSeq[condIdx];
            console.log(condIdx)
            console.log(condSeq[condIdx])
            updatePage(pageIdx);
            // Disable next if next page has a loopy input
            $('#next_button').button('enable');
            if ($(currentPage).find('.loopy-link-container').length != 0) {
                //console.log($(currentPage).find('.loopy-link-container').length);
                //$('#next_button').button('disable');
            } else if ($(currentPage).find('.game-display').length != 0) {
                console.log('NEXT')
                //$('#next_button').button('disable');
                setupGame(condIdx);
                // Set up according to condition
                // Put correct labels and causal links
                // Put correct labels for feedback page
            }

            // Maintain state item up to date
            sessionStorage.setItem('state', pageIdx.toString())
            sessionStorage.setItem('condIndex', condIdx);
        }
    })
}

function updatePage(pageIdx) {
    $(currentPage).css('display', 'none');
    //console.log(currentPage)
    currentPage = '#page-'.concat(pageIdx.toString());
    $(currentPage).css('display', 'flex');
    //console.log(currentPage)
}


// LOOPY LINK SUBMIT LOGIC AND PARSING
function setupLoopySubmit() {
    $('.loopy-validate').button().button('disable').each(function(index, element) {
        var $loopyVal = $(element);
        $loopyVal.click(function() {
            var $loopyInput = $('#'.concat($loopyVal.attr('id').slice(0,-9)));
            parseLoopyLink($loopyInput.val(), $loopyInput.attr('id').slice(-1));
            $loopyVal.button('disable')
        })
    });

    $('.loopy-input').each(function (index, element) {
        var $loopyInput = $(element);
        $loopyInput.on('input', function () {
            $loopyInput.css({
                'color':'black'
            });
            var $validate = $('#'.concat($loopyInput.attr('id').concat('-validate')));
            $validate.button('enable');
        });
        $loopyInput.focus(function(event, element) {
            $loopyInput.select();
        });
    })
}


function parseLoopyLink(link, loopyNum) {
    var $name = '#'.concat('loopy-').concat(loopyNum).concat('-alert');
    var $loopyAlert = $($name);
    if (link == 'https://ncase.me/loopy/v1.1/') {
        $loopyAlert.css({
            'color':'red'
        }).html('<br>Oops, this appears to be the link of the default loopy page, not to your model. Make sure you use the Export as link button on the right-hand side of the Loopy page')
        //console.log('Oops, this appears to be the link of the default loopy page, not to your model. Make sure you use the Export as link button on the right-hand side of the Loopy page');
    } else if (link.includes('https://ncase.me/loopy/v1.1/?data=')) {
        $loopyAlert.css({
            'color':'green'
        }).html('<br>Thank you, your link is valid, press Next to move on.');
        //console.log('Thank you, your link is valid, press Next to move on.');
        // Enable Next Button
        $('#next_button').button('enable');

        // SEND TO DATABASE
        db.ref('data').child(uid).child($name.slice(1,-1)).set(link);
    } else {
        $loopyAlert.css({
            'color':'red'
        }).html('<br>Oops, I do not recognise this link, please make sure you use the Export as link button on the right-hand side of the loopy page');
        //console.log('Oops, I do not recognise this link, please make sure you use the Export as link button on the right-hand side of the loopy page');
    }
}


// SETUP FEEDBACK PAGES
function setupFeedback() {
    $('.feedback-slider').each(function(index, element) {
        // DEV
        //var cond = {
        //    'X':'Crime Rate',
        //    'Y':'Police Action',
        //    'Z':'Population Satisfaction'
        //};
        //$('.X').html(cond['X']);
        //$('.Y').html(cond['Y']);
        //$('.Z').html(cond['Z']);

        //var $test = $('.feedback-slider-container').find('.X')
        //console.log($test.html('YEAH'))


        // Init sliders
        var $slider = $(element);
        //console.log($slider);
        var $handle = $('#handle-'.concat($slider.attr('id')));
        //console.log($handle);
        $slider.slider({
            max: 2,
            min: -2,
            step: 1,
            value: 0,
            create: function() {
              $handle.text( $( this ).slider( "value" ) );
            },
            slide: function( event, ui ) {
              $handle.text( ui.value );
            }
          });

    });

    $('.ui-slider-handle').css({
        'width': '3em',
        'height': '1.6em',
        'top': '50%',
        'left': '50%',
        'margin-top': '-.8em',
        'margin-left': '-1.5em',
        'text-align': 'center',
        'line-height': '1.6em'
      });
}


// SURVEY BUILDING FUNCTION
function buildSurvey() {
    var survey_pages;

    // Intro content
    var intro_content = [];
    intro_content.push(consent_page);
    intro_content.push(causal_models_intro_1);
    intro_content.push(causal_models_intro_2);
    intro_content.push(loopy_intro_1);
    intro_content.push(loopy_intro_2);
    intro_content.push(loopy_intro_3);
    intro_content.push(graph_intro_1);

    var outro_content = [];
    outro_content.push(outro_1);
    outro_content.push(outro_2);

    // Experimental content
    var loopy_content = [];
    loopy_content.push(loopy_crime);
    loopy_content.push(loopy_finance);
    loopy_content.push(loopy_estate);

    var graph_content = [];
    graph_content.push(graph_template);

    var graph_feedback = [];
    graph_feedback.push(feedback_template);
    
    // Survey pages
    survey_pages = intro_content.concat(loopy_content).concat(graph_content).concat(graph_feedback).concat(outro_content);
    for (i=0; i < survey_pages.length; i++) {
        if (i < intro_content.length) {
            introIdx.push(i);
        } else if (i < intro_content.length + loopy_content.length) {
            loopyIdx.push(i);
        } else if (i < intro_content.length + loopy_content.length + graph_content.length) {
            graphIdx.push(i);
        } else if (i < intro_content.length + loopy_content.length + graph_content.length + graph_feedback.length) {
            fbIdx.push(i);
        } else {
            outroIdx.push(i);
        }
    }
    // DEV
    //survey_pages = [graph_template].concat([feedback_template]);
    //survey_pages = [feedback_template];
    //survey_pages = intro_content.concat(outro_content);

    // Build page divs based on the size of the survey
    for (i=0; i<survey_pages.length; i++) {
        var page = 'page-'.concat(i.toString());
        var $new_div = $('<div>', {
            id: page,
            class: 'survey-page',
        });
        //console.log($new_div);
        $new_div.appendTo('.survey-display');

        $('#'.concat(page)).html(survey_pages[i]);
    }

    return survey_pages;
}


// BUILD BLOCK SEQUENCE, ORDER OF PAGES TO GO THROUGH
function buildBlockSeq() {
    // Generate the sequence of pages based on the desired flow

    var sequence = introIdx;

    // Loopy blocks
    for (i = 0; i < numLoopyBlocks; i++) {
        sequence = sequence.concat(loopyIdx);
    }
    // Graph block, standard
    for (i = 0; i < numGenBlocks; i++) {
        var block = graphIdx.concat(fbIdx);
        sequence = sequence.concat(block);
        genGraphIdx.push(sequence.length -2);
    }
    // Graph block, labelled or control
    for (i = 0; i < numLabelBlocks; i++) {
        var block = graphIdx.concat(fbIdx);
        sequence = sequence.concat(block);
        labGraphIdx.push(sequence.length -2);
    }

    // Add outro
    sequence = sequence.concat(outroIdx);

    return sequence;
}