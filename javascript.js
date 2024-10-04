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

//to add an operator:
add the operator to the operatorObject + different ways that it can be written
write a way to check for this operator in the checkOperator()
add the calculation in the doCalculation function
think about possible errors, and add these in checkForErrors()
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

let userInput = "1 + 2"
updateDisplay()

let currentElement = ""
let inputArray = []

let currentNum = ""

let errorCheckIteration = 0


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


function makeNumber(value){
    return parseFloat(value)    
}

function getFunction(e){
    switch (e.target.textContent){
        case "=": 
        runEquals()
        break;

        case "ans": 
        runAns()
        break;

        case "C": 
        clearDisplay()
        break;

        case "CE": 
        clearEntry()
        break;

        default: 
        alert ("Unknown function button pressed")
    }
}

function runEquals (){
    ans = ""
    inputArray.length = 0
    calculate()
    displayAns()
    inputArray = []
    editArray = []
    currentElement = ""
    clearEntry()
}

function clearAllValues(){
    ans = ""
}

function runAns (){
    displayTop.textContent += ans
}

function clearDisplay(){
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
//        console.log("value is" + value)
//        console.log("currentElement is" + currentElement)        
        currentElement += value

// then check if it is an operator, using the previous and next value to evaluate that
    } else if (typeof result == "object"){
        if (currentElement != ""){
            inputArray.push(currentElement)
        }
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
let operationFound = false
// find an element with following arguments: the element and the index
    array.some((element, index) => {
// if the element is an object and precedence is (i) do:
        if (typeof element == "object" && element.precedence == i){
// do a calculation, (find the operator that the object is, 
//use the values around of the array to get the answer, and splice the unneeded values.
            doCalculation(element, index)

// end the function when the calculation was done
            operationFound = true
            return true
        }
// if no operators of this precedence were found, check a lower precedence value
        return false
    })

    if (operationFound) {
        calculateInOrder(array,i)
    } else if(i < 7){
        calculateInOrder (array, i+1)
    } 
    
    if (array.length == 1){
        return array
    }

}

function doCalculation (operator, index){
    console.log("doCalculation was accessed")
    let opSymbol = operator.sign
    let result = ""
    let previousValue = editArray[index-1]
    let nextValue = editArray[index+1]

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

function doubleOperators (
    prePreviousElement, 
    previousElement, 
    currentElement, 
    nextElement, 
    nextNextElement,
    index,
    array){
    switch (true){
        case (symbolObject[0].sign === currentElement.sign):
//          addition

            if (previousElement.category == "operator"){
                array.splice(index, 1)
                errorCheckIteration--
            }
            break;

        case (symbolObject[1].sign == currentElement.sign):
//          subtraction
            break;

        case (symbolObject[2].sign == currentElement.sign):
//          multiplication
            break;

        case (symbolObject[3].sign == currentElement.sign):
//          division
            break;

        default:
            alert ("doubleOperators() error")
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
    userInput = displayTop.textContent
    evaluateStringSymbols(userInput.replace(/ /g,""))
    editArray = structuredClone(inputArray);
    checkForErrors(editArray)
    calculateInOrder(editArray, 1)

    ans = editArray
}

function checkForErrors (array) {
    
    let j = array.length -1
    for (let i = 0 ; i <= j ; i++){
        errorCheckIteration = i
        let prePreviousElement = array[i-2]
        let previousElement = array[i-1]
        let currentElement = array[i]
        let nextElement = array[i+1]
        let nextNextElement = array[i+2]
        let index = i
        if (typeof currentElement == "object") {
            doubleOperators(
                prePreviousElement, 
                previousElement, 
                currentElement, 
                nextElement, 
                nextNextElement,
                index,
                array
            )
        }
        // if any adjustments in index number need be made,
        // they can be changed in the error checks, and implemented here
        i = errorCheckIteration
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