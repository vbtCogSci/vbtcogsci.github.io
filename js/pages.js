var consent_page = `
<p>
    <strong>Welcome to the dynamic inference experiment</strong>
    <br>
    This experiment has been approved by the UCL ethics commitee. Please read the following carefully before moving on.
    <br> 
    Please make sure you consent to the following
    <br>                
    - Your data being used for research purposes but will be anonymised
    <br>
    - You can stop the experiment at anytime if you feel uncomfortable with the content or simply wish to.
</p>`;

var causal_models_intro_1 = `
<p>
    Forms of causal reasoning (reasoning about causes and effects) are extremely common in everyday situations.
    For example, you might use causal reasoning when deciding what to eat (e.g. avoiding certain <strong>foods</strong> you know might <strong>cause</strong> you <strong>stomach pains</strong>).
    Any situation involving reasoning about causes and effects can be represented in what we call a <strong>"causal model"</strong>. 
    <br>
    Causal models are essentially diagramming that allow you to represent objects, events, items of information etc. as” NODES" <strong>(circles)</strong> 
    and draw arrows between these nodes to represent the relationship between them (e.g. cause and effect). 
    <br>
    For example, if you wanted to represent the following information in a causal model: 
    <br>
</p>
<span style='align-self: center;'><strong>"<u>rain</u> and a <u>sprinkler</u> can both make the <u>grass wet</u>"</strong></span><br>
<p>
    You would first identify your elements of interest (nodes; RAIN, SPRINKLER, WET GRASS) and using arrows represent <strong>RAIN and SPRINKLER</strong> as causes of the effect: <strong>WET GRASS</strong>.                 The causal model would therefore look like the one below:
</p>
<img src='./img/pageOne-graph.png'></img>`;

var causal_models_intro_2 = `
<p>
    Sometimes, you might also want to say whether the cause makes the effect <strong>MORE</strong> or <strong>LESS</strong> likely  e.g. rain makes wet grass MORE likely but if you had another node representing "sunshine" this would make the effect (wet grass) LESS likely.
    <br><br>
    To show this, you can either have a plus (+) or (-) sign next to the arrow to say if the cause makes the effect more likely (+) or less likely (-).
    <br><br>
    This can be shown in the causal model diagram below:
</p>
<img src='./img/pageTwo-graph.png'>`;

var loopy_intro_1 = `
<div class='page-3-upper'>
    <p>
        In today's task, you will first be presented with a set of concepts and asked to draw your own representation of their causal links using a tool called Loopy. 
        Loopy is an online tool that allows you to draw causal models by simply drawing nodes as circles and arrows to show the relation between these. 
        <br>
        Please open Loopy now <strong><u>in a new tab</strong></u> following this link: <a target="_blank" href='https://ncase.me/loopy/v1.1/'>https://ncase.me/loopy/v1.1/</a> so that you can switch back and forth between Loopy and this survey.
        <br><br>
        <strong>Here are how some example structures would look like in Loopy:<br></strong>
    </p>
</div>
<div class='page-3-middle'>
    <div class='graph-container'>
        <p><u>1) Simple cause and effect where the node A is the cause and B is the effect</u></p>
        <img class='page-3-graph'src='./img/pageFour-graphOne.png'>
    </div>
    <div class='graph-container'>
        <p><u>2) Simple common cause diagram where node A is the cause of both B and C </u></p>
        <img class='page-3-graph' src='./img/pageFour-graphTwo.png'>
    </div>
    <div class='graph-container'>
        <p><u>3) Simple common effect diagram where node A and Node B both cause the effect C</u></p>
        <img class='page-3-graph' src='./img/pageFour-graphThree.png'>
    </div>
</div>`;

