var consent_page_1 = `
<p class='base-p'>
    <strong>Welcome to the dynamic inference experiment</strong>
    <br><br>
    Note: Fluent English speakers only.
    <br><br>
    <strong>Identification of Investigator and Purpose of Study</strong>
    <br>
    You are invited to participate in a research study conducted by Victor Btesh (victor.btesh.19@ucl.ac.uk) under the supervision of Professor David Lagnado at University College London. The purpose of this research study is to examine how people reason and learn about systems in continuous time. You are free to contact the investigators at the above email address if you wish to discuss the study. 
    <br><br>
    <strong>About the study:</strong>
    <br>This task is part of a research study. For this task you will answer questions about topics such as public policy and use a dedicated graphical interface to do so. No prior experience or expertise is necessary. The task will take approximately 20 minutes and at the end there will be a questionnaire to obtain demographic information. 
    <br><br>
    You are required to remain in a fully maximised tab throughout the study.
    <br>
    <u>**Please do not use mobile devices.**</u>
    <br><br>
    Please do not accept or attempt multiple surveys. If you have been rejected from previous surveys, you will not be able to participate. To proceed forward at each point, you will have to use the ‘next’ button. A disabled ‘next’ button means that you still have an ongoing task on the current page.
</p>`;

var consent_page_2 = `
<p class='base-p'>
    <strong>Risks, Benefits and Data Confidentiality</strong>
    <br>
    There are no known risks in participating in this study, and no health or cognitive benefits. Whilst your data will be provided anonymously, at the point of data collection, your responses in the survey could, theoretically, be linked back to you via your Prolific ID, or your IP address. 
    <br>
    The former is collected to enable your payment, the latter to ensure that there are no duplicate responses in the database. After we have used the data for this purpose, this information will be deleted from the data file. The data will subsequently be stored anonymously, such that your individual responses will not be traceable back to you. 
    All personal information will remain confidential and the data gathered will be stored anonymously and securely. It will not be possible to identify you in any publications. Any anonymised research data may be shared with, and used by, others for future research.
    <br><br>
    <strong>Participation or Withdrawal</strong>
    <br>
    Your participation in the study is voluntary. You may decline to answer any question and have the right to withdraw from participation at any time. Withdrawal will not affect your relationship with University College London in any way. 
    Simply close your browser if you wish to withdraw.
    <br><br>
    <strong>**The study has been processed by the Research Ethics Committee at University College London and the study number is EP/2017/005.**</strong>
</p>
<fieldset class='consent-field'>
    <legend>Answer the following question concerning you consent before starting the experiment:</legend>
    <label for="read">I have read the information on this page.</label>
    <input type="checkbox" name="consent-cb" id="read"><br>
    <label for="contact">I have been given contact details of the researcher to ask questions, should I wish to.</label>
    <input type="checkbox" name="consent-cb" id="contact"><br>
    <label for="data-prot">I understand that my data will be held anonymously and as such, my responses cannot be tracked to me individually.</label>
    <input type="checkbox" name="consent-cb" id="data-prot"><br>
    <label for="withdrawal">I understand that I am free to withdraw from the study without penalty if I so wish, simply by closing the browser.</label>
    <input type="checkbox" name="consent-cb" id="withdrawal"><br>
    <label for="consent">I understand that my data will be held anonymously and as such, my responses cannot be tracked to me individually.</label>
    <input type="checkbox" name="consent-cb" id="consent">
</fieldset>`;

var causal_models_intro_1 = `
<p class='base-p'>
    Forms of causal reasoning (reasoning about causes and effects) are extremely common in everyday situations.
    For example, you might use causal reasoning when deciding what to eat (e.g. avoiding certain <strong>foods</strong> you know might <strong>cause</strong> you <strong>stomach pains</strong>).
    Any situation involving reasoning about causes and effects can be represented in what we call a <strong>"causal model"</strong>. 
    <br>
    Causal models are essentially diagrams that allow you to represent objects, events, items of information etc. as <strong>variables (circles)</strong> 
    and draw arrows between these variables to represent the relationship between them (e.g. cause and effect). 
    <br>
    Causal reasoning to express causal effects between higher order concepts. For example, if you wanted to represent the following information in a causal model: 
    <br><br>
    <span style='align-self: center;'><strong>"a <u>financial crisis</u> and a <u>pandemic</u> can both result in <u>job losses</u>"</strong></span><br>
</p>
<p class='base-p'>
    You would first identify your elements of interest (variables; FINANCIAL CRISIS, PANDEMIC, JOB LOSSES) and using arrows represent <strong>FINANCIAL CRISIS and PANDEMIC</strong> as causes of the effect: <strong>JOB LOSSES</strong>.                 The causal model would therefore look like the one below:
</p>
<img src='./img/pageOne-graph.png'></img>`;

