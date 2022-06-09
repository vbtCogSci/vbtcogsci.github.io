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
var scenarioIdx = [];
var intgraphIdx = [];
var graphIdx = [];
var fbIdx = [];
var outroIdx = [];


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
    // Set up logic for slider feedback
    setupFeedback();
    // Set up logic for outro feedback (demographics and technical issues)
    setupOutro();

    // Set up graph checks
    setupGraphChecks();

    // Setup initial slider positions
    setupSliders();
    // Setup chart logic and look
    setupChart(['X', 'Y', 'Z']);
    // Setup game generic user interface
    setupGameCanvas();
    // If last page was a graph, load the appropriate graph
    setupPage(true);
});


// SURVEY BUILDING FUNCTION
// Called in survey.document.ready() (general initialisation function)
// Variables called here are html content from pages.js
// The survey always contains all pages, use buildBlockSeq to choose which blocks to show and how many times
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
    //intro_graph.push(graph_intro_4);

    var outro_content = [];
    outro_content.push(outro_1);
    outro_content.push(outro_2);
    outro_content.push(outro_3);
    outro_content.push(outro_4);

    // Experimental content
    var scenario_links = [0, 0, 0];
    scenario_links[condLabel.indexOf('crime')] = link_crime;
    scenario_links[condLabel.indexOf('finance')] = link_finance;
    scenario_links[condLabel.indexOf('estate')] = link_estate;

    //var crime_links = [];
    //crime_links.push(link_crime);
    //var finance_links = [];
    //finance_links.push(link_finance);
    //var estate_links = [];
    //estate_links.push(link_estate);

    var graph_content = [];
    graph_content.push(graph_template);
    
    // Survey pages
    survey_pages = intro_content.concat(link_content).concat(scenario_links).concat(intro_graph).concat(graph_content).concat(outro_content);
    //survey_pages = intro_content.concat(link_content).concat(crime_links).concat(finance_links).concat(estate_links).concat(intro_graph).concat(graph_content).concat(outro_content);
    for (i=0; i < survey_pages.length; i++) {
        if (i < intro_content.length) {
            introIdx.push(i);
        } else if (i < intro_content.length + link_content.length) {
            linkIdx.push(i);
        } else if (i < intro_content.length + link_content.length + scenario_links.length) {
            scenarioIdx.push(i)
        } else if (i < intro_content.length + link_content.length + scenario_links.length + intro_graph.length) {
            intgraphIdx.push(i);
        } else if (i < intro_content.length + link_content.length + scenario_links.length + intro_graph.length + graph_content.length) {
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
// Called in survey.document.ready() (general initialisation function)
// Hard coded in the function call
function buildBlockSeq() {
    // Generate the sequence of pages based on the desired flow

    var sequence = introIdx;
    

    // link blocks
    for (i = 0; i < numLinkBlocks; i++) {
        sequence = sequence.concat(linkIdx); 
        //console.log('Hello link'.concat(i.toString()))
        linkTrainingIdx.push(sequence.length - 1);
    }

    if (experiment == 'exp1') {
        // Link Scenario
        // Criminality
        // Scenario page
        sequence = sequence.concat(scenarioIdx[condLabel.indexOf('crime')])
        // Links
        sequence = sequence.concat(linkIdx)
        linkScenarioIdx.push(sequence.length - 1)

    } else if (experiment == 'exp5') {
        // Add both scenarios at the end of the link trials in a random order
        for (i = 0; i < scenarioOrder.length; i++) {
            sequence = sequence.concat(scenarioIdx[condLabel.indexOf(scenarioOrder[i])])
            sequence = sequence.concat(linkIdx)
            linkScenarioIdx.push(sequence.length - 1)
        }
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

    // Must allow for alternating generic and labelled blocks
    // All experiment must have a generic structure (e.g. [gen, label, gen, label] or [gen, label, label, label])
    var trialType;
    var generic_idx = 0;
    var label_idx = 0;
    for (i = 0; i < taskStructure.length; i++) {
        trialType = taskStructure[i];
        // If running experiment 3 and 4, add scenarios in between each labelled trials
        if (trialType == 'label' && (experiment == 'exp3' || experiment == 'exp4')) {
            var scenIdx = condLabel.indexOf(condLabel[label_idx])
            // Scenario page
            sequence = sequence.concat(scenarioIdx[scenIdx])
            // Links
            sequence = sequence.concat(linkIdx)
            linkScenarioIdx.push(sequence.length - 1)
            
        }
        
        // Add a graph trial index to the experiment's screen sequence
        sequence = sequence.concat(graphIdx);
        
        // Add current sequence idx to appropriate trial type
        if (trialType == 'generic') {
            genGraphIdx.push(sequence.length - 1);
            generic_idx += 1;
        } else {
            labGraphIdx.push(sequence.length - 1);
            label_idx += 1;
        }
    }

    // Add outro
    sequence = sequence.concat(outroIdx);

    return sequence;
}

