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

let userInput = "0 + 1 * 2 / 3"
updateDisplay()

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

/*
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
*/

/*
function addSpaces(){
    if (displayNum1 != "" && displayNum1[displayNum1.length-1] != " "){
        displayNum1 += " "
    }
    if (displayOperator != "" && displayOperator[displayOperator.length-1] != " "){
        displayOperator += " "
    }
}
*/

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
        runAns()
        break;

        case "C": 
        clearAll()
        break;

        case "CE": 
        clearEntry()
        break;

        default: 
        alert ("Unknown function button pressed")
    }
}

function runAns (){

}

function clearAll(){
    userInput = ""
    ans = ""
    updateDisplay()
}

function clearEntry(){
    userInput = ""
    updateDisplay()
}

function makeOperatorString (operator){
    switch (operator){
        case (operatorObject[0].sign):
//          addition
            return " " + operator + " "
            break;

        case (operatorObject[1].sign):
//          subtraction
            return " " + operator + " "
            break;

        case (operatorObject[2].sign):
//          multiplication
            return " " + operator + " "
            break;

        case (operatorObject[3].sign):
//          division
            return " " + operator + " "
            break;

        default:
            console.log("operator: " + operator + ", not working yet in operatorString()")
    }
    clearEntry()
}

function separateStringSymbols (string){
    let i = string.length
    let j = 0
    while (j < i){
        makeInputArray(string.charAt(j))
        j++
    }
}

function makeInputArray(symbol){
    let result = numberOrOperator(symbol)
    if (result == "number"){
        console.log(symbol + " was a number")
    } else if (result == "operator"){
        console.log(symbol + " was an operator")
    } else if (result == "error"){
        alert (`${symbol} ... is invalid. It might not be possible to use this operator yet..
             I am vewwy sowwy (◞‸ ◟)💧`)
    } else {
        console.log("value falls outside makeInoputArray() if statement options")
    }
}




/*
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
            console.log(operator + " with value" + operatorObject[0].sign + " not working yet")
    }
    clearEntry()
}
    */


function displayEntry(){
    displayTop.textContent = userInput
}

function displayAns(){
    displayBottom.textContent = ans
}

function numberOrOperator (value) {
    if (Number(parseFloat(value)) || value == "."){
       return "number"
    } else if (operatorObject.some(element => element.sign === value)) {
        return "operator"
    } else {
        console.log(`symbol "${value}" is no operator or number in numberOrOperator()`)
        return "invalid"
    }
}

//#endregion
//#region       >> Controller Functions
function operatorPress (e) {
//    switchCurrentNum();
    let operatorString = makeOperatorString(e.target.textContent)
    userInput += operatorString
    updateDisplay ();
}

function numberPress (e) {
    let newNum = e.target.id.replace('btn', "")
    userInput += newNum
    updateDisplay ();
}

function functionPress (e) {
    num1 = makeNumber(num1)
    num2 = makeNumber(num2)
    getFunction(e)
}


function updateDisplay (){
//    updateNum()
//    addSpaces()
    displayEntry()
    displayAns()
}

function calculate(){
    let userInputArray = separateStringSymbols(userInput.replace(/ /g,""))

    console.log(userInputArray)
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