// Define key survey navigation variables.
var survey_pages;

// Restart at last stop given the
var pageIdx;

var numPages; // Has to be equal to the length of survey_pages
var currentPage;

// Define navigation global variables
var introIdx = [];
var loopyIdx = [];
var intgraphIdx = [];
var graphIdx = [];
var fbIdx = [];
var outroIdx = [];
// Feedback indices
var nodeIdx = 0;
var nodeList = ['.x-effects', '.y-effects', '.z-effects'];

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

    // Display current page
    $(currentPage).css({'display':'flex'});
    // Set up logic for navigation
    setupNavigation();
    // Set up logic for submitting loopy link
    setupLoopySubmit();
    // Set up logic for slider feedback
    setupFeedback();
    // Set up logic for outro feedback (demographics and technical issues)
    setupOutro();
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
    }).css('display', 'none');
    $('#next_button').click(function () {
        if (condIdx < numPages-1) {
            condIdx += 1;
            pageIdx = condSeq[condIdx];
            // Update showed page
            updatePage(pageIdx);
            // Setup page according to current page
            setupPage();
        } else {
            $('#next_button').css('display', 'none');
        }
    })

    //$('.accordion').accordion({ heightStyle: "content" });
}

function updatePage(pageIdx) {
    $(currentPage).css('display', 'none');
    //console.log(currentPage)
    currentPage = '#page-'.concat(pageIdx.toString());
    $(currentPage).css('display', 'flex');
    //console.log(currentPage)
}

function setupPage() {
    // Disable next if next page has a loopy input
    $('#next_button').button('enable');
    if ($(currentPage).find('.loopy-link-container').length != 0) {
        //console.log($(currentPage).find('.loopy-link-container').length);
        $('#next_button').button('disable');
    } else if ($(currentPage).find('#spanLabels').length != 0) {
        if (condition == 'control') {
            $('#spanLabels').css('display', 'none');
        }
    } else if ($(currentPage).find('.game-display').length != 0) {
        console.log('Game')
        $('#next_button').button('disable');
        setupGame(condIdx);
    } else if ($(currentPage).find('.gender-field').length != 0) {
        $('#next_button').button('disable');
    } else if ($(currentPage).find('.browser-field').length != 0) {
        saveDemographics()
    } else if ($(currentPage).find('#prolific-link').length != 0) {
        saveTechnicalFb();
        $('#next_button').css('display', 'none')
    }
    // clear game interval
    clearInterval(gameLoop);
    // Save current survey state
    saveState();
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

    } else if (link.includes('https://ncase.me/loopy/v1.1/?data=')) {
        $loopyAlert.css({
            'color':'green'
        }).html('<br>Thank you, your link is valid, press Next to move on.');
        // Enable Next Button
        $('#next_button').button('enable');

        // SEND TO DATABASE
        db.ref('data').child(uid).child($name.slice(1,-1)).set(link);

    } else {
        $loopyAlert.css({
            'color':'red'
        }).html('<br>Oops, I do not recognise this link, please make sure you use the Export as link button on the right-hand side of the loopy page');
    }
}