var loopy_intro_2 = `
<div class='page-4-middle'>
    <div class='graph-container'>
        <img class='page-3-graph'src='./img/pageFour-graphOne.png'>
    </div>
    <div class='graph-container'>
        <img class='page-3-graph' src='./img/pageFour-graphTwo.png'>
    </div>
    <div class='graph-container'>
        <img class='page-3-graph' src='./img/pageFour-graphThree.png'>
    </div>
</div>
<p>
    Now open loopy the loopy tab (following this link: <a target="_blank" href='https://ncase.me/loopy/v1.1/'>https://ncase.me/loopy/v1.1/</a>) and keep it open in a separate tab for the duration of this experiment. 
    <br>
    Delete anything on the initial screen using the ERASER tool and replicate each of the above diagrams as best as you can on the same page. 
    <br>
    To draw a node simply use the PENCIL tool to draw a circle. You can rename your node and change its colour using the options on the right hand of the screen. 
    <br>
    To draw an arrow between two nodes simply use the PENCIL tool to draw a line between them. The default arrow will have a "+" sign. However, in real life, causes can have negative effects.
    <br>
    With Loopy, you can use positive ('+' sign next to the arrow) AND negative ('-' sign next to the arrow) links by changing a selected link's type from 'more is more' to 'more is less' in the top right corner of the loopy page.
    <br>
    When you are done drawing each diagram (on the same page), go to the right-hand menu on the Loopy webpage and click "save as link".
    Paste the link in the text entry box below.
    <br><br>
</p>
<div class='loopy-link-container'>
    <input class='loopy-input' id='loopy-1' value='Paste your loopy link here'></input>
    <button class='loopy-validate' id='loopy-1-validate'>Validate</button>
</div>
<span class='loopy-alert' id='loopy-1-alert'></span>`;

var loopy_intro_3 = `
<p>
    <strong>One last point before you get started! </strong>
    <br>
    Loopy is a versatile tool for causal modelling!
    In real life, effects can be positive and negative but also of different intensities. With Loopy, you can represent stronger effects by adding additional arrows between the nodes.
    <br>    
    To keep our models simple and easy to understand, we wannt to apply the following rule: 
    <ul>
        <li>No arrow from node A to node B means no effect of A on B</li>
        <li>One arrow from node A to node B means a moderate effect of A on B</li>
        <li>Two arrows from node A to node B means a strong effect of A on B</li>
    </ul>
</p>
<p>
    <strong>Clear your loopy page and start a new one!</strong>
    <br>
    Please represent the information below in a causal diagram on a fresh loopy page. 
    <br><br>
    <u>"Tom has a cough. The doctor thinks that it could be a symptom of either asthma or the flu. He also believes that the flu is twice as likely as asthma to be the cause of the cough. 
    <br>
    Moreover, he read in a research paper that having asthma increased the chance of getting the flu." </u>
    <br><br>
    Remember to rename your nodes with informative names (e.g. "cough").
    <br><br>
    Once you have finished, click "save as link" on the right-hand side menu and paste the link in the text box below.
    <br><br>
    Keep the diagram as simple as you can.
    <br><br>
</p>
<div class='loopy-link-container'>
    <input class='loopy-input' id='loopy-2' value='Paste your loopy link here'></input>
    <button class='loopy-validate' id='loopy-2-validate'>Validate</button>
</div>
<span class='loopy-alert' id='loopy-2-alert'></span>`;

var loopy_crime = `
<div class='condition-container'>
    <p>
        <strong>Let us start. </strong>
        <br>
        Please draw the arrows that correspond to your understanding of the causal dynamics in the following scenario. 
        <br><br>
        <u>You are a small town mayor who is trying to understand the interplay between Criminality, Police action and the Satisfaction of your population.</u>
        <br>
        This is a complicated issue but sadly you only have access to three key indices:
        <br>
        - <strong>Crime Rate</strong>, representing the amount of Criminality in your town.
        <br>
        - <strong>Police action</strong>, representing the intensity of police action in your town
        <br>
        - <strong>Population satisfaction</strong>, representing how happy the population of you town is.
        <br><br>
        Without renaming, adding or removing nodes in the following loopy page, draw the arrows that you believe best represent how these concepts may affect each other.
        Remember, you can use negative AND positive links and can represent stronger effect by adding additional arrows between the nodes. 
        <br>
        Additionally, we want your model to be easy to understand for you collaborators who are less versed in causal modelling. 
        <br>
        To do so we apply the following rule: 
        <ul>
            <li>No arrow from node A to node B means no effect of node A on node B</li>
            <li>One arrow from node A to node B means a moderate effect of node A on node B</li>
            <li>Two arrows from node A to node B means a strong effect of node A on node B</li>
        </ul>
        Follow this link to a preset loopy page: <a target="_blank" href='https://ncase.me/loopy/v1.1/?data=[[[3,480,237,0.5,%22Crime%2520rate%22,4],[4,800,238,0.5,%22Police%2520action%22,0],[5,646,464,0.5,%22Population%2520Satisfaction%22,3]],[],[],5%5D'>Loopy Criminality</a>
        <br><br>
        Once you are done, click "save as link" on the right-hand side menu and paste the link in the text box below.  
        <br>
        Keep the diagram as simple as you can.
    </p>
</div>
<div class='loopy-link-container'>
    <input class='loopy-input' id='loopy-5' value='Paste your loopy link here'></input>
    <button class='loopy-validate' id='loopy-5-validate'>Validate</button>
</div>
<span class='loopy-alert' id='loopy-5-alert'></span>`;