var causal_models_intro_2 = `
<p class='base-p'>
    Sometimes, you might also want to say whether the cause makes the effect <strong>MORE</strong> or <strong>LESS</strong> likely  e.g. a financial crisis makes job losses MORE likely but if you had another variable representing "economic growth" this would make the effect (job losses) LESS likely.
    <br><br>
    To show this, you can either have a plus (+) or (-) sign next to the arrow to say if the cause makes the effect more likely (+) or less likely (-).
    <br><br>
    This can be shown in the causal model diagram below:
</p>
<img src='./img/pageTwo-graph.png'>`;

var causal_models_intro_3 = `
<div class='page-3-upper'>
    <p class='base-p'>
        In today's task, you will first be presented with a set of concepts and asked to state your representation of their causal links. 
        They will be represented as nodes and your task will be to provide your interpretation of the causal links between them.
        <br>
        <br>
        Here are more examples of structures, study them carefully. The sign of the effect, i.e. positive or negative, is given by the <strong>sign next to the arrow</strong> 
        while its strength is given by the <strong>number of arrows</strong> going from a cause node to an effect node. 
        <br>
        <br>
        <strong>In the next pages, you will see graphs and will be asked to provide the sign and strength of the effects for its node, so make sure you understand how it works<strong>:
    </p>
</div>
<div class='page-3-middle'>
    <div class='graph-container'>
        <p><u>1) Simple cause and effect where the node A is the cause and B is the effect</u></p>
        <img class='page-3-graph'src='./img/pageThree-graphOne.PNG'>
    </div>
    <div class='graph-container'>
        <p><u>2) Simple common cause diagram where node A is the cause of both B and C </u></p>
        <img class='page-3-graph' src='./img/pageThree-graphTwo.png'>
    </div>
    <div class='graph-container'>
        <p><u>3) Simple common effect diagram where node A and Node B both cause the effect C</u></p>
        <img class='page-3-graph' src='./img/pageThree-graphThree.PNG'>
    </div>
</div>`;