// SETUP FEEDBACK PAGES
function setupFeedback() {
    $('.feedback-slider').each(function(index, element) {
        // Init sliders
        var $slider = $(element);
        //console.log($slider);
        var $handle = $('#handle-'.concat($slider.attr('id'))).addClass( "fb-handle" );
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

    // Set up validate button
    $('#val-button').button().click(function () {
        nextNode();
    });

    $("input:radio[name=radio-1]").each(function (index, element) {
        var $radioB = $(element)
        $radioB.click(function () {
            if ($('#reason-qual').val() != "") {
                $('#val-button').button({disabled: false});
            }
        }) 
    })

    $('#reason-qual').on('input', function() {
        var $radioSense = $("input:radio[name=radio-1]:checked").attr('id');
        if ($radioSense != null) {
            $('#val-button').button({disabled: false});
        }
    })

}

function nextNode () {
    if (nodeIdx < 2) {
        var prev = nodeList[nodeIdx];
        $(prev).css('display', 'none');
        nodeIdx += 1;
        var next = nodeList[nodeIdx];
        $(next).css('display', 'flex');
    } else if (nodeIdx == 2 && ['crime', 'finance', 'estate'].includes(currentModel)) {
        var prev = nodeList[nodeIdx];
        $(prev).css('display', 'none');
        nodeIdx += 1;
        $('.graph-pred-rec-right').css('display', 'flex');
        $('#val-button').button({disabled: true});

    } else {
        nodeIdx = 0;
        $('#start_button').button({disabled: false});
        $('#val-button').button({disabled: true});
        $('#next_button').button({disabled: false});

        // SEND TO DATABASE
        saveGraphData();
    }
    
}

// SET UP OUTRO FIELDS
function setupOutro () {
    // Age spinner
    var $age = $('#age').spinner({
        max: 100,
        min: 16,
    });
    $age.spinner('value', '35')

    // Activity select menu
    $('#activity_selector').selectmenu().selectmenu( "menuWidget" ).addClass( "overflow" );
    $('#activity_selector-button').css('width', '70%')

    $("input:radio[name=gender]").each(function (index, element) {
        var $radioB = $(element)
        $radioB.click(function () {
            if (checkValid() == true) {
                $('#next_button').button({disabled: false});
            }
        }) 
    })

    $("input:radio[name=causal-familiarity]").each(function (index, element) {
        var $radioB = $(element)
        $radioB.click(function () {
            if (checkValid() == true) {
                $('#next_button').button({disabled: false});
            }
        }) 
    })

    $("input:radio[name=causal-familiarity]").each(function (index, element) {
        var $radioB = $(element)
        $radioB.click(function () {
            if (checkValid() == true) {
                $('#next_button').button({disabled: false});
            }
        }) 
    })

    $("input:radio[name=loopy-fb]").each(function (index, element) {
        var $radioB = $(element)
        $radioB.click(function () {
            if (checkValid() == true) {
                $('#next_button').button({disabled: false});
            }
        }) 
    })

    $("input:radio[name=graph-fb]").each(function (index, element) {
        var $radioB = $(element)
        $radioB.click(function () {
            if (checkValid() == true) {
                $('#next_button').button({disabled: false});
            }
        }) 
    })

    $('#activity_selector').selectmenu({
        select: function( event, ui ) {
            if (checkValid() == true) {
                $('#next_button').button({disabled: false});
            }
        }
    });

    // Technical feedback
    $('input:checkbox').checkboxradio()
}

function checkValid() {
    var $radioGender = $("input:radio[name=gender]:checked").attr('id');
    if ($radioGender == null) {
       return false 
    }
    var $radioCausalFam = $("input:radio[name=causal-familiarity]:checked").attr('id');
    if ($radioCausalFam == null) {
        return false
    }
    var $radioLoopy = $("input:radio[name=loopy-fb]:checked").attr('id');
    if ($radioLoopy == null) {
        return false
    }
    var $radioGraph = $("input:radio[name=graph-fb]:checked").attr('id');
    if ($radioGraph == null) {
        return false
    }
    if ($('#activity_selector').val() == 'none') {
        return false
    }
    return true
}

// SURVEY BUILDING FUNCTION
function buildSurvey() {
    var survey_pages;

    // Intro content
    var intro_loopy = [];
    intro_loopy.push(consent_page);
    intro_loopy.push(causal_models_intro_1);
    intro_loopy.push(causal_models_intro_2);
    intro_loopy.push(loopy_intro_1);
    intro_loopy.push(loopy_intro_2);
    intro_loopy.push(loopy_intro_3);

    var intro_graph = [];
    intro_graph.push(graph_intro_1);
    intro_graph.push(graph_intro_2);
    intro_graph.push(graph_intro_3);
    intro_graph.push(graph_intro_4);

    var outro_content = [];
    outro_content.push(outro_1);
    outro_content.push(outro_2);
    outro_content.push(outro_3);

    // Experimental content
    var loopy_content = [];
    loopy_content.push(loopy_crime);
    loopy_content.push(loopy_finance);
    loopy_content.push(loopy_estate);

    var graph_content = [];
    graph_content.push(graph_template);
    
    // Survey pages
    survey_pages = intro_loopy.concat(loopy_content).concat(intro_graph).concat(graph_content).concat(outro_content);
    for (i=0; i < survey_pages.length; i++) {
        if (i < intro_loopy.length) {
            introIdx.push(i);
        } else if (i < intro_loopy.length + loopy_content.length) {
            loopyIdx.push(i);
        } else if (i < intro_loopy.length + loopy_content.length + intro_graph.length) {
            intgraphIdx.push(i);
        } else if (i < intro_loopy.length + loopy_content.length + intro_graph.length + graph_content.length) {
            graphIdx.push(i);
        } else {
            outroIdx.push(i);
        }
    }

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

    // DEV COMMENT OUT TO START AT BEGINNING //
    //var sequence = [introIdx[0]];
    // DEV COMMENT OUT TO START AT BEGINNING //

    // Graph intro
    sequence = sequence.concat(intgraphIdx);

    for (i=0; i < numGenBlocks + numLabelBlocks ; i++) {
        sequence = sequence.concat(graphIdx);
        if (i == 0 || i % 2 != 0) {
            // 0 and odd indices are generic
            genGraphIdx.push(sequence.length -1)
        } else {
            // Even numbers are labelled / control labelled
            labGraphIdx.push(sequence.length -1);
        }
    }

    // Add outro
    sequence = sequence.concat(outroIdx);

    return sequence;
}