var loopy_finance = `
<div class='condition-container'>
    <p>
        Please draw the arrows that correspond to your understanding of the causal dynamics in the following scenario. 
        <br><br>
        <u>You are a state policy maker who is trying to manage a virus outbreak. You have to decide on a confinement policy to protect to the population and limit the number of virus cases but want to balance it with the long term aim not to overly damage the economy.</u><br>
        Before making any decision you want to model the interplay between Stock Prices, the intensity of confinement measures (for instance, total confinement under all circumstances, partial, to allow people to still work or no confinement at all) and the number of people affected by the virus.
        <br>
        This is a complicated issue but sadly you only have access to three key indices:
        <br>
        - <strong>Stock Prices</strong>, representing a global index of the stock market's health.
        <br>
        - <strong>Confinement Measures</strong>, representing the intensity of confinement measures on the territory.
        <br>
        - <strong>Virus Cases</strong>, the number of people affected by the virus.
        <br><br>
        Without renaming, adding or removing nodes in the following loopy page, draw the arrows that you believe best represent how these concepts may affect each other.
        Remember, you can use negative AND positive links and can represent stronger effect by adding additional arrows between the nodes.
        <br>
        Additionally, we want your model to be easy to understand for you collaborators who are less versed in causal modelling. 
        <br>
        To do so we apply the following rule: 
        <ul>
            <li>No arrow from node A to node B means no effect of node A on node B</li>
            <li>One arrow from node A to node B means a moderate effect of node A on node B</li>
            <li>Two arrows from node A to node B means a strong effect of node A on node B</li>
        </ul>
        Follow this link to a preset loopy page: <a target="_blank" href='https://ncase.me/loopy/v1.1/?data=[[[3,483,208,0.5,%22Stock%2520Prices%22,4],[4,803,209,0.5,%22Confinement%2520Measures%22,0],[5,649,435,0.5,%22Virus%2520Cases%22,3]],[],[],6%5D'>Loopy Outbreak</a>
        <br><br>
        Once you are done, click "save as link" on the right-hand side menu and paste the link in the text box below.  
        <br>
        Keep the diagram as simple as you can.
    </p>
</div>
<div class='loopy-link-container'>
    <input class='loopy-input' id='loopy-6' value='Paste your loopy link here'></input>
    <button class='loopy-validate' id='loopy-6-validate'>Validate</button>
</div>
<span class='loopy-alert' id='loopy-6-alert'></span>`;

