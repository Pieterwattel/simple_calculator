/*
===========
>>>INDEX<<<
===========

> Variable Declarations
    >> Node Declarations		
        >>> Numbers
        >>> Operators
        >>> Functional
    >> Other Global Variables
> Functions
    >> Utility Functions
    >> Controller Functions
> Dom Generation
    >> Node Creation
    >> Listeners
*/

//#region   > Variable Declarations
//#region       >> Node declaration / generation
//#region           >>> Containers
const contentBase = document.getElementById(`contentBase`)
    const calculatorFrame = document.getElementById(`calculatorFrame`)

        const displayFrame = document.getElementById(`displayFrame`)
            const displayTop = document.getElementById(`displayTop`)
            const displayBottom = document.getElementById(`displayBottom`)

        const btnsFrameMain = document.getElementById(`btnsFrameMain`)
            const staticBtnFrame = document.getElementById(`staticBtnFrame`)
                const btnFrameFunc = document.getElementById(`btnFrameFunc`)
                const btnFrameNum = document.getElementById(`btnFrameNum`)

            const btnFrameOperator = document.getElementById(`btnFrameOperator`)

//btnFrameOperator.style.backgroundColor= "rebeccapurple";


//#endregion	
//#region           >>> Numbers
const numBtns = {}
for (let i = 9; i >= 0; i--){
    numBtns[i] = document.getElementById(`btn${i}`);
}
//#endregion
//#region           >>> Operators

let operatorObject = [
    {
    id: 'btnAdd' ,
    sign: '+' ,   
    },
    {
    id: 'btnSubtract' ,
    sign: '-',   
    } ,
    {
    id: 'btnMultiply' ,
    sign: '*',   
    } ,
    {
    id: 'btnDivide' ,
    sign: '/',   
    } ,
]

operatorObject.forEach ((prop) => {
    let btn = document.createElement("button")
    btnFrameOperator.appendChild(btn)
    btn.setAttribute("id" , prop.id)
    btn.classList.add("btn")
    btn.textContent = prop.sign
})


// empty operator, for later additions
/*
    {
    name: '' ,
    id: '' ,
    value: '',   
    } ,
*/

//#endregion
//#region           >>> Other Buttons

let otherBtns = [
    {
    id: 'btnEquals' ,
    sign: '=' ,   
    },
    {
    id: 'btnans' ,
    sign: 'ans',   
    } ,
    {
    id: 'btnClear' ,
    sign: 'C',   
    } ,
    {
    id: 'btnClearEntry' ,
    sign: 'CE',   
    } ,
]

otherBtns.forEach ((prop) => {
    let btn = document.createElement("button")
    btnFrameFunc.appendChild(btn)
    btn.setAttribute("id" , prop.id)
    btn.classList.add("btn")
    btn.textContent = prop.sign
})


//#endregion
//#endregion
//#region       >> Global Variables

// variables that hold calculation data:
let num1 = ""
let num2 = ""
let operator = ""
let ans = ""

let displayNum1 = ""
let displayNum2 = ""

let currentNum = num1

numSwitchFlag = true


//#endregion
//#endregion
//#region   > Functions 
//#region       >> Utility Functions
function logId (e){
    console.log(`hi! is seems that the ${e.target.id} item was clicked`)
}

function getId (e){
    return e.target.id
}

function logNum (e){
    console.log(`hi! is seems that the ${e.target.id.replace('btn', "")} item was clicked`)
}

function switchCurrentNum (){
    if (numSwitchFlag == true){
        currentNum = num2
        numSwitchFlag = false
    } else if (numSwitchFlag == false){
        currentNum = num1
        numSwitchFlag = true
    }
}

function updateNum () {
    if (numSwitchFlag == true){
        num1 = currentNum
    } else if (numSwitchFlag == false){
        num2 = currentNum
    }
    displayNum1 = num1
    displayOperator = operator
    displayNum2 = num2
}

function addSpaces(){
    if (displayNum1 != "" && displayNum1[displayNum1.length-1] != " "){
        displayNum1 += " "
    }
    if (displayOperator != "" && displayOperator[displayOperator.length-1] != " "){
        displayOperator += " "
    }
}

function makeNumber(value){
    return parseFloat(value)    
}

function getFunction(e){
    switch (e.target.textContent){
        case "=": 
        calculate(num1, operator, num2)
        displayAns()
        switchCurrentNum();
        break;

        case "ans": 
        break;

        case "C": 
        clearAll()
        break;

        case "CE": 
        clearEntry()
        break;

        default: 
        alert ("Unknown function button presseds")
    }
}

function clearEntry(){
    num1 = ""
    num2 = ""
    operator = ""
    currentNum = ""
    updateDisplay()
}

function clearAll(){
    num1 = ""
    num2 = ""
    operator = ""
    currentNum = ""
    ans = ""
    updateDisplay()
}

function calculate (value1, operator, value2){
    switch (operator){
        case (operatorObject[0].sign):
//          addition
            ans = (value1 + value2)
            break;

        case (operatorObject[1].sign):
//          subtraction
            ans = (value1 - value2)
            break;

        case (operatorObject[2].sign):
//          multiplication
            ans = (value1 * value2)
            break;

        case (operatorObject[3].sign):
//          division
            ans = (value1 / value2)
            break;

        default:
            console.log(operator + " not working yet " + operatorObject[0].sign)
    }
}

function displayEntry(){
    displayTop.textContent = displayNum1 + displayOperator + displayNum2
}

function displayAns(){
    displayBottom.textContent = ans
}

//#endregion
//#region       >> Controller Functions
function operatorPress (e) {
    switchCurrentNum();
    operator = e.target.textContent
    updateDisplay ();
}

function numberPress (e) {
    let newNum = e.target.id.replace('btn', "")
    currentNum = currentNum.concat(newNum)
    updateDisplay ();
}

function functionPress (e) {
    num1 = makeNumber(num1)
    num2 = makeNumber(num2)
    getFunction(e)
}


function updateDisplay (){
    updateNum()
    addSpaces()
    displayEntry()
    displayAns()
}


//#endregion
//#endregion
//#region   > Dom Generation
//#region       >> LISTENERS

btnFrameFunc.childNodes.forEach(child => {
    child.addEventListener("click", functionPress);
});

btnFrameNum.childNodes.forEach(child => {
    child.addEventListener("click", numberPress);
});

btnFrameOperator.childNodes.forEach(child => {
    child.addEventListener("click", operatorPress);
});

//#endregion
//#endregion