var links_template = `
<div class='page-4-left'>
    <img class='page-4-graph' id='page-4-graphOne' src='./img/pageFour-graphOne.png'>
    <img class='page-4-graph' id='page-4-graphTwo' src='./img/pageFour-graphTwo.png'>
    <img class='page-4-graph' id='page-4-graphThree' src='./img/pageFour-graphThree.PNG'>
    <div class='page-4-graph' id='page-4-graphFour-p' style='width:100%;'>
        <p style='font-size:10pt;'>  
            <strong>Let's try something different!</strong>
            
            Here, please represent the information below using the interface you just learned to use:
            <br>
            <u>"Tom has a cough. The doctor thinks that it could be a symptom of either asthma or the flu. He also believes that the flu is twice as likely as asthma to be the cause of the cough.
            <br>
            The doctor also read a research paper stating that having asthma increased the chances of catching the flu."</u> 
            <br>
            As you can see, no links are drawn, provide them using the sliders on the right.
            Do not add links that are not in the text. 
            <br>
        </p>
    </div>
    <img style='width:60%;' class='page-4-graph' id='page-4-graphFour' src='./img/pageFour-graphFour.PNG'>
    <img class='page-4-graph' id='page-4-graph-crime-1' src='./img/pageFour-graph-crime-1.PNG'>
    <img class='page-4-graph' id='page-4-graph-crime-2' src='./img/pageFour-graph-crime-2.png'>
    <img class='page-4-graph' id='page-4-graph-crime-3' src='./img/pageFour-graph-crime-3.png'>
    <img class='page-4-graph' id='page-4-graph-finance-1' src='./img/pageFour-graph-finance-1.PNG'>
    <img class='page-4-graph' id='page-4-graph-finance-2' src='./img/pageFour-graph-finance-2.PNG'>
    <img class='page-4-graph' id='page-4-graph-finance-3' src='./img/pageFour-graph-finance-3.PNG'>
    <img class='page-4-graph' id='page-4-graph-estate-1' src='./img/pageFour-graph-estate-1.PNG'>
    <img class='page-4-graph' id='page-4-graph-estate-2' src='./img/pageFour-graph-estate-2.PNG'>
    <img class='page-4-graph' id='page-4-graph-estate-3' src='./img/pageFour-graph-estate-3.PNG'>
    
    <!-- Error Paragraphs -->
    <div style='width: 100%;' class='error-p'>
        <p style='font-size:smaller;'>
            <i>Reminder of the rules: 
            <ul style='font-size:smaller;'>
                <li><strong>0</strong>: no arrow from variable A to variable B means no effect of variable A on variable B</li>
                <li><strong>1</strong>: one positive arrow from A to B means that <strong>MORE of A</strong> results in <strong>MORE of B</strong></li>
                <li><strong>2</strong>: two positive arrows from A to B means that <strong>MORE of A</strong> results in <strong> a lot MORE of B</strong></li>
                <li><strong>-1</strong>: one negative arrow from A to B means that <strong>MORE of A</strong> results in <strong>LESS of B</strong></li>
                <li><strong>-2</strong>: two negative arrows from A to B means that <strong>MORE of A</strong> results in <strong>a lot LESS of B</strong></li>
            </ul></i>
        </p>
        <p style='color: red;' id='error-msg'></p>
    </div>
</div>
<div class='page-4-right'>
    <!-- Feedback template-->
    <div class='feedback-slider-container x-effects'>
        <img class='fb_img' src='./img/varXY.png'>
        <p style='text-align:center'>
            <strong><span class='X'>X</span> -> <span class='Y'>Y</span></strong>
        </p>
        <div class='feedback-slider first-slider' id='AonB'>
            <div id="handle-AonB" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container x-effects'>
        <img class='fb_img' src='./img/varXZ.png'>
        <p style='text-align:center'>
            <strong><span class='X'>X</span> -> <span class='Z'>Z</span></strong>
        </p>
        <div class='feedback-slider second-slider' id='AonC'>
            <div id="handle-AonC" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container y-effects'>
        <img class='fb_img' src='./img/varYX.png'>
        <p style='text-align:center'>
            <strong><span class='Y'>Y</span> -> <span class='X'>X</span></strong>
        </p>
        <div class='feedback-slider third-slider' id='BonA'>
            <div id="handle-BonA" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container y-effects'>
        <img class='fb_img' src='./img/varYZ.png'>
        <p style='text-align:center'>
            <strong><span class='Y'>Y</span> -> <span class='Z'>Z</span></strong>
        </p>
        <div class='feedback-slider fourth-slider' id='BonC'>
            <div id="handle-BonC" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container z-effects'>
        <img class='fb_img' src='./img/varZX.png'>
        <p style='text-align:center'>
            <strong><span class='Z'>Z</span> -> <span class='X'>X</span></strong>
        </p>
        <div class='feedback-slider fifth-slider' id='ConA'>
            <div id="handle-ConA" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='feedback-slider-container z-effects'>
        <img class='fb_img' src='./img/varZY.png'>
        <p style='text-align:center'>
            <strong><span class='Z'>Z</span> -> <span class='Y'>Y</span></strong>
        </p>
        <div class='feedback-slider sixth-slider' id='ConB'>
            <div id="handle-ConB" class="ui-slider-handle"></div>
        </div>
    </div>
    <div class='val-link-button'>
        <button id='val-btn'>Done</button>
    </div>
</div>`;

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

var link_crime = `
<div class='condition-container'>
    <p>
        <strong>Let us start. </strong>
        <br>
        Please provide the links that correspond to your understanding of the causal dynamics in the following scenario:
        <br><br>
        <u>You are a small town mayor who is trying to understand the interplay between Criminality, Police action and the Satisfaction of your population.</u>
        <br>
        This is a complicated issue but sadly you only have access to three key indices:
        <br><br>
        - <strong>Crime Rate</strong>, representing the amount of Criminality in your town.
        <br>
        - <strong>Police action</strong>, representing the intensity of police action in your town
        <br>
        - <strong>Population happiness</strong>, representing how happy the population of you town is.
        <br><br>
        Please provide your understanding of this causal model in the next page.
        <br><br>
        <i style='font-size:small;'>Reminder of the rules: 
        <ul>
            <li><strong>0</strong>: no arrow from variable A to variable B means no effect of variable A on variable B</li>
            <li><strong>1</strong>: one positive arrow from A to B means that <strong>MORE of A</strong> results in <strong>MORE of B</strong></li>
            <li><strong>2</strong>: two positive arrows from A to B means that <strong>MORE of A</strong> results in <strong> a lot MORE of B</strong></li>
            <li><strong>-1</strong>: one arrow from A to B means that <strong>MORE of A</strong> results in <strong>LESS of B</strong></li>
            <li><strong>-2</strong>: two arrows from A to B means that <strong>MORE of A</strong> results in <strong>a lot LESS of B</strong></li>
        </ul></i>
    </p>
</div>`;

