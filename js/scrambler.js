// Variable storing the ad hoc preset
var model_preset;

var labels_poss = [
    ['Population happiness', 'Police action', 'Crime rate'],
    ['Stock Prices', 'Virus Cases', 'Lockdown Measures'],
    ['House Prices', 'Desirability', 'Population Density']
];

var label_handle = [
    {
        'Population happiness': 'Population happiness',
        'Police action': 'Police<br>action',
        'Crime rate': 'Crime<br>rate'
    },
    {
        'Stock Prices': 'Stock<br>Prices', 
        'Virus Cases': 'Virus<br>Cases', 
        'Lockdown Measures': 'Lockdown Measures'
    },
    {
        'House Prices': 'House<br>Prices', 
        'Desirability': 'Desirability', 
        'Population Density': 'Population Density'
    }
]

// Link types possibilites
var link_possibilities = [-1, -0.5, 0, 0.5, 1];

// Wrapper for all the scrambling process
// Called in survey_methods.nextNode, when the prior is validated by the participant (should happen as soon as we have the prior)
function scrambler_wrapper(init_model_scaled, init_order, cond, save=true) {

    console.log(init_model_scaled)

    var init_model = Array(init_model_scaled.length);
    for (i=0; i<init_model_scaled.length; i++) {
        init_model[i] = init_model_scaled[i] / 2;
    }

    console.log(init_model)

    if (experiment == 'exp1' || experiment == 'exp2') {
        return
    }

    // Generate posterior model satisfying the experimental condition condition
    // Difference in experiment number changes the inversion process (exp3: random, exp4: deterministic)
    if (experiment == 'exp3') {
        // Transfrom report according to condition, specifically exp3
        if (cond == 'congruent') {
            // model = prior OR model ~= prior 
            // 3 links will be randomised with a softmax preference for closer link values
            var num_scramble = 1;
            var softmax_coef = -1;
            var target_ned = [0.80, 0.90];

        } else if (cond == 'incongruent') {
            // model != prior 
            // 3 links will be randomised with a uniform distribution over link values
            var num_scramble = 3;
            var softmax_coef = 0;
            var target_ned = [0.45, 0.55];

        } else if (cond == 'implausible') {
            // model != prior 
            // 4 links will be randomised with a softmax preference for further link values
            var num_scramble = 6;
            var softmax_coef = 1;
            var target_ned = [0.05, 0.15];
        }
        var out_report = scramble_model(init_model, num_scramble, softmax_coef, target_ned);
    } else if (experiment == 'exp4' || experiment == 'exp5') {
        console.log('Inverting model')
        console.log(init_model)
        console.log(cond)
        var out_report = invert_model(init_model, cond);
        console.log(out_report)
    }

    // Parse report to turn it into a shape readable by the game API
    // Model_presetp = [preset_list, preset_order]
    if (experiment == 'exp5') {
        var shuffle = true;
    } else {
        var shuffle = false;
    }
    var model_preset = to_preset_list(init_order, out_report, shuffle=shuffle);

    // Store the scrambled model in local storage and database
    var ned_out = 1 - (euclidean_distance(init_model, out_report) / normalising_constant(init_model))
    if (save == true) {
        saveScramblingInfo(model_preset, ned_out);
    }

    console.log(model_preset)
    return model_preset;
}

// Methods for scrambling

// DETERMINISTIC SCRAMBLING
function invert_model(init_model, cond) {
    // Order idx is based on the permutations of the model values equivalent to transposing the adjacency matrix of the graph
    var order_idx = [2, 4, 0, 5, 1, 3];
    var out_report;

    if (cond == 'congruent') {
        out_report = init_model;
    } else if (cond == 'incongruent') {
        out_report = Array(init_model.length).fill(0);

        for (var i = 0; i < init_model.length; i++) {
            out_report[i] = init_model[order_idx[i]];
        }
    }

    return out_report;
}


// RANDOM SCRAMBLING BASED ON DISTANCE AND ASSOCIATED FUNCTIONS
// Samples a model within the specified ned range parameter of the base model
function scramble_model(init_model, num_scramble, softmax_coef, target_ned, test=false) {
    // Initialise generic variables
    var possibilities = [-1, -0.5, 0, 0.5, 1];

    // Generate normalising constant
    var norm_c = normalising_constant(init_model);

    // While loop generating models until condition is reached
    var current_ned = 0;
    var n_iter = 0;
    var out_report;

    while (current_ned < target_ned[0] || current_ned > target_ned[1]) {

        // Generate new report
        out_report = Array(init_model.length).fill(0);

        // Do the randomisation
        to_change = random_choice(init_model, num_scramble, replace = false, values = false);
        to_change.sort()

        for (var i = 0; i < init_model.length; i++) {

            if (i == to_change[0]) {
                // Removes prior link from possibilities
                var poss = spliceNoMutate(possibilities, possibilities.indexOf(init_model[i]));


                // Compute softmax probability distribution for actual possibilities
                var weights = Array(poss.length).fill(0);
                var weights_norm = 0;

                poss.forEach((e, j) => {
                    weights[j] = Math.exp(softmax_coef * Math.abs(e - init_model[i]));
                    weights_norm = weights_norm + weights[j];
                });

                weights.forEach((e, j) => {
                    e = e / weights_norm;
                });

                // Choose a new link using the computed softmax distribution
                out_report[to_change.shift()] = weighted_choice(poss, weights);

            } else {
                // Keep old link
                out_report[i] = init_model[i];
            }
        }

        // Update current ned
        current_ned = 1 - euclidean_distance(init_model, out_report) / norm_c;

        // Counter to check number of loops it took to find a suitable model
        n_iter = n_iter + 1

        if (test == true && n_iter < 15) {
            console.log(current_ned)
        }

    }

    //console.log(init_model)

    if (test == true) {
        console.log('Done after '.concat(n_iter.toString()));
        console.log('Final ned: '.concat(current_ned.toString()));
    }
    //console.log(n_iter)
    //console.log(out_report)
    //console.log(current_ned)

    // Return accepted report
    return out_report
}