var loopy_estate = `
<div class='condition-container'>
<p>
    Please draw the arrows that correspond to your understanding of the causal dynamics in the following scenario. 
    <br><br>
    <u>You are an urban planner in a developping city. You notice that the some neighbourhoods are more desireable than other.</u><br>
    You want to model the interplay, in a given neighbourhood, between House Prices, its Population density and its overall Desireability.
    <br>
    This is a complex issue but sadly you only have access to three key indices:
    <br>
    - <strong>House Prices</strong>, representing a global index of the real-estate market in the neighbourhood.
    <br>
    - <strong>Population Density</strong>, representing the number of inhabitants per km squared.
    <br>
    - <strong>Desireability</strong>, an index of the desireability of the neighbourhood gathered via polls in the population.
    <br><br>
    Without renaming, adding or removing nodes in the following loopy page, draw the arrows that you believe best represent how these concepts may affect each other.
    Remember, you can use negative AND positive links and can represent stronger effect by adding additional arrows between the nodes.
    <br>
    Additionally, we want your model to be easy to understand for you collaborators who are less versed in causal modelling. 
    <br>
    To do so we apply the following rule: 
    <ul>
        <li>No arrow from node A to node B means no effect of node A on node B</li>
        <li>One arrow from node A to node B means a moderate effect of node A on node B</li>
        <li>Two arrows from node A to node B means a strong effect of node A on node B</li>
    </ul>
    Follow this link to a preset loopy page: <a target="_blank" href='https://ncase.me/loopy/v1.1/?data=[[[3,483,208,0.5,%22Houses%2520Prices%22,4],[4,803,209,0.5,%22Population%2520Density%22,0],[5,649,435,0.5,%22Desireability%22,3]],[],[],5%5D'>Loopy Houses</a>
    <br><br>
    Once you are done, click "save as link" on the right-hand side menu and paste the link in the text box below.  
    <br>
    Keep the diagram as simple as you can.
</p>
</div>
<div class='loopy-link-container'>
<input class='loopy-input' id='loopy-7' value='Paste your loopy link here'></input>
<button class='loopy-validate' id='loopy-7-validate'>Validate</button>
</div>
<span class='loopy-alert' id='loopy-7-alert'></span>`;

var graph_intro_1 = `
<p>
    <strong> Thank you for sharing you models! </strong>
    <br><br>
    With Loopy, you were able to represent causes and effects in a static way. However, in reality, interactions between causes and effects happen over time. 
    <br>
    In the next section, you will be introduced to another way to represent causal dynamics. One that takes time into account. 
    Here we will not ask you to draw the arrows between the variables but instead attempt to understand the which causal model underlies the patterns you observe in a limited amount of time.
    <br>
    The window will be layed out as shown in the picture below. You will have two tools at your disposal to do so:
    <ul>
        <li><strong>Interventions</strong>: the three handles on the left will allow you to voluntarily change the value of one of the variables as long as you keep hold of it with your mouse.</li>
        <li><strong>Observations</strong>: the graph on the right will plot the values (i.e. vertical axis is the value) that the three variables took in the last 10 seconds (i.e. horizontal axis is time in seconds), 
            allowing you to observe their variations through time and the result of you interventions. These will be represented by a shading in the graph of variable's colour.</li> 
    </ul>
    The colours of the variables' names always corresponds to their respective colours on the graph.
    The links between variables follow the same logic as what you have done with Loopy. Namely:
    <ul>
        <li>Variables can have multiple causes: changes in A can be caused by changes in B OR C OR B and C</li>
        <li>Variables can have multiple effects: changes in A can cause changes in B OR C OR B and C</li>
        <li>Effects can be <u>positive</u> or <u>negative</u>: more A can mean more B OR more A can mean less B</li>
        <li>Effects can be <u>null</u> (i.e. no arrow), <u>moderate</u> (i.e. one arrow) or <u>strong</u> (i.e. two arrows)</li>
    </ul>
    <br>
    Watch this video that shows a brief extract of what the game looks like in real time.
</p>`;

var graph_template = `
<div class='game-display'>
    <div class='slider_container'>
        <div class='slider_box' id='slider_container_1'>
            <label for='slider_X' class='slider-label' id='x_label'><span class='X'>X</span></label>
            <div class="slider" id='slider_X'>
                <div id="custom-handle-1" class="ui-slider-handle"></div>
            </div>
        </div>
        <div class='slider_box' id='slider_container_2'>
            <label for='slider_Y' class='slider-label' id='y_label'><span class='Y'>Y</span></label>
            <div class="slider" id='slider_Y'>
                <div id="custom-handle-2" class="ui-slider-handle"></div>
            </div>
        </div>
        <div class='slider_box' id='slider_container_3'>
            <label for='slider_Z' class='slider-label' id='z_label'><span class='Z'>Z</span></label>
            <div class="slider" id='slider_Z'>
                <div id="custom-handle-3" class="ui-slider-handle"></div>
            </div>
        </div>
    </div>
    <!-- Chart display -->
    <div class='chart_container'>
        <canvas id='progressPlot'>
        </canvas>
    </div>
</div>
<div class='button_container'>
    <button class='process' id='start_button'>Start</button>
    <button class='process' id='stop_button'>Pause</button>
    <button class='process' id='reset_button'>Reset</button>
</div>`;


