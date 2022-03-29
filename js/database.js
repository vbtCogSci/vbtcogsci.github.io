// Methods pushing data to the firebase database, called throughout the experiment
// Methods name are self explanatory on what they refer to

function saveState(db_update=true) {    
    localStorage.setItem('condition', condition)
    localStorage.setItem('condIdx', condIdx);
    localStorage.setItem('currentModel', currentModel);
    localStorage.setItem('currentLabelLinkIdx', currentLabelLinkIdx)
    localStorage.setItem('currentGenericLinkIdx', currentGenericLinkIdx)
    localStorage.setItem('condLabel', condLabel)
    localStorage.setItem('condDifficulty', condDifficulty)

    if (db_update == true) {
        db.ref('states').child(uid).child('condition').set(condition);
        db.ref('states').child(uid).child('state').set(currentModel);
        db.ref('states').child(uid).child('condIdx').set(condIdx);
        db.ref('states').child(uid).child('currentLabelLinkIdx').set(currentLabelLinkIdx);
        db.ref('states').child(uid).child('currentGenericLinkIdx').set(currentGenericLinkIdx);
        db.ref('states').child(uid).child('condLabel').set(condLabel);
        db.ref('states').child(uid).child('condDifficulty').set(condDifficulty);

        
        if (condIdx < 2) {
            // Save date and time of submission
            startTime = Date.now();
            db.ref('date').child(uid).child('start').set(Date.now());
        }

    }
}


// Record Prior Model
// Called survey_methods.nextNode()
function record_prior(linksModel) {

    var prior_report = [
        $('#AonB').slider("value"),
        $('#AonC').slider("value"),
        $('#BonA').slider("value"),
        $('#BonC').slider("value"),
        $('#ConA').slider("value"),
        $('#ConB').slider("value")
    ];

    // For test purposes
    prior_test = prior_report;
    prior_test_order = currentLabels;

    if (linksModel == 'linkscrime') {
        var model_idx = 0;
    } else if (linksModel == 'linksfinance') {
        var model_idx = 1;
    } else if (linksModel == 'linksestate') {
        var model_idx = 2;
    }

    var prior_order = 'links_'.concat(model_idx).concat('_').concat(currentLabels[0].slice(0, 3)).concat(currentLabels[1].slice(0, 3)).concat(currentLabels[2].slice(0, 3));

    return [prior_report, prior_order]
}


function saveScramblingInfo(model_preset, ned_prior) {

    localStorage.setItem(condLabel[currentLabelLinkIdx].concat('_').concat(condDifficulty[currentLabelLinkIdx]), model_preset[0])
    db.ref('states').child(uid).child(condDifficulty[currentLabelLinkIdx]).set(model_preset[0]);
    db.ref('data').child(uid).child(condLabel[currentLabelLinkIdx].concat('_').concat(condition)).child('preset_dict').set(model_preset[1]);
    db.ref('data').child(uid).child(condLabel[currentLabelLinkIdx].concat('_').concat(condition)).child('ned_prior').set(ned_prior);
}

// Record link data after a graph trial
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
    if (['linkscrime', 'linksestate', 'linksfinance'].includes(currentModel)) {
        var modelName = 'links_'.concat(currentLabels[0].slice(0, 3)).concat(currentLabels[1].slice(0, 3)).concat(currentLabels[2].slice(0, 3));
        console.log(modelName)
        db.ref('data').child(uid).child(modelName).child('report').set(report);
    } else {
        db.ref('data').child(uid).child(currentModel).child('report').set(report);
    }
    
}

function saveGraphData() {

    // Feedback sliders values
    var report = [
        $('#XonY').slider("value"),
        $('#XonZ').slider("value"),
        $('#YonX').slider("value"),
        $('#YonZ').slider("value"),
        $('#ZonX').slider("value"),
        $('#ZonY').slider("value")
    ];

    if (['crime', 'finance', 'estate'].includes(currentModel) && experiment != 'exp1') {
        var modelName = currentModel.concat('_').concat(condition);
        db.ref('data').child(uid).child(modelName).child('report').set(report);
        db.ref('data').child(uid).child(modelName).child('order').set(currentLabels);
        
        var $radioSense = $("input:radio[name=radio-1]:checked").attr('id');
        db.ref('data').child(uid).child(modelName).child('sense').set($radioSense);
        var $radioExpect = $("input:radio[name=radio-expect]:checked").attr('id');
        db.ref('data').child(uid).child(modelName).child('expect').set($radioExpect);
       
    } else if (['crime', 'finance', 'estate'].includes(currentModel)) {
        var modelName = currentModel.concat('_').concat(modelNo.toString());
        db.ref('data').child(uid).child(modelName).child('report').set(report);
        
        var $radioSense = $("input:radio[name=radio-1]:checked").attr('id');
        db.ref('data').child(uid).child(modelName).child('sense').set($radioSense);
        var $radioExpect = $("input:radio[name=radio-expect]:checked").attr('id');
        db.ref('data').child(uid).child(modelName).child('expect').set($radioExpect);

    } else if (['crime_control', 'finance_control', 'estate_control'].includes(currentModel)) {
        var modelName = currentModel.concat('_').concat(modelNo.toString());
        db.ref('data').child(uid).child(modelName).child('report').set(report);
    } else {
        var modelName = currentModel;
        db.ref('data').child(uid).child(modelName).child('report').set(report);
    }
    
        // Graph data
    // Times 
    db.ref('data').child(uid).child(modelName).child('times').set(steps);
    // Values
    db.ref('data').child(uid).child(modelName).child('xVals').set(xHist);
    db.ref('data').child(uid).child(modelName).child('yVals').set(yHist);
    db.ref('data').child(uid).child(modelName).child('zVals').set(zHist);
    // Interventions
    db.ref('data').child(uid).child(modelName).child('xInt').set(xInter);
    db.ref('data').child(uid).child(modelName).child('yInt').set(yInter);
    db.ref('data').child(uid).child(modelName).child('zInt').set(zInter);
    // Slider history
    db.ref('data').child(uid).child(modelName).child('XonY').set(firstHist);
    db.ref('data').child(uid).child(modelName).child('XonZ').set(secondHist);
    db.ref('data').child(uid).child(modelName).child('YonX').set(thirdHist);
    db.ref('data').child(uid).child(modelName).child('YonZ').set(fourthHist);
    db.ref('data').child(uid).child(modelName).child('ZonX').set(fifthHist);
    db.ref('data').child(uid).child(modelName).child('ZonY').set(sixthHist);

    // Reset Data storage variables
    xHist = [0];
    yHist = [0];
    zHist = [0];
    xInter = [0];
    yInter = [0];
    zInter = [0];
    steps = [0];
    firstHist = ['?'];
    secondHist = ['?'];
    thirdHist = ['?'];
    fourthHist = ['?'];
    fifthHist = ['?'];
    sixthHist = ['?'];
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
    db.ref('date').child(uid).child('end').set(Date.now());
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