// Returns the normalising constant for the given model
function normalising_constant(base_model) {
    var possibilities = [-1, -0.5, 0, 0.5, 1];
    var max_dist = [1, 1, 1, -1, -1];

    var max_dist_model = Array(base_model.length).fill(0);

    for (i = 0; i < base_model.length; i++) {
        max_dist_model[i] = max_dist[possibilities.indexOf(base_model[i])];
    }

    return euclidean_distance(max_dist_model, base_model);
}


// Takes in a set of models and a base model and return an array for which the value at index i is the 
// euclidean distance between the i-th model in models and the base model
function euclidean_distance(model, base_model) {
    var ned = 0;

    for (i = 0; i < base_model.length; i++) {
        ned = ned + (model[i] - base_model[i]) ** 2;
    }

    return Math.sqrt(ned);
}


var test_order = 'links_0_PopPolCri';
var test_report = [1, 0, 0.5, 0.5, -1, 0];
var other_report = [1, 1, 1, 1, 1, 1];
// Takes a model_order and model_report and outputs a list ready
function to_preset_list(model_order, model_report, shuffle=true) {
    // Parse model_order
    var type = parseInt(model_order[6]);
    var order = model_order.slice(8);
    var one = order.slice(0, 3);
    var two = order.slice(3, 6);
    var three = order.slice(6);

    // Initialise label variable using global variable labels possibilities
    var labels = labels_poss[type];
    var handles = label_handle[type];

    // Put label list in order
    var label_order = [0, 0, 0];
    for (i = 0; i < labels.length; i++) {
        if (labels[i].includes(one)) {
            label_order[0] = labels[i];
        } else if (labels[i].includes(two)) {
            label_order[1] = labels[i];
        } else if (labels[i].includes(three)) {
            label_order[2] = labels[i];
        }
    }

    // Causes dict
    var label_one = label_order[0];
    var label_two = label_order[1];
    var label_three = label_order[2];

    // Causes based, values nested are the cause of the values on the key
    var causes_dict = {
        [label_one]: {
            [label_two]: model_report[0],
            [label_three]: model_report[1]
        },
        [label_two]: {
            [label_one]: model_report[2],
            [label_three]: model_report[3]
        },
        [label_three]: {
            [label_one]: model_report[4],
            [label_two]: model_report[5]
        }
    };

    console.log(model_order)
    console.log(model_report)
    console.log(causes_dict)


    // Shuffle the links if shuffle=true
    if (shuffle == true) {
        label_order = shuffleArray(label_order)
    }

    // Build list
    model_list = [
        1, causes_dict[label_order[1]][label_order[0]], causes_dict[label_order[2]][label_order[0]],
        causes_dict[label_order[0]][label_order[1]], 1, causes_dict[label_order[2]][label_order[1]],
        causes_dict[label_order[0]][label_order[2]], causes_dict[label_order[1]][label_order[2]], 1,
        label_order[0], label_order[1], label_order[2],
        handles[label_order[0]], handles[label_order[1]], handles[label_order[2]]
    ]

    return [model_list, causes_dict]
}


// Model generator for testing purposes
function model_generator(n) {

    var model_array = [];

    for (i=0;i<n;i++) {
        var new_model = [];
        for (j=0;j<6;j++) {
            new_model.push(weighted_choice([-1, -0.5, 0, 0.5, 1], [1, 1, 1, 1, 1]));
        }
        model_array.push(new_model);
    }

    return model_array;
}

function model_tester(models, which=[0, 1, 2]) {

    var cond_label = ['congruent', 'incongruent', 'implausible'];

    var num_scramble = [1, 3, 6];

    var softmax_c = [-1, 0, 1];

    var ned_ranges = [[0.8, 0.9],
                      [0.45, 0.55],
                      [0.05, 0.15]];

    var scrambled_out = [];
    for (k=0; k<models.length; k++) {

        if (models[k].toString() == [0, 0, 0, 0, 0, 0].toString()) {
            console.log('Degenerate model 0s');
            continue;
        }

        var neds_out = [];

        console.log('Index '.concat(k.toString()).concat(': [').concat(models[k].toString()).concat(']'));

        for (j=0; j<3; j++) {
            console.log('Starting '.concat(cond_label[j]));
            
            var ned_loc = scramble_model(models[k], num_scramble[j], softmax_c[j], ned_ranges[j], true);

            console.log(ned_loc);

        }

    }
}