var link_finance = `
<div class='condition-container'>
    <p>
        Please provide the links that correspond to your understanding of the causal dynamics in the following scenario: 
        <br><br>
        <u>You are a state policy maker who is trying to manage a virus outbreak</u>.
        You have to decide on a lockdown policy to protect the population and limit the number of virus cases but want to balance it with the long term goal not to overly damage the economy.
        <br><br>
        Before making any decision you want to model the interplay between Stock Prices, the intensity of lockdown measures (for instance, total lockdown under all circumstances, partial, to allow people to still work or no lockdown at all) and the number of people affected by the virus.
        <br>
        This is a complicated issue but sadly you only have access to three key indices:
        <br><br>
        - <strong>Stock Prices</strong>, representing a global index of the stock market's health.
        <br>
        - <strong>Lockdown Measures</strong>, representing the intensity of lockdown measures on the territory.
        <br>
        - <strong>Virus Cases</strong>, the number of people affected by the virus.
        <br><br>
        Please provide your understanding of this causal model in the next page.
        <br><br>
        <i style='font-size:small;'>Reminder of the rules: 
        <ul>
            <li><strong>0</strong>: no arrow from node A to node B means no effect of node A on node B</li>
            <li><strong>1 or -1</strong>: one arrow from node A to node B means a moderate effect of node A on node B</li>
            <li><strong>2 or -2</strong>: two arrows from node A to node B means a strong effect of node A on node B</li>
        </ul></i>
    </p>
</div>`;

var link_estate = `
<div class='condition-container'>
    <p>
        Please provide the links that correspond to your understanding of the causal dynamics in the following scenario: 
        <br><br>
        <u>You are an urban planner in a developping city. You notice that the some neighbourhoods are more desirable than others.</u><br>
        You want to model the interplay, in a given neighbourhood, between House Prices, its Population density and its overall Desirability.
        <br>
        This is a complex issue but sadly you only have access to three key indices:
        <br><br>
        - <strong>House Prices</strong>, representing a global index of the real-estate market in the neighbourhood.
        <br>
        - <strong>Population Density</strong>, representing the number of inhabitants per km squared.
        <br>
        - <strong>Desirability</strong>, an index of the desirability of the neighbourhood gathered via polls in the population.
        <br><br>
        Please provide your understanding of this causal model in the next page.
        <br><br>
        <i style='font-size:small;'>Reminder of the rules: 
        <ul>
            <li><strong>0</strong>: no arrow from node A to node B means no effect of node A on node B</li>
            <li><strong>1 or -1</strong>: one arrow from node A to node B means a moderate effect of node A on node B</li>
            <li><strong>2 or -2</strong>: two arrows from node A to node B means a strong effect of node A on node B</li>
        </ul></i>
    </p>
</div>`;

var graph_intro_1 = `
<p class='base-p'>
    <strong> <span id='change-onfail'>Thank you for sharing your models! </span> </strong>
    <br><br>
    With these models, you were able to represent causes and effects in a static way. However, in reality, interactions between causes and effects happen over time. 
    In the next section, we will see a way to represent causal dynamics which takes time into account. 
    <br><br>
    In the next trials, you will see a graph with three lines representing the values of three variables changing through time according to a causal model like the ones you drew before.
    <br><br> 
    <u>Your goal is to understand the causal model underlying the behaviour of the lines by using handles allowing you to manually change their values. </u>
    <br><br>
    You will be able to report the sign, i.e. "+" or "-", and the strength, i.e. 0, 1 or 2 arrows, of the relationships you observe at any point during the trial using the interface you have used previously.
    <br>
    - <strong>No link (0)</strong>: as variable A goes UP, variable B does not move.
    <br>
    - <strong>Positive link (+1, +2)</strong>: as variable A goes UP, variable B goes UP as well
    <br>
    - <strong>Negative link (-1, -2)</strong>: as variable A goes UP, variable B goes DOWN
    <br><br>
    Each trial will last <strong>60 seconds / 1 minute</strong>. Sections will vary in difficulty, this is perfectly normal. It may seem abstract now but next page will show you a demo. 
    <br><br>
    You will have two tools at your disposal:
</p>
<ul>
    <li><strong>Interventions</strong>: three handles on the right allowing you to voluntarily change the value of one of the variables and observe changes in the values of the other two. <br> You can intervene on a variable by keeping hold of its handle with your mouse.</li>
    <li><strong>Observations</strong>: A graph on the left plots the values (i.e. vertical axis is the value) that the three variables took in the last 10 seconds (i.e. horizontal axis is time in seconds), 
        allowing you to observe their variations through time and the result of you interventions. These will be represented by a shading in the graph of variable's colour.</li> 
</ul>
<div id='spanLabels'>
    <p class='base-p'>
        There are two kinds of trial. In both cases the colours of the variables' names always corresponds to their respective colour on the graph:
    </p>
    <ul>
        <li><strong>Colours:</strong> variables are simply named after their colour, i.e. <span class='c-blue'>blue</span>, <span class='c-red'>red</span> and <span class='c-green'>green</span>.</li>
        <li><strong>Labels:</strong> variables have labels of concepts you have seen during the causal model task. In this case the task is the same but there will be an additional question asking you to report whether the relationships you observed during the task made sense to you.</li>
    </ul>
</div>
<p class='base-p'>

    The next page will show you a video to introduce you to the interface. It shows a brief extract of what the game looks like in real time.
</p>`;

