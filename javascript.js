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
//#region           >>> Calculation Symbols

let symbolObject = [
    {
    id: 'btnAdd' ,
    sign: '+' ,  
    precedence: 5 , 
    category: "operator"
    },
    {
    id: 'btnSubtract' ,
    sign: '-',   
    precedence: 5 , 
    category : "operator"
    } ,
    {
    id: 'btnMultiply' ,
    sign: ['*', 'x'],   
    precedence: 4 , 
    category: "operator"
    } ,
    {
    id: 'btnDivide' ,
    sign: '/',   
    precedence: 4 ,
    category: "operator"
    } ,
]

symbolObject.forEach ((prop) => {
    let btn = document.createElement("button")
    btnFrameOperator.appendChild(btn)
    btn.setAttribute("id" , prop.id)
    btn.classList.add("btn")
    btn.textContent = prop.sign[0]
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
let operator = ""
let ans = ""

let userInput = "1 + 2 + 4"
//1 - 1 x 2
updateDisplay()

let currentElement = ""
let inputArray = []

let currentNum = ""

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

/*
function switchCurrentNum (){
    if (numSwitchFlag == true){
        currentNum = num2
        numSwitchFlag = false
    } else if (numSwitchFlag == false){
        currentNum = num1
        numSwitchFlag = true
    }
}
*/

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
        calculate()
        displayAns()
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
        case (symbolObject[0].sign[0]):
//          addition
            return " " + operator + " "
            break;

        case (symbolObject[1].sign[0]):
//          subtraction
            return " " + operator + " "
            break;

        case (symbolObject[2].sign[0]):
//          multiplication
            return " " + operator + " "
            break;

        case (symbolObject[3].sign[0]):
//          division
            return " " + operator + " "
            break;

        default:
            console.log("operator: " + operator + ", not working yet in operatorString()")
    }
    clearEntry()
}


/*
function calculate (value1, operator, value2){
    switch (operator){
        case (symbolObject[0].sign):
//          addition
            ans = (value1 + value2)
            break;

        case (symbolObject[1].sign):
//          subtraction
            ans = (value1 - value2)
            break;

        case (symbolObject[2].sign):
//          multiplication
            ans = (value1 * value2)
            break;

        case (symbolObject[3].sign):
//          division
            ans = (value1 / value2)
            break;

        default:
            console.log(operator + " with value" + symbolObject[0].sign + " not working yet")
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

function evaluateStringSymbols (string){
    
// 3 values that can be given, to evaluate the context of a symbol
    let previousValue =- ""
    let value = ""
    let nextValue = ""

    let i = string.length
    let j = 0
    while (j < i){
        previousValue = string.charAt(j-1)
        value = string.charAt(j)
        nextValue = string.charAt(j+1)
        makeInputArray(previousValue, value, nextValue)
        j++
    }

    // small script to also add the very last value to inputArray[]
    if (numberOrOperator(previousValue, value, nextValue) == "number" ){
        inputArray.push(currentElement)
    } else if (numberOrOperator(previousValue, value, nextValue) == "operator" ){
        inputArray.push(string.charAt(j-1))
    }
}

function numberOrOperator (previousValue, value,  nextValue) {
    let returnValue = ""

    // check if value is number, returns string "number"
    if (Number(parseFloat(value)) || value == "." || value == "0"){
//        console.log(`value "${value}" is a number`)
       returnValue = "number"
    }

    // check if value is operator, returns array [operator,  arrayIndex()]
    symbolObject.forEach(element => {
        if (element.sign.includes(value)){
            returnValue = checkOperator(previousValue, value, nextValue)
        }
    })

    //value was not a number nor known operator
    if  (returnValue == "error"){
        console.log(`value "${value}" was no operator or number`)
        returnValue = "error"
    }

    return returnValue
}

function makeInputArray(previousValue, value, nextValue){    
    result = numberOrOperator(previousValue, value, nextValue)
// check of the value if it is a number.
    if (result == "number"){
        currentElement += value

// then check if it is an operator, using the previous and next value to evaluate that
    } else if (typeof result == "object"){
        inputArray.push(currentElement)
        inputArray.push(result)
        currentElement = ""

    } else if (result == "error"){
        alert (`${value} ... is invalid. It might not be possible to use this operator yet..
             I am vewwy sowwy (◞‸ ◟)💧`)

    } else {
        console.log("value falls outside makeInputArray() if statement options")

    }
}

function checkOperator (previousValue, value, nextValue){
    switch (true){
        case (symbolObject[0].sign.includes(value)):
//          addition
            return symbolObject[0]
            break;

        case (symbolObject[1].sign.includes(value)):
//          subtraction
            if (previousValue == "" || 
                !Number(previousValue)){
                return "number"
            } else {

            return symbolObject[1]
            }
            break;

        case (symbolObject[2].sign.includes(value)):
//          multiplication
            return symbolObject[2]
            break;

        case (symbolObject[3].sign.includes(value)):
//          division
            return symbolObject[3]
            break;

        default:
            return "error"
    }
}

function calculateInOrder(array, i){
    let repeat = false
    array.some((element, index) => {
        if (typeof element == "object" && element.precedence == i){
            doCalculation(element, index)
            calculateInOrder(array, i)
            repeat = true
            return true
        }
    })

    if (repeat){
        calculateInOrder(array, i)
    } else if (i < 6){
        i++
        calculateInOrder(array, i)
    } else if (i == 1){
        return array
    }
}

function doCalculation (operator, index){
    let opSymbol = operator.sign
    let result = ""
    let previousValue = editArray[index-1]
    let nextValue = editArray[index+1]
    console.log(`doCalculation run with operator: ${operator.sign}, previousValue: ${previousValue}, nextValue: ${nextValue}`)

    switch (true){
        case (symbolObject[0].sign.includes(opSymbol)):
//          addition
                result = +previousValue + +nextValue
                
                editArray.splice(index-1, 3, result)
            break;

        case (symbolObject[1].sign.includes(opSymbol)):
//          subtraction
            if (previousValue == "" || 
                !Number(previousValue)){
                return "numbdocalcuer"
            } else {

            return symbolObject[1]
            }
            break;

        case (symbolObject[2].sign.includes(opSymbol)):
//          multiplication
            return symbolObject[2]
            break;

        case (symbolObject[3].sign.includes(opSymbol)):
//          division
            return symbolObject[3]
            break;

        default:
            return "error"
    }
}

function doubleOperators (element){
    console.log(element)
    /*
    switch (operator){
        case (symbolObject[0].sign):
//          addition
            ans = (value1 + value2)
            break;

        case (symbolObject[1].sign):
//          subtraction
            ans = (value1 - value2)
            break;

        case (symbolObject[2].sign):
//          multiplication
            ans = (value1 * value2)
            break;

        case (symbolObject[3].sign):
//          division
            ans = (value1 / value2)
            break;

        default:
            console.log(operator + " with value" + symbolObject[0].sign + " not working yet")

        }*/
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
    getFunction(e)
}


function updateDisplay (){
//    updateNum()
//    addSpaces()
    displayEntry()
    displayAns()
}

let editArray = []

function calculate(){
    evaluateStringSymbols(userInput.replace(/ /g,""))
    editArray = JSON.parse(JSON.stringify(inputArray));
    checkForErrors(editArray)
    calculateInOrder(editArray, 1)
    ans = editArray
    console.log(ans)
}

function checkForErrors (array ) {
    let j = array.length -1
    for (let i = 0 ; i <= j ; i++){
        let currentElement = array[i]
        let previousElement = array[i-1]
        let nextElement = array[i+1]
        let index = i
        
    }
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