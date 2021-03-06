function saveState() {
    db.ref('states').child(uid).child('state').set(currentModel);
    db.ref('states').child(uid).child('condIdx').set(condIdx);
    
    localStorage.setItem('condIdx', condIdx);
    localStorage.setItem('currentModel', currentModel);

    if (condIdx < 2) {
        // Save date and time of submission
        startTime = Date.now();
        db.ref('date').child(uid).child('start').set(Date.now());
    }
}

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
    // SEND TO DATABASE

    // Feedback sliders values
    var report = [
        $('#XonY').slider("value"),
        $('#XonZ').slider("value"),
        $('#YonX').slider("value"),
        $('#YonZ').slider("value"),
        $('#ZonX').slider("value"),
        $('#ZonY').slider("value")
    ];
    if (['crime', 'finance', 'estate'].includes(currentModel)) {
        var modelName = currentModel.concat('_').concat(modelNo.toString());
        db.ref('data').child(uid).child(modelName).child('report').set(report);
        
        var $radioSense = $("input:radio[name=radio-1]:checked").attr('id');
        db.ref('data').child(uid).child(modelName).child('sense').set($radioSense);
        db.ref('data').child(uid).child(modelName).child('reason').set($('#reason-qual').val());

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
    endTime = Date.now();
    db.ref('date').child(uid).child('end').set(Date.now());
    db.ref('date').child(uid).child('duration').set(endTime - startTime);
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