//<img class='graph-intro-img' id='layout-ex' src='./img/layout-ex.PNG'>`;

var graph_intro_2 = `
<p class='base-p'>
    <strong>Watch carefully this short video to familiarise yourself with the interface. Press play to start.</strong> The first trial starts after a short quiz.
</p>
<div class='video-container'>
    <video id='pres-video'>
        <source src="./img/graphTuto3.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
<div style='width:100%;' class='control-container'>
    <button class='video-control' id='play_btn'>Play</button>
    <button class='video-control' id='pause_btn'>Pause</button>
<div>`;

var graph_intro_3 = `
<div>
    <fieldset style='margin-bottom: 10px;' class='quiz-1-field'>
    <legend>The goal of the task is to...</legend>
    <label for="quiz-1-1">... understand how the three variables relate to one another by simply observing the graph.</label>
    <input type="radio" name="quiz-1" id="quiz-1-1"><br>
    <label for="quiz-1-2">... understand how the three variables relate to one another by using the handles to make interventions and observe their effect on the graph.</label>
    <input type="radio" name="quiz-1" id="quiz-1-2"><br>
    <label for="quiz-1-3">... completely ignore the graph while guessing the links between the variables.</label>
    <input type="radio" name="quiz-1" id="quiz-1-3">
    </fieldset>

    <fieldset style='margin-bottom: 10px;' class='quiz-1-field'>
    <legend>What is the duration of each trial?</legend>
    <label for="quiz-2-1">2 minutes</label><br>
    <input type="radio" name="quiz-2" id="quiz-2-1">
    <label for="quiz-2-2">1 minute</label><br>
    <input type="radio" name="quiz-2" id="quiz-2-2">
    <label for="quiz-2-3">30 seconds</label>
    <input type="radio" name="quiz-2" id="quiz-2-3">
    </fieldset>

    <fieldset style='margin-bottom: 10px;' class='quiz-1-field'>
    <legend>Which of the following statement is <strong>false</strong>?</legend>
    <label for="quiz-3-1">Variables can have negative, positive links or no links at all.</label>
    <input type="radio" name="quiz-3" id="quiz-3-1"><br>
    <label for="quiz-3-2">Variables can have strong (i.e. 2 arrows) or normal (1 arrow) links.</label>
    <input type="radio" name="quiz-3" id="quiz-3-2"><br>
    <label for="quiz-3-3">Variables must have at least one link between them which can be positive or negative.</label>
    <input type="radio" name="quiz-3" id="quiz-3-3">
    </fieldset>

    <div id='submit-quiz-container'>
        <button id='submit-quiz'>Submit</button>
    </div>
</div>`;

var graph_intro_4 = `
<p class='base-p'>
Watch this video that shows a brief extract of how to report you findings. 
<br>
<strong> Next page will be a trial run with a simple causal model to practice the use of the interface.</strong>
</p>
<div class='video-container'>
    <video controls>
        <source src="./img/graphTuto2.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>`;




