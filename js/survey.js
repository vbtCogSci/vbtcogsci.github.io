// Define key survey navigation variables.
var survey_pages;

// Restart at last stop given the
var pageIdx;

var numPages; // Has to be equal to the length of survey_pages
var currentPage;

// Define navigation global variables
var introIdx = [];
var linkIdx = [];
var crimeIdx = [];
var financeIdx = [];
var estateIdx = [];
var intgraphIdx = [];
var graphIdx = [];
var fbIdx = [];
var outroIdx = [];
// Feedback indices
var nodeIdx = 0;
var nodeList = ['.x-effects', '.y-effects', '.z-effects'];
// Check for response order
var first_moved = false;
var second_moved = false;

var condSeq;


// Function calls on document load
$('document').ready(function () {
    // Build experiment according to the condition, survey_pages has to be an array of strings in order. Indices defines page number
    survey_pages = buildSurvey();

    // Build the sequencing of blocks
    condSeq = buildBlockSeq(condition);

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

    // Setup initial slider positions
    setupSliders();
    // Setup chart logic and look
    setupChart(['X', 'Y', 'Z']);
    // Setup user interface
    setupInterface();
    // If last page was a graph, load the appropriate graph
    setupPage(true);
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
            console.log('next clicked')
            condIdx += 1;
            pageIdx = condSeq[condIdx];
            // Update showed page
            //updatePage(pageIdx);
            // Setup page according to current page
            setupPage(false);
        } else {
            $('#next_button').css('display', 'none');
        }
    })

    $('#prolific-link').click(function () {
        // Put participants to last page without link once they have participated
        condIdx += 1;
        console.log('Hello')
        pageIdx = condSeq[condIdx];
        setupPage(false)
        saveState();
    })

    if (prolific == true) {
        $('#prolific-link').attr("href", 'https://app.prolific.co/submissions/complete?cc=49081850')
    }

}

function updatePage(pageIdx) {
    console.log('cond idx: '.concat(condIdx))
    console.log('Page idx: '.concat(pageIdx))
    $('.survey-page').css('display', 'none');
    //$(currentPage).css('display', 'none');

    //console.log(currentPage)
    currentPage = '#page-'.concat(pageIdx.toString());
    $(currentPage).css('display', 'flex');
    //console.log(currentPage)
}

