var pageThree_One = 'https://ncase.me/loopy/v1.1/?data=[[[1,533,243,1,%22A%22,4],[2,539,491,1,%22B%22,0]],[[1,2,-6,-1,0]],[[747,268,%22Simple%2520cause%2520and%2520effect%250ANotice%2520the%2520%27-%27%2520sign%252C%2520%250Ahere%2520more%2520A%2520is%2520less%2520B.%22],[671,377,%22(Effect%2520of)%2520A%2520on%2520B%253A%2520-1%22]],2%5D'

var pageThree_Two = 'https://ncase.me/loopy/v1.1/?data=[[[1,440,199,1,%22A%22,4],[2,741,207,1,%22B%22,0],[3,585,418,1,%22C%22,3]],[[1,3,-58,1,0],[1,2,32,1,0],[1,2,75,1,0]],[[778,395,%22Multiple%2520effect%253A%2520%250AA%2520causes%2520B%2520and%2520C%250A%250ANotice%2520the%2520two%2520%250Aarrows%2520from%2520A%2520to%2520B.%2520%250A%250AThis%2520represents%2520%250Athe%2520fact%2520that%2520the%2520effect%2520%250Ais%2520twice%2520as%2520strong.%22],[586,96,%22A%2520on%2520B%253A%25202%22],[376,354,%22A%2520on%2520C%253A%25201%22]],3%5D'

var pageThree_Three = 'https://ncase.me/loopy/v1.1/?data=[[[1,393,248,1,%22A%22,4],[2,691,251,1,%22B%22,0],[3,538,467,1,%22C%22,3]],[[1,3,-49,-1,0],[2,3,42,-1,0]],[[731,385,%22B%2520on%2520C%253A%2520-1%22],[340,385,%22A%2520on%2520C%253A%2520-1%22],[546,214,%22Causal%2520convergence%253A%250Aindependent%2520variables%250AA%2520and%2520B%2520combine%2520%250Ato%2520cause%2520C%22]],3%5D'

var pageFour_One = 'https://ncase.me/loopy/v1.1/?data=[[[1,501,229,1,%22A%22,4],[2,799,232,1,%22B%22,0],[3,646,448,1,%22C%22,3]],[[1,2,-7,-1,0]],[],3%5D'

var pageFour_Two = 'https://ncase.me/loopy/v1.1/?data=[[[1,477,245,1,%22A%22,4],[2,778,253,1,%22B%22,0],[3,622,464,1,%22C%22,3]],[[1,3,-58,1,0],[1,2,32,1,0],[1,2,75,1,0]],[],3%5D'

var pageFour_Three = 'https://ncase.me/loopy/v1.1/?data=[[[1,501,229,1,%22A%22,4],[2,799,232,1,%22B%22,0],[3,646,448,1,%22C%22,3]],[[2,3,42,-1,0],[1,3,-44,-1,0]],[],3%5D'

var pageFour_Four = 'https://ncase.me/loopy/v1.1/?data=[[[1,440,199,1,%22Asthma%22,4],[2,741,207,1,%22Flu%22,0],[3,581,417,1,%22Cough%22,3]],[],[[501,326,%22%253F%22],[671,324,%22%253F%22],[585,212,%22%253F%22]],3%5D'

var pageFour_crime_1 = 'https://ncase.me/loopy/v1.1/?data=[[[3,483,208,1,%22Crime%2520rate%22,4],[4,803,209,1,%22Police%2520action%22,0],[5,649,435,1,%22Population%2520Happiness%22,3]],[],[[642,218,%22%253F%22],[750,337,%22%253F%22],[536,342,%22%253F%22]],5%5D'
var pageFour_crime_2 = 'https://ncase.me/loopy/v1.1/?data=[[[3,483,208,1,%22Police%2520Action%22,4],[4,803,209,1,%22Population%2520Happiness%22,0],[5,649,435,1,%22Crime%2520Rate%22,3]],[],[[642,218,%22%253F%22],[750,337,%22%253F%22],[536,342,%22%253F%22]],5%5D'
var pageFour_crime_3 = 'https://ncase.me/loopy/v1.1/?data=[[[3,483,208,1,%22Population%2520Happiness%22,4],[4,803,209,1,%22Crime%2520Rate%22,0],[5,649,435,1,%22Police%2520Action%22,3]],[],[[642,218,%22%253F%22],[750,337,%22%253F%22],[536,342,%22%253F%22]],5%5D' 

var crime_groundtruth = 'https://ncase.me/loopy/v1.1/?data=[[[1,478,239,1,%22Crime%2520Rate%22,4],[3,800,248,1,%22Police%2520Action%22,0],[4,636,454,1,%22Population%2520Happiness%22,3]],[[1,3,113,1,0],[1,4,-115,-1,0],[3,4,116,-1,0],[3,1,88,-1,0],[3,1,20,-1,0],[1,3,165,1,0]],[],4%5D'

var pageFour_finance_1 = 'https://ncase.me/loopy/v1.1/?data=[[[3,487,208,1,%22Lockdown%2520Measures%22,4],[4,800,208,1,%22Virus%2520Cases%22,0],[5,646,434,1,%22Stock%2520Prices%22,3]],[],[[542,336,%22%253F%22],[645,213,%22%253F%22],[743,336,%22%253F%22]],6%5D'
var pageFour_finance_2 = 'https://ncase.me/loopy/v1.1/?data=[[[3,487,208,1,%22Virus%2520Cases%22,4],[4,800,208,1,%22Stock%2520Prices%22,0],[5,646,434,1,%22Lockdown%2520Measures%22,3]],[],[[542,336,%22%253F%22],[645,213,%22%253F%22],[743,336,%22%253F%22]],6%5D'
var pageFour_finance_3 = 'https://ncase.me/loopy/v1.1/?data=[[[3,487,208,1,%22Stock%2520Prices%22,4],[4,800,208,1,%22Lockdown%2520Measures%22,0],[5,646,434,1,%22Virus%2520Cases%22,3]],[],[[542,336,%22%253F%22],[645,213,%22%253F%22],[743,336,%22%253F%22]],6%5D'

var pageFour_estate_1 = 'https://ncase.me/loopy/v1.1/?data=[[[3,484,209,1,%22House%2520Prices%22,4],[4,802,208,1,%22Population%2520Density%22,0],[5,639,434,1,%22Desirability%22,3]],[],[[540,337,%22%253F%22],[639,220,%22%253F%22],[731,342,%22%253F%22]],5%5D'
var pageFour_estate_2 = 'https://ncase.me/loopy/v1.1/?data=[[[3,484,209,1,%22Population%2520Density%22,4],[4,802,208,1,%22Desirability%22,0],[5,639,434,1,%22House%2520Prices%22,3]],[],[[540,337,%22%253F%22],[639,220,%22%253F%22],[731,342,%22%253F%22]],5%5D'
var pageFour_estate_3 = 'https://ncase.me/loopy/v1.1/?data=[[[3,484,209,1,%22Desirability%22,4],[4,802,208,1,%22House%2520Prices%22,0],[5,639,434,1,%22Population%2520Density%22,3]],[],[[540,337,%22%253F%22],[639,220,%22%253F%22],[731,342,%22%253F%22]],5%5D'