var graph_template = `
<div class='game-display'>
    <!-- Chart display -->
    <div class='graph-left-side'>
        <div class='chart_container'>
            <canvas id='progressPlot' style="width:100%;height:100%;"></canvas>
        </div>
        <div class='instruction-reminder'>
            <p>
                <strong>Rules reminder:</strong> 
                <br> - Use the handles on the right of the chart to manipulate the values of the variables
                <br> - You have 1 minute to attempt to understand the causal links between variables
                <br> - Report your findings, during or after the 1 minute, by using the six sliders on the far right of the screen
            </p>
        </div>
    </div>
    <div class='slider_container'>
        <div class='slider_box_container'>
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

        

        <!-- Feedback template-->
        <div class='feedback-container'>
            <div class='feedback-slider-container x-effects'>
                <img class='fb_img' src='./img/varXY.png'>
                <p class='fb-p' style='text-align:center'>
                    <strong><span class='X'>X</span> -> <span class='Y'>Y</span></strong>
                </p>
                <div class='feedback-slider first-slider' id='XonY'>
                    <div id="handle-XonY" class="ui-slider-handle"></div>
                </div>
            </div>
            <div class='feedback-slider-container x-effects'>
                <img class='fb_img' src='./img/varXZ.png'>
                <p class='fb-p' style='text-align:center'>
                    <strong><span class='X'>X</span> -> <span class='Z'>Z</span></strong>
                </p>
                <div class='feedback-slider second-slider' id='XonZ'>
                    <div id="handle-XonZ" class="ui-slider-handle"></div>
                </div>
            </div>
            <div class='feedback-slider-container y-effects'>
                <img class='fb_img' src='./img/varYX.png'>
                <p class='fb-p' style='text-align:center'>
                    <strong><span class='Y'>Y</span> -> <span class='X'>X</span></strong>
                </p>
                <div class='feedback-slider third-slider' id='YonX'>
                    <div id="handle-YonX" class="ui-slider-handle"></div>
                </div>
            </div>
            <div class='feedback-slider-container y-effects'>
                <img class='fb_img' src='./img/varYZ.png'>
                <p class='fb-p' style='text-align:center'>
                    <strong><span class='Y'>Y</span> -> <span class='Z'>Z</span></strong>
                </p>
                <div class='feedback-slider fourth-slider' id='YonZ'>
                    <div id="handle-YonZ" class="ui-slider-handle"></div>
                </div>
            </div>
            <div class='feedback-slider-container z-effects'>
                <img class='fb_img' src='./img/varZX.png'>
                <p class='fb-p' style='text-align:center'>
                    <strong><span class='Z'>Z</span> -> <span class='X'>X</span></strong>
                </p>
                <div class='feedback-slider fifth-slider' id='ZonX'>
                    <div id="handle-ZonX" class="ui-slider-handle"></div>
                </div>
            </div>
            <div class='feedback-slider-container z-effects'>
                <img class='fb_img' src='./img/varZY.png'>
                <p class='fb-p' style='text-align:center'>
                    <strong><span class='Z'>Z</span> -> <span class='Y'>Y</span></strong>
                </p>
                <div class='feedback-slider sixth-slider' id='ZonY'>
                    <div id="handle-ZonY" class="ui-slider-handle"></div>
                </div>
            </div>
        </div>

        <!-- <div class='button_container'>
            <button class='process' id='start_button'>Start</button>
            <button class='process' id='stop_button'>Stop</button>
        </div> -->

        <div class='graph-pred-rec-right'>
            <!-- RADIO with sense making -->
            <fieldset class='label-fb'>
                <legend>To what extent did the behaviour of the variables make sense?</legend>
                <label for="radio-1">Made no sense at all</label>
                <input type="radio" name="radio-1" id="radio-1"><br>
                <label for="radio-2">Made very little sense</label>
                <input type="radio" name="radio-1" id="radio-2"><br>
                <label for="radio-3">Somewhat made sense</label>
                <input type="radio" name="radio-1" id="radio-3"><br>
                <label for="radio-4">Made complete sense</label>
                <input type="radio" name="radio-1" id="radio-4"><br>
            </fieldset>
            <fieldset class='label-fb'>
                <legend>Please write in a few words the logic behind you answer:</legend>
                <textarea type='text' id='reason-qual' name='reason'></textarea>
            </fieldset>
        </div>

        <div class='val-link-button'>
            <button class='process' id='start_button'>Start</button>
            <button class='process' id='stop_button'>Stop</button>
            <button id='val-button'>Done</button>
        </div>
    </div>
</div>`;


