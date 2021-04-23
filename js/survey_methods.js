// Methods that deal with survey flow and logic but are not directly related to the game (main experimental content)
// Methods here, survey_methods are called at the initialisation of the experiment, while methods in interface_methods are called during the experiment as local setup or reset functions
// I. General flow logic, next buttons, change page, etc.
// II. Concerned with consent, demographics, links training, attention quiz, etc.

//// Global variables

// Feedback indices
var nodeIdx = 2;
var nodeList = ['.x-effects', '.y-effects', '.z-effects'];
// Check for response order
var first_moved = false;
var second_moved = false;
var third_moved = false;
var fourth_moved = false;
var fifth_moved = false;
var sixth_moved = false;

var video_elapsed = 0;
var videorun;
var video_watched = false;


//// I. General flow logic, next buttons, change page, etc.

// Navigation functions 
function setupNavigation() {
    $('.nav-button').button();
    $('#prev_button').click(function () {
        if (pageIdx > 0) {
            condIdx -= 1;
            pageIdx = condSeq[condIdx];
            
            // Setup the page
            setupPage(false);

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
        pageIdx = condSeq[condIdx];
        setupPage(false)
        saveState();
    })

    if (prolific == true) {
        $('#prolific-link').attr("href", 'https://app.prolific.co/submissions/complete?cc=49081850')
    }
}


// Called each time the next button is successfully pressed, sets up the next page of the experiment
function setupPage(init) {
    updatePage(pageIdx)
    // Disable next if next page has a loopy input
    $('#next_button').button('enable');
    if ($(currentPage).find('#data-prot').length != 0) {
        // If consent page
        console.log('consent')
        setupConsent();
        $('#next_button').button('disable');
    } else if ($(currentPage).find('.page-4-right').length != 0) {
        // If link training page
        setupLinkTraining(condIdx);
        $('#next_button').button('disable');
    } else if ($(currentPage).find('#spanLabels').length != 0) {
        // If game presentation page
        if (condition == 'control') {
            $('#spanLabels').css('display', 'none');
        }
    } else if ($(currentPage).find('#pres-video').length != 0) {
        // If video presentation page
        if (!video_watched) {
            $('#next_button').button('disable');
        }
    } else if ($(currentPage).find('#submit-quiz').length != 0) {
        // If attention and game understanding quiz
        $('#next_button').button('disable');
        $('#submit-quiz').button('disable');
    }else if ($(currentPage).find('.game-display').length != 0) {
        // If game page
        console.log('Game')
        setupGame(condIdx);
        $('#next_button').button('disable');
    } else if ($(currentPage).find('.gender-field').length != 0) {
        // If demographics
        $('#next_button').button('disable');
    } else if ($(currentPage).find('.browser-field').length != 0) {
        // If finished demographics
        saveDemographics()
    } else if ($(currentPage).find('#prolific-link').length != 0) {
        // If last page
        saveTechnicalFb();
        $('#next_button').css('display', 'none')
    }
    // clear game interval in all cases
    clearInterval(gameLoop);
    // Save current survey state
    if (init == false) {
        saveState();
    }

    // If debug, always make next available
    if (debug == true) {
        $('#next_button').button('enable');
        $('#prev_button').css('display', 'flex')
    }
}

// Displays the next page by hiding the current one and showing the next
// Called in survey.setupPage()
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


//// II. Concerned with consent, demographics, links training, attention quiz, etc.

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
// Called in survey.document.ready() (general initialisation function)
function setupFeedback() {
    $('.feedback-slider').each(function(index, element) {
        // Init sliders
        var $slider = $(element);
        var f_l = $slider.attr('id');
        //if (f_l == 'XonY' | f_l == 'YonX' | f_l == 'ZonX' | f_l == 'AonB' | f_l == 'BonA' | f_l == 'ConA') {
        //    $slider.addClass('first-slider');
        //} else {
        //    $slider.addClass('second-slider');
        //}
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
                    first_moved = true;
                } else if (($(this).hasClass('second-slider')) && !second_moved) {
                    second_moved = true;
                } else if (($(this).hasClass('third-slider')) && !third_moved) {
                    third_moved = true;
                } else if (($(this).hasClass('fourth-slider')) && !fourth_moved) {
                    fourth_moved = true;
                } else if (($(this).hasClass('fifth-slider')) && !fifth_moved) {
                    fifth_moved = true;
                } else if (($(this).hasClass('sixth-slider')) && !sixth_moved) {
                    sixth_moved = true;
                }
            },
            stop: function( event, ui) {
                if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
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
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-AonC').on('mousedown', function() {
        $('#handle-AonC').text($('#AonC').slider('value'));
        second_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-BonA').on('mousedown', function() {
        $('#handle-BonA').text($('#BonA').slider('value'));
        third_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-BonC').on('mousedown', function() {
        $('#handle-BonC').text($('#BonC').slider('value'));
        fourth_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-ConA').on('mousedown', function() {
        $('#handle-ConA').text($('#ConA').slider('value'));
        fifth_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-ConB').on('mousedown', function() {
        $('#handle-ConB').text($('#ConB').slider('value'));
        sixth_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })

    // Graphs feedback
    $('#handle-XonY').on('mousedown', function() {
        $('#handle-XonY').text($('#XonY').slider('value'));
        first_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-XonZ').on('mousedown', function() {
        $('#handle-XonZ').text($('#XonZ').slider('value'));
        second_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-YonX').on('mousedown', function() {
        $('#handle-YonX').text($('#YonX').slider('value'));
        third_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-YonZ').on('mousedown', function() {
        $('#handle-YonZ').text($('#YonZ').slider('value'));
        fourth_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-ZonX').on('mousedown', function() {
        $('#handle-ZonX').text($('#ZonX').slider('value'));
        fifth_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })
    $('#handle-ZonY').on('mousedown', function() {
        $('#handle-ZonY').text($('#ZonY').slider('value'));
        sixth_moved = true;
        if (second_moved && first_moved && third_moved && fourth_moved && fifth_moved && sixth_moved) {
            $('#val-btn').button({disabled: false});
            $('#val-button').button({disabled: false});
        }
    })

    $('.ui-slider-handle').css({
        'width': '1.5em',
        'height': '1.6em',
        'top': '50%',
        'left': '50%',
        'margin-top': '-.8em',
        'margin-left': '-0.75em',
        'text-align': 'center',
        'line-height': '1.6em'
      });

    // Set up validate button for game 
    $('#val-button').button().click(function () {
        nextNode();
    });

    // Val button for link training, with checks
    $('#val-btn').button().click(function () {
        var report = [
            $('#AonB').slider("value"),
            $('#AonC').slider("value"),
            $('#BonA').slider("value"),
            $('#BonC').slider("value"),
            $('#ConA').slider("value"),
            $('#ConB').slider("value")
        ];
        if (['linkscrime', 'linksestate', 'linksfinance'].includes(currentModel)) {
            nextNode();
        } else if (checkReport(report, currentModel) == true) {
            nextNode();
        }
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

// Logic to the link training blocks
// Called when a participants validates feedback from link sliders or game sliders (setup in survey_methods.setupFeedback) 
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
    } else if (nodeIdx == 2 && ['crime', 'finance', 'estate', 'scrambled'].includes(currentModel)) {
        //console.log('2 and going for qual')
        var prev = nodeList[nodeIdx];
        $('.feedback-container').css('display', 'none');
        $('.slider_box_container').css('display', 'none');
        nodeIdx += 1;
        $('.graph-pred-rec-right').css('display', 'flex');
        $('#val-button').button({disabled: true});
        $('#val-btn').button({disabled: true});

    } else {
        console.log('resetting')
        var prev = nodeList[nodeIdx];
        // Disable sliders to prevent moving more
        //$(prev).css("visibility", "hidden")
        $('.feedback-slider').slider({disabled: true});
        // Reset node index
        nodeIdx = 2;
        // Disable nav buttons and enable next to move forward
        $('#start_button').button({disabled: false});
        $('#val-button').button({disabled: true});
        $('#val-btn').button({disabled: true});
        $('#next_button').button({disabled: false});

        // SEND TO DATABASE and save prior model if applicable
        if (currentModel.slice(0,4) == 'link') {
            // Record prior model response if current block is prior elicitation
            if (['linkscrime', 'linksestate', 'linksfinance'].includes(currentModel) && experiment == 'exp3') {
                var out_prior = record_prior(currentModel);
                scrambler_wrapper(out_prior[0], out_prior[1], condDifficulty[currentLinkIdx]);
            }
            saveLinkData();
        } else {
            saveGraphData();
            if (['crime', 'finance', 'estate'].includes(currentModel) && experiment == 'exp3') {
                console.log('Updating link index')
                currentLinkIdx += 1;
            }    
        }
        
        
    }
    //console.log('Next Idx: '.concat(nodeIdx.toString()))
}


// Check that the report is correct in the links training blocks
// Called when a participants validates feedback from link sliders (setup in survey.setupFeedback)
function checkReport(report, currentModel) {
    if (JSON.stringify(report) == '[0,0,0,0,0,0]') {
        $('#error-msg').html('Incorrect: there is at least one link in the diagram.')
        return false;
    }

    if (currentModel == 'links1') {
        var correct = [-1, 0, 0, 0, 0, 0];
        console.log(report)
        console.log(correct)
        if (arraysEqual(report, correct)) {
            $('#error-msg').html('')
            return true;
        } else if (arraysEqual(report.slice(2), correct.slice(2))) {
            if (report[1] != correct[1]) {
                $('#error-msg').html('Incorrect: think about the direction of the arrow, it goes from A to B.')
            } else if (report[0] != correct[0]) {
                $('#error-msg').html('Incorrect: almost there, what is the sign of the arrow? Does it indicates a positive or negative link?')
            }
            return false;
        } else if (!arraysEqual(report.slice(2), correct.slice(2))) {
            $('#error-msg').html('Incorrect: which variables are causally linked?')
            return false;
        }
    } else if (currentModel == 'links2') {
        var correct = [0, -1, 1, -1, 0, 0];
        console.log(report)
        console.log(correct)
        if (arraysEqual(report, correct)) {
            $('#error-msg').html('')
            return true;
        } else if (!arraysEqual(report.slice(4), [0, 0])) {
            $('#error-msg').html('Incorrect: C does not cause other variables, look at the direction of the arrows.')
            return false;
        } else if (!arraysEqual(report.slice(2, 4), [1, -1])) {
            if (report.slice(2, 4).includes(0)) {
                $('#error-msg').html('Incorrect: look at B, it affects both A and C')
            } else {
                $('#error-msg').html('Incorrect: look at the signs of the arrows from B, are they positive or negative?')
            }
            return false;
        } else if (!arraysEqual(report.slice(1, 2), [0, -1])) {
            $('#error-msg').html('Incorrect: check the links of variable A, something is wrong.')
            return false;
        }
    } else if (currentModel == 'links3') {
        var correct = [1, 1, 0, 2, 0, 0];
        console.log(report)
        console.log(correct)
        if (arraysEqual(report, correct)) {
            $('#error-msg').html('')
            return true;
        } else if (!arraysEqual(report.slice(4), [0, 0])) {
            $('#error-msg').html('Incorrect: is cough the cause or the effect?')
            return false;
        } else if (!arraysEqual(report.slice(2, 4), [0, 2])) {
            if (report[2] != 0) {
                $('#error-msg').html('Incorrect: does the flu causes asthma?')
            } else if (report[3] != 2) {
                $('#error-msg').html('Incorrect: what is the size and the sign of the effects of the flu on cough?')
            }
            return false;
        } else if (!arraysEqual(report.slice(1, 2), [0, 1])) {
            if (report[0] != 1) {
                $('#error-msg').html('Incorrect: what does the research paper say about asthma and the flu?')
            } else if (report[1] != 1) {
                $('#error-msg').html('Incorrect: what is the size and the sign of the effects of asthma on cough?')
            }
            return false;
        }
    } 
}


// Sets up the checks for the game training pages (video + quiz)
// Called in survey.document.ready() (general initialisation function)
function setupGraphChecks() {
    // Check graph comprehension
    $('.video-control').button();
    $('#play_btn').click(function () {
        var video = $('#pres-video')[0];
        if( video.paused ) {
            video.play();
        }
        console.log('clicked')
        var videorun = setInterval(function () {
            //console.log(video_elapsed)
            video_elapsed += 1;
            if (video_elapsed > 20) {
                $('#next_button').button({disabled: false});
                clearInterval(videorun);
                video_watched = true;
            }
        }, 2000)
    });

    $('#pause_btn').click(function () {
        var video = $('#pres-video')[0];
        if( !video.paused ) {
            video.pause();
        }
    });

    // Verification quiz

    $("input:radio[name=quiz-1]").each(function (index, element) {
        var $radioB = $(element)
        $radioB.click(function () {
            if (checkValidQuiz() == true) {
                $('#submit-quiz').button({disabled: false});
            }
        }) 
    })

    $("input:radio[name=quiz-2]").each(function (index, element) {
        var $radioB = $(element)
        $radioB.click(function () {
            if (checkValidQuiz() == true) {
                $('#submit-quiz').button({disabled: false});
            }
        }) 
    })

    $("input:radio[name=quiz-3]").each(function (index, element) {
        var $radioB = $(element)
        $radioB.click(function () {
            if (checkValidQuiz() == true) {
                $('#submit-quiz').button({disabled: false});
            }
        }) 
    })

    $('#submit-quiz').button().click(function () {
        var responses = [
            $("input:radio[name=quiz-1]:checked").attr('id'),
            $("input:radio[name=quiz-2]:checked").attr('id'),
            $("input:radio[name=quiz-3]:checked").attr('id')
        ]
        var correct = ["quiz-1-2","quiz-2-2","quiz-3-3"];
        if (arraysEqual(correct, responses)) {
            $('#submit-quiz').button({disabled: true});
            $('#next_button').button({disabled: false});
        } else {
            condIdx = condIdx - 2;
            pageIdx = condSeq[condIdx];
            setupPage(false);
            $('#change-onfail').html('You got the answers wrong, you can reread the instructions and, if necessary, rewatch the video before trying it again.');
            $('#change-onfail').css('color', 'red');
        }
        
    });
}

// Checks that the quiz responses are valid
// Called when participants validate the quiz
function checkValidQuiz() {
    var $quiz1 = $("input:radio[name=quiz-1]:checked").attr('id');
    if ($quiz1 == null) {
       return false 
    }
    var $quiz2 = $("input:radio[name=quiz-2]:checked").attr('id');
    if ($quiz2 == null) {
        return false
    }
    var $quiz3 = $("input:radio[name=quiz-3]:checked").attr('id');
    if ($quiz3 == null) {
        return false
    }
    return true
}

// SET UP OUTRO FIELDS
// Called in survey.document.ready() (general initialisation function)
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

// Checks that all demographics have been filled
// Called when participants answer a demographic field, if true, will let participants click the "next" page button
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