var graph_template = `
<div class='game-display'>
    <div class='slider_container'>
        <div class='slider_box' id='slider_container_1'>
            <label for='slider_X' class='slider-label' id='x_label'><span class='X'>X</span></label>
            <div class="slider" id='slider_X'>
                <div id="custom-handle-1" class="ui-slider-handle"></div>
            </div>
        </div>
        <div class='slider_box' id='slider_container_2'>
            <label for='slider_Y' class='slider-label' id='y_label'><span class='Y'>Y</span></label>
            <div class="slider" id='slider_Y'>
                <div id="custom-handle-2" class="ui-slider-handle"></div>
            </div>
        </div>
        <div class='slider_box' id='slider_container_3'>
            <label for='slider_Z' class='slider-label' id='z_label'><span class='Z'>Z</span></label>
            <div class="slider" id='slider_Z'>
                <div id="custom-handle-3" class="ui-slider-handle"></div>
            </div>
        </div>
    </div>
    <!-- Chart display -->
    <div class='chart_container'>
        <canvas id='progressPlot'>
        </canvas>
    </div>
</div>
<div class='button_container'>
    <button class='process' id='start_button'>Start</button>
    <button class='process' id='stop_button'>Pause</button>
    <button class='process' id='reset_button'>Reset</button>
</div>`;

var feedback_template = `
<div class='graph-pred-label'>
    <p>
        Please indicate your understanding of the causal dynamics using the graph below: 
    </p>
</div>
<div class='graph-pred-rec'>
    <div class='feedback-slider-container'>
        <p style='text-align:center'>
            <strong><span class='X'>X</span> -> <span class='Y'>Y</span></strong>
        </p>
        <div class='feedback-slider' id='XonY'>
            <div id="handle-XonY" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container'>
        <p style='text-align:center'>
            <strong><span class='X'>X</span> -> <span class='Z'>Z</span></strong>
        </p>
        <div class='feedback-slider' id='XonZ'>
            <div id="handle-XonZ" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container'>
        <p style='text-align:center'>
            <strong><span class='Y'>Y</span> -> <span class='X'>X</span></strong>
        </p>
        <div class='feedback-slider' id='YonX'>
            <div id="handle-YonX" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container'>
        <p style='text-align:center'>
            <strong><span class='Y'>Y</span> -> <span class='Z'>Z</span></strong>
        </p>
        <div class='feedback-slider' id='YonZ'>
            <div id="handle-YonZ" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container'>
        <p style='text-align:center'>
            <strong><span class='Z'>Z</span> -> <span class='X'>X</span></strong>
        </p>
        <div class='feedback-slider' id='ZonX'>
            <div id="handle-ZonX" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container'>
        <p style='text-align:center'>
            <strong><span class='Z'>Z</span> -> <span class='Y'>Y</span></strong>
        </p>
        <div class='feedback-slider' id='ZonY'>
            <div id="handle-ZonY" class="ui-slider-handle"></div>
        </div>
    </div>
</div>`;

var outro_1 = `
<p>
    This experiment is a pilot, we are still correcting bugs and gathering feedback on its flow. 
    <br>
    Please fill out the following form to do so before moving on.
    <br>
    INSERT FEEDBACK FORM
</p>`;

var outro_2 = `
<p>
    All done, you have reached the end of this experiment, thank you very much for participating!
    <br><br>
    Please click on the link below to go back to the Prolific platform.
    <br><br>
    Back to prolific: INSERT LINK HERE
</p>`;