var outro_1 = `
<p>
    <strong>Please tell us about you:</strong>
    <form>
    <fieldset class='age-field'>
        <legend>How old are you?</legend>
        <label for="age">Age:</label>
        <input id="age" name="age">
    </fieldset>
    <br>
    <fieldset class='gender-field'>
        <legend>What is your gender?</legend>
        <label for="female">Female</label>
        <input type="radio" name="gender" id="female">
        <label for="male">Male</label>
        <input type="radio" name="gender" id="male">
        <label for="other">Other</label>
        <input type="radio" name="gender" id="other">
    </fieldset>
    <br>
    <fieldset class='activity-field'>
        <legend>Select the sector that best describes you field:</legend>
        <select name="activity" id="activity_selector">
            <option selected value='none'>Choose sector</option>
            <option value='management'>Management of companies or enterprises</option>
            <option value='transport'>Transportation or warehousing</option>
            <option value='mining'>Mining</option>
            <option value='finance'>Finance or insurance</option>
            <option value='service'>Professional, scientific or technical services</option>
            <option value='manufacturing'>Manufacturing</option>
            <option value='build'>Construction</option>
            <option value='info'>Information</option>
            <option value='utils'>Utilities</option>
            <option value='art'>Arts, entertainment or recreation</option>
            <option value='edu'>Educational services</option>
            <option value='retail'>Retail trade</option>
            <option value='admin'>Admin, support, waste management or remediation services</option>
            <option value='forest'>Forestry, fishing, hunting or agriculture support</option>
            <option value='accomodation'>Accommodation or food services</option>
            <option value='trade'>Wholesale trade</option>
            <option value='realestate'>Real estate or rental and leasing</option>
            <option value='healthcare'>Health care or social assistance</option>
            <option value='unclassified'>Unclassified establishments</option>
        </select>
    </fieldset>
    <br>
    <fieldset class='causal-familiarity-field'>
        <legend>To what extent were you familiar with causal modelling prior to this study?</legend>
        <label for="never">Not at all familiar</label>
        <input type="radio" name="causal-familiarity" id="never">
        <label for="once">Not really familiar</label>
        <input type="radio" name="causal-familiarity" id="once">
        <label for="somewhat">Somewhat familiar</label>
        <input type="radio" name="causal-familiarity" id="somewhat">
        <label for="familiar">Familiar</label>
        <input type="radio" name="causal-familiarity" id="familiar">
        <label for="extreme">Extremely familiar</label>
        <input type="radio" name="causal-familiarity" id="extreme">
    </fieldset>
    <br>
    <fieldset class='loopy-fb-field'>
        <legend>To what extent did you find the causal model section entertaining?</legend>
        <label for="loopy-hate">I really disliked it</label>
        <input type="radio" name="loopy-fb" id="loopy-hate">
        <label for="loopy-annoy">I disliked it</label>
        <input type="radio" name="loopy-fb" id="loopy-annoy">
        <label for="loopy-indif">I don't mind it</label>
        <input type="radio" name="loopy-fb" id="loopy-indif">
        <label for="loopy-like">I liked it</label>
        <input type="radio" name="loopy-fb" id="loopy-like">
        <label for="loopy-love">I really liked it</label>
        <input type="radio" name="loopy-fb" id="loopy-love">
    </fieldset>
    <br>
    <fieldset class='graph-fb-field'>
        <legend>To what extent did you find the graph interface entertaining to use?</legend>
        <label for="graph-hate">I really disliked it</label>
        <input type="radio" name="graph-fb" id="graph-hate">
        <label for="graph-annoy">I disliked it</label>
        <input type="radio" name="graph-fb" id="graph-annoy">
        <label for="graph-indif">I don't mind it</label>
        <input type="radio" name="graph-fb" id="graph-indif">
        <label for="graph-like">I liked it</label>
        <input type="radio" name="graph-fb" id="graph-like">
        <label for="graph-love">I really liked it</label>
        <input type="radio" name="graph-fb" id="graph-love">
    </fieldset>
    </form>
</p>`;

var outro_2 = `
<p> 
    This experiment is a pilot, we are still correcting bugs and gathering feedback on its flow. 
    <br>
    There is no obligation to complete these if you do not feel comfortable sharing technical information.
    <form style='width;70%;'>
    <fieldset class='screen-field'>
        <legend>What is the size of you screen?</legend>
        <label for="11inch">11 inches</label>
        <input type="radio" name="screen" id="11inch">
        <label for="13inch">13 inches</label>
        <input type="radio" name="screen" id="13inch">
        <label for="15inch">15 inches</label>
        <input type="radio" name="screen" id="15inch">
        <label for="20inch">More than 15 inches</label>
        <input type="radio" name="screen" id="20inch">
    </fieldset>
    <br>
    <fieldset class='pc-field'>
        <legend>Which PC operating system are you using?</legend>
        <label for="mac">Apple Mac</label>
        <input type="radio" name="pc" id="mac">
        <label for="windows">Microsoft Windows</label>
        <input type="radio" name="pc" id="windows">
        <label for="linux">Linux</label>
        <input type="radio" name="pc" id="linux">
    </fieldset>
    <br>
    <fieldset class='browser-field'>
        <legend>Which browser are you using?</legend>
        <label for="chrome">Google Chrome</label>
        <input type="radio" name="browser" id="chrome">
        <label for="edge">Microsoft Edge</label>
        <input type="radio" name="browser" id="edge">
        <label for="firefox">Firefox</label>
        <input type="radio" name="browser" id="firefox">
        <label for="safari">Safari</label>
        <input type="radio" name="browser" id="safari">
        <label for="opera">Opera</label>
        <input type="radio" name="browser" id="opera">
    </fieldset>
    <br>
    <fieldset class='graph-tech-field'>
        <legend>Did the graph and sliders...</legend>
        <label for="running">... keep running between sections.</label>
        <input type="checkbox" name="graph-tech" id="running"><br>
        <label for="reset">... not reset between sections</label>
        <input type="checkbox" name="graph-tech" id="reset"><br>
        <label for="misalign">... misalign (i.e. the sliders did not follow the graph lines properly)</label>
        <input type="checkbox" name="graph-tech" id="misalign">
    </fieldset>
    <br><br>
    <fieldset class='technical-fb'>
        <legend>Did you experience any other technical issues? (display, interface or otherwise)</legend>
        <textarea type='text' id='tech-fb' name='tech'></textarea>
    </fieldset>
    </form>
</p>`;