function setupPage(init) {
    updatePage(pageIdx)
    // Disable next if next page has a loopy input
    $('#next_button').button('enable');
    if ($(currentPage).find('#data-prot').length != 0) {
        console.log('consent')
        $('#next_button').button('disable');
        setupConsent();
    } else if ($(currentPage).find('.page-4-right').length != 0) {
        $('#next_button').button('disable');
        setupLinkTraining(condIdx);
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
    if (init == false) {
        saveState();
    }
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

// Setup consent page
function setupConsent() {
    $("input:checkbox[name=consent-cb]").each(function(index, element) {
        var $checkbox = $(element);
        $checkbox.click(function () {
            var consent_counter = 0;
            $("input:checkbox[name=consent-cb]").each(function(index, element2) {
                if ($(element2).is(':checked')) {
                    consent_counter ++;
                }
            })
            if (consent_counter > 4) {
                $('#next_button').button('enable');
            } else {
                $('#next_button').button('disable');
            }
        })
    })
}

// SETUP FEEDBACK PAGES
function setupFeedback() {
    $('.feedback-slider').each(function(index, element) {
        // Init sliders
        var $slider = $(element);
        var f_l = $slider.attr('id');
        if (f_l == 'XonY' | f_l == 'YonX' | f_l == 'ZonX' | f_l == 'AonB' | f_l == 'BonA' | f_l == 'ConA') {
            $slider.addClass('first-slider');
        } else {
            $slider.addClass('second-slider');
        }
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
                console.log($(this).hasClass('first-slider'))
                if (($(this).hasClass('first-slider')) && !first_moved) {
                    first_moved = true
                } else if (($(this).hasClass('second-slider')) && !second_moved) {
                    second_moved = true
                }
            },
            stop: function( event, ui) {
                if (second_moved && first_moved) {
                    $('#val-btn').button({disabled: false});
                    $('#val-button').button({disabled: false});
                }
            }
        });
    });

    // Link training
    $('#handle-AonB').on('mousedown', function() {
        $('#handle-AonB').text($('#AonB').slider('value'));
        first_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-AonC').on('mousedown', function() {
        $('#handle-AonC').text($('#AonC').slider('value'));
        second_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-BonA').on('mousedown', function() {
        $('#handle-BonA').text($('#BonA').slider('value'));
        first_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-BonC').on('mousedown', function() {
        $('#handle-BonC').text($('#BonC').slider('value'));
        second_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-ConA').on('mousedown', function() {
        $('#handle-ConA').text($('#ConA').slider('value'));
        first_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-ConB').on('mousedown', function() {
        $('#handle-ConB').text($('#ConB').slider('value'));
        second_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })

    // Graphs feedback
    $('#handle-XonY').on('mousedown', function() {
        $('#handle-XonY').text($('#XonY').slider('value'));
        first_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-XonZ').on('mousedown', function() {
        $('#handle-XonZ').text($('#XonZ').slider('value'));
        second_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-YonX').on('mousedown', function() {
        $('#handle-YonX').text($('#YonX').slider('value'));
        first_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-YonZ').on('mousedown', function() {
        $('#handle-YonZ').text($('#YonZ').slider('value'));
        second_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-ZonX').on('mousedown', function() {
        $('#handle-ZonX').text($('#ZonX').slider('value'));
        first_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-ZonY').on('mousedown', function() {
        $('#handle-ZonY').text($('#ZonY').slider('value'));
        second_moved = true;
        if (second_moved && first_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })

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
    $('#val-btn').button().click(function () {
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
    //console.log('Prev Idx: '.concat(nodeIdx.toString()))
    if (nodeIdx < 2) {
        //console.log('Less than 2')
        var prev = nodeList[nodeIdx];
        $(prev).css('display', 'none');
        nodeIdx += 1;
        var next = nodeList[nodeIdx];
        $(next).css("visibility", "visible")
        $(next).css('display', 'flex');
        $('#val-button').button({disabled: true});
        $('#val-btn').button({disabled: true});
        
        // Reset moved
        first_moved = false;
        second_moved = false;
    } else if (nodeIdx == 2 && ['crime', 'finance', 'estate'].includes(currentModel)) {
        //console.log('2 and going for qual')
        var prev = nodeList[nodeIdx];
        $(prev).css('display', 'none');
        nodeIdx += 1;
        $('.graph-pred-rec-right').css('display', 'flex');
        $('#val-button').button({disabled: true});
        $('#val-btn').button({disabled: true});

    } else {
        console.log('resetting')
        var prev = nodeList[nodeIdx];
        // Disable sliders to prevent moving more
        $(prev).css("visibility", "hidden")
        // Reset node index
        nodeIdx = 0;
        // Disable nav buttons and enable next to move forward
        $('#start_button').button({disabled: false});
        $('#val-button').button({disabled: true});
        $('#val-btn').button({disabled: true});
        $('#next_button').button({disabled: false});

        // SEND TO DATABASE
        if (currentModel.slice(0,4) == 'link') {
            saveLinkData();
        } else {
            saveGraphData();
        }
    }
    //console.log('Next Idx: '.concat(nodeIdx.toString()))
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
    var intro_content = [];
    intro_content.push(consent_page_1);
    intro_content.push(consent_page_2);
    intro_content.push(causal_models_intro_1);
    intro_content.push(causal_models_intro_2);
    intro_content.push(causal_models_intro_3);

    var link_content = [];
    link_content.push(links_template);

    var intro_graph = [];
    intro_graph.push(graph_intro_1);
    intro_graph.push(graph_intro_2);
    intro_graph.push(graph_intro_3);
    intro_graph.push(graph_intro_4);

    var outro_content = [];
    outro_content.push(outro_1);
    outro_content.push(outro_2);
    outro_content.push(outro_3);
    outro_content.push(outro_4);

    // Experimental content
    var crime_links = [];
    crime_links.push(link_crime);
    var finance_links = [];
    finance_links.push(link_finance);
    var estate_links = [];
    estate_links.push(link_estate);

    var graph_content = [];
    graph_content.push(graph_template);
    
    // Survey pages
    survey_pages = intro_content.concat(link_content).concat(crime_links).concat(finance_links).concat(estate_links).concat(intro_graph).concat(graph_content).concat(outro_content);
    for (i=0; i < survey_pages.length; i++) {
        if (i < intro_content.length) {
            introIdx.push(i);
        } else if (i < intro_content.length + link_content.length) {
            linkIdx.push(i);
        } else if (i < intro_content.length + link_content.length + crime_links.length) {
            crimeIdx.push(i)
        } else if (i < intro_content.length + link_content.length + crime_links.length + finance_links.length) {
            financeIdx.push(i)
        } else if (i < intro_content.length + link_content.length + crime_links.length + finance_links.length + estate_links.length) {
            estateIdx.push(i)
        } else if (i < intro_content.length + link_content.length + crime_links.length + finance_links.length + estate_links.length + intro_graph.length) {
            intgraphIdx.push(i);
        } else if (i < intro_content.length + link_content.length + crime_links.length + finance_links.length + estate_links.length + intro_graph.length + graph_content.length) {
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

    //return survey_pages;
}


// BUILD BLOCK SEQUENCE, ORDER OF PAGES TO GO THROUGH
function buildBlockSeq(condition) {
    // Generate the sequence of pages based on the desired flow

    var sequence = introIdx;
    

    // link blocks
    for (i = 0; i < numLinkBlocks; i++) {
        sequence = sequence.concat(linkIdx); 
        //console.log('Hello link'.concat(i.toString()))
        linkTrainingIdx.push(sequence.length - 1);
    }

    // Link Scenario
    // Criminality
    if (condition != 'control') {
        sequence = sequence.concat(crimeIdx)
        sequence = sequence.concat(linkIdx)
        linkScenarioIdx.push(sequence.length - 1)
    } 
    
    // Finance
    //sequence = sequence.concat(financeIdx)
    //sequence = sequence.concat(linkIdx)
    //linkScenarioIdx.push(sequence.length - 1)
    //// Estate
    //sequence = sequence.concat(estateIdx)
    //sequence = sequence.concat(linkIdx)
    //linkScenarioIdx.push(sequence.length - 1)

    // Graph intro
    sequence = sequence.concat(intgraphIdx);

    for (i=0; i < numGenBlocks + numLabelBlocks ; i++) {
        sequence = sequence.concat(graphIdx);
        //if (i == 0 || i % 2 != 0) {
        //    // 0 and odd indices are generic
        //    genGraphIdx.push(sequence.length - 1)
        //} else {
        //    // Even numbers are labelled / control labelled
        //    labGraphIdx.push(sequence.length - 1);
        //}
        if (i < numGenBlocks) {
            //console.log(i)
            genGraphIdx.push(sequence.length - 1);
        } else {
            labGraphIdx.push(sequence.length - 1);
        }
    }

    // Add outro
    sequence = sequence.concat(outroIdx);

    return sequence;
}