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
    sign: ['+'] ,  
    precedence: 5 , 
    category: "operator"
    },
    {
    id: 'btnSubtract' ,
    sign: ['-','−'],   
    precedence: 5 , 
    category : "operator"
    } ,
    {
    id: 'btnMultiply' ,
    sign: ['*','×'],   
    precedence: 4 , 
    category: "operator"
    } ,
    {
    id: 'btnDivide' ,
    sign: ['/'],   
    precedence: 4 ,
    category: 'operator'
    } ,
    {
    id: 'bracketOpen' ,
    sign: ['('],   
    precedence:  2,
    category: 'bracket'
    } ,
    {
    id: 'bracketClose' ,
    sign: [')'],   
    precedence:  2,
    category: 'bracket'
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
    id: '' ,
    sign: '',   
    precedence:  ,
    category: ''
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

let operator = ""
let ans = ""

let userInput = "(5+3)×(12−4)/2−7"
updateDisplay()

let currentElement = ""
let inputArray = []

let currentNum = ""

let isError = false
let errorCheckIteration = 0

let bracketOpenIndexArray = []

let caretPosition = 0

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

function alertSimplifiedArray(array){
    let result = []
    array.forEach(element => {
        if (typeof element == "object"){
            result.push(element.sign[0])
        } else {
            result.push(element)
        }
    });
    alert ("simplified array is: " + result)
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
    isError=false
    inputArray.length = 0
    array = makeStringArray(displayTop.value)

    // if there are no errors, run the rest of the function
    if (!checkForErrors(array)){
        result = calculate(array)
        ans = result.flat()
        displayAns()
        inputArray = []
        currentElement = ""
        clearEntry()
    }
}

function clearAllValues(){
    ans = ""
}

function runAns (){
    displayTop.value += ans
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

function makeSymbolString (symbol){
    switch (symbol){
        case (symbolObject[0].sign[0]):
//          addition
            return " " + symbol + " "
            break;

        case (symbolObject[1].sign[0]):
//          subtraction
            return " " + symbol + " "
            break;

        case (symbolObject[2].sign[0]):
//          multiplication
            return " " + symbol + " "
            break;

        case (symbolObject[3].sign[0]):
//          division
            return " " + symbol + " "
            break;

        case (symbolObject[4].sign[0]):
//          bracketOpen
            return symbol
            break;

        case (symbolObject[5].sign[0]):
//          bracketClose
            return symbol
            break;

        default:
            console.log("operator: " + symbol + ", not added yet in operatorString()")
            return symbol
    }
    clearEntry()
}

function displayEntry(){
    displayTop.value = userInput
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
    if (numberOrSymbol(previousValue, value, nextValue) == "number" ){
        inputArray.push(currentElement)
    } else if (numberOrSymbol(previousValue, value, nextValue) == "operator" ){
        inputArray.push(string.charAt(j-1))

    }
    return inputArray
}

function numberOrSymbol (previousValue, value,  nextValue) {
    let returnValue = ""

    // check if value is number, returns string "number"
    if (Number(parseFloat(value)) || value == "." || value == "0"){
//        console.log(`value "${value}" is a number`)
       returnValue = "number"
    }

    // check if value is operator, returns array [operator,  arrayIndex()
    symbolObject.forEach(element => {
        if (element.sign.includes(value)){
            returnValue = checkOperator(previousValue, value, nextValue)
        }
    })

    //value was not a number nor known operator
    if  (returnValue == "error"){
        console.log("numberOrOperator error")
        alert ("ERROR: unknown symbol")
        isError = true
        returnValue = "error"
    }

    return returnValue
}

function makeInputArray(previousValue, value, nextValue){
    result = numberOrSymbol(previousValue, value, nextValue)
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
    } else if (result == "skip"){
        
    } else if (result == "error"||typeof result == "undefined"|| result == ""){
        alert (`${value} ... is invalid. It might not be possible to use this operator yet..
             I am vewwy sowwy (◞‸ ◟)💧`)
            isError = true

    } else {
        console.log(`value :${value} falls outside makeInputArray() if statement options`)

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
// if this the first value, expect that it is the start of a negative number
        if (previousValue === ""){
            return "number"
        }
// if the previous value was an operator, also expect that this is a negative number
        symbolObject.forEach(element => {
            if (element.sign.includes(previousValue))
                return "number"
        });

        if (nextValue == "-"){
            return symbolObject[1]
        }

// if all of those are not the case, see it as a number, and place a "+" operator in front of it
        inputArray.push(currentElement)
        inputArray.push(symbolObject[0])
        currentElement = ""
        return "number"

        case (symbolObject[2].sign.includes(value)):
//          multiplication
            return symbolObject[2]
            break;

        case (symbolObject[3].sign.includes(value)):
//          division
            return symbolObject[3]
            break;

        case (symbolObject[4].sign.includes(value)):
//          bracketOpen
            return symbolObject[4]
            break;

        case (symbolObject[5].sign.includes(value)):
//          bracketOpen
            return symbolObject[5]
            break;     
               
        case (symbolObject[6].sign.includes(value)):
//          ..
            return symbolObject[6]
            break;               

        case (symbolObject[7].sign.includes(value)):
//          ..
            return symbolObject[7]
            break;            

        case (symbolObject[8].sign.includes(value)):
        //          ..
            return symbolObject[8]
            break;            

        case (symbolObject[9].sign.includes(value)):
//          ..
            return symbolObject[9]
            break;

        default:
            isError = true
            alert("ERROR: unknown symbol")
            return "error"
    }
}

function calculateInOrder(array, i){
let operationFound = false
// find an element with following arguments: the element and the index
    array.some((element, index) => {
// if the element is an object and precedence is (i) do:
        if (typeof element == "object" && element.precedence == i){
//do a calculation, (find the operator that the object is, and
//use the values around of the array to get the answer, and splice the unneeded values.
            array = doCalculation(element, index, array)
// end the function when the calculation was done
            operationFound = true
        } 
// if no operators of this precedence were found, operationfound stays false
    })

//if a symbol was found, the array changed. so the function needs to be 
//run again with the modified array.
    if (operationFound) {
        return calculateInOrder(array,i)
//if no operation was found, that means the we have no symbols at this precedence, 
//thus we can move up one precedence value
    } else if(i < 8){
        i++
        return calculateInOrder (array, i)
    } else if (i >= 8){
        return array
    } else {
        console.log("calculateInOrder ERROR")
        return array
    }
}


function doCalculation (symbol, index, array){
    let result = ""
    let previousValue = array[index-1]
    let nextValue = array[index+1]



    switch (true){
        case (symbol == symbolObject[0]):
//          addition
                result = +previousValue + +nextValue
               
                array.splice(index-1, 3, result)
                return array

            break;

        case (symbol == symbolObject[1]):
//          subtraction
                result = +previousValue - +nextValue
                            
                array.splice(index-1, 3, result)
                return array

            break;

        case (symbol == symbolObject[2]):
//          multiplication
                result = +previousValue * +nextValue

                array.splice(index-1, 3, result)   
                return array

            break;

        case (symbol == symbolObject[3]):
//          division
                result = +previousValue / +nextValue

                array.splice(index-1, 3, result)   
                return array

            break;

        case (symbol == symbolObject[4]):
//          bracketOpen
//          saves the indexes of open brackets, to be re-used when a close bracket has been found
            bracketOpenIndexArray.push(index)
            return array
            break;

        case (symbol == symbolObject[5]):
//          bracketClose
            let bracketOpenIndex = bracketOpenIndexArray.pop()
            let bracketCloseIndex = index
            let bracketedLength = (bracketCloseIndex - bracketOpenIndex)  + 1
            let bracketedContent = array.splice(bracketOpenIndex, bracketedLength)

//removing the brackets from the content that they contain 
            bracketedContent.pop() 
            bracketedContent.shift()
            
            result = calculate(bracketedContent)
//place the result in the original array, in place of the brackets            
            array.splice(bracketOpenIndex, 0 , result)

            return array
            break;
                                                

        default:
            console.log(`doCalculation symbol "${symbol.sign}" unknown, thus was removed. ERROR`)
            array.splice(index, 1)
            return array
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
            return array
            break;

        case (symbolObject[1].sign == currentElement.sign):
//          subtraction
            return array
            break;

        case (symbolObject[2].sign == currentElement.sign):
//          multiplication
            return array
            break;

        case (symbolObject[3].sign == currentElement.sign):
//          division
            return array
            break;

        default:
            alert ("doubleOperators() error")
            return array
    }
            
}

//#endregion
//#region       >> Controller Functions
function operatorPress (e) {
//    switchCurrentNum();
    userInput = displayTop.value
    userInput += e.target.textContent
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


function makeStringArray(string){
    let result
    result = string.replace(/ /g,"")
    result = string.replace(/−/g,"-")
    return evaluateStringSymbols(result)
}

function calculate(array){
    return calculateInOrder(array, 1)
}


function checkForErrors (array) {
/* 
if there is an error found that will not be solved, isError will be true
this will stop the rest of calculation
*/ 

    if (isError){
        alert ("unknown error found")
        return true
    }

    let j = array.length -1
    for (let i = 0 ; i <= j ; i++){
        errorCheckIteration = i
        let prePreviousElement = array[i-2]
        let previousElement = array[i-1]
        let currentElement = array[i]
        let nextElement = array[i+1]
        let nextNextElement = array[i+2]
        let index = i

        if (currentElement.category == "operator") {
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

    isError = unEqualBracketAmount(array)
    
    return isError
}

function unEqualBracketAmount(array){
    let openBracketAmount = (() =>{
        return array.filter(x => x.id=="bracketOpen").length
    })(array)
    let closedBracketAmount = ((array) =>{
        return array.filter(x => x.id=="bracketClose").length
    })(array)
    if (openBracketAmount != closedBracketAmount){
        alert ("ERROR: unequal amount of brackets!")
        return true
    }
}

function updateCaretPosition (){
    let selection = window.getSelection()
    let range = selection.getRangeAt(0);
    caretPosition = range.startOffset
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

displayTop.addEventListener('input', function(){
    userInput = displayTop.value
})

window.addEventListener("focus", ()=>{
    displayTop.focus()
})
document.addEventListener("keydown", (e=>{
    if (e.key == "Enter"){

        e.preventDefault()
        runEquals()
    }
    updateCaretPosition()
}))

displayTop.addEventListener("blur", (e=>{

}))

//#endregion
//#endregion