var outro_3 = `
<p class='base-p'>
    All done, you have reached the end of this experiment, thank you very much for participating!
    <br><br>
    Please click on the link below to go back to the Prolific platform and receive your compensation.
    <br><br>
    Back to prolific: <a id='prolific-link' href='#'>Back to Prolific.co</a>
</p>`;

var outro_4 = `
<p class='base-p'>
    Thank you for you participation!
</p>`;



// OLD VERSION OF PAGES

var feedback_template = `
<div class='graph-pred-label'>
    <p>
        Please indicate your understanding of the causal dynamics using the graph below: 
    </p>
</div>
<div class='graph-pred-rec'>
    <div class='graph-pred-rec-left'>
        <div class='feedback-slider-container'>
            <img class='fb_img' src='./img/varXY.png'>
            <p style='text-align:center'>
                <strong><span class='X'>X</span> -> <span class='Y'>Y</span></strong>
            </p>
            <div class='feedback-slider' id='XonY'>
                <div id="handle-XonY" class="ui-slider-handle"></div>
            </div>
        </div>
        <div class='feedback-slider-container'>
            <img class='fb_img' src='./img/varXZ.png'>
            <p style='text-align:center'>
                <strong><span class='X'>X</span> -> <span class='Z'>Z</span></strong>
            </p>
            <div class='feedback-slider' id='XonZ'>
                <div id="handle-XonZ" class="ui-slider-handle"></div>
            </div>
        </div>
        <div class='feedback-slider-container'>
            <img class='fb_img' src='./img/varYX.png'>
            <p style='text-align:center'>
                <strong><span class='Y'>Y</span> -> <span class='X'>X</span></strong>
            </p>
            <div class='feedback-slider' id='YonX'>
                <div id="handle-YonX" class="ui-slider-handle"></div>
            </div>
        </div>
        <div class='feedback-slider-container'>
            <img class='fb_img' src='./img/varYZ.png'>
            <p style='text-align:center'>
                <strong><span class='Y'>Y</span> -> <span class='Z'>Z</span></strong>
            </p>
            <div class='feedback-slider' id='YonZ'>
                <div id="handle-YonZ" class="ui-slider-handle"></div>
            </div>
        </div>
        <div class='feedback-slider-container'>
            <img class='fb_img' src='./img/varZX.png'>
            <p style='text-align:center'>
                <strong><span class='Z'>Z</span> -> <span class='X'>X</span></strong>
            </p>
            <div class='feedback-slider' id='ZonX'>
                <div id="handle-ZonX" class="ui-slider-handle"></div>
            </div>
        </div>
        <div class='feedback-slider-container'>
            <img class='fb_img' src='./img/varZY.png'>
            <p style='text-align:center'>
                <strong><span class='Z'>Z</span> -> <span class='Y'>Y</span></strong>
            </p>
            <div class='feedback-slider' id='ZonY'>
                <div id="handle-ZonY" class="ui-slider-handle"></div>
            </div>
        </div>
        <button class='val-link-button' id='val-button'>Done</button>
    </div>
    <div class='graph-pred-rec-right'>
        <!-- Need RADIO with sense making -->
        <fieldset class='label-fb'>
            <legend>To what extent did the behaviour of the variables feel logical?</legend>
            <label for="radio-1">Completely illogical</label>
            <input type="radio" name="radio-1" id="radio-1"><br>
            <label for="radio-2">Somewhat illogical</label>
            <input type="radio" name="radio-1" id="radio-2"><br>
            <label for="radio-3">Somewhat logical</label>
            <input type="radio" name="radio-1" id="radio-3"><br>
            <label for="radio-4">Completely logical</label>
            <input type="radio" name="radio-1" id="radio-4"><br>
        </fieldset>
        <fieldset class='label-fb'>
            <legend>Please write in a few words the logic behind you answer:</legend>
            <textarea type='text' id='reason-qual' name='reason'></textarea>
        </fieldset>
    </div>
</div>`;


var graph_template_old = `
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