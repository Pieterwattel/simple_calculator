//#region   > Variable Declarations
//#region       >> Global Variables

let operator = ""
let ans = "0"

let userInput = ""
let updateString = false
let stringRemovedAmount

let currentElement = ""
let inputArray = []

let currentNum = ""

let isError = false
let errorCheckIteration = 0

let bracketOpenIndexArray = []

let caretPosition = 0

//#endregion
//#region       >> Node declaration / generation
//#region           >>> Containers
const contentBase = document.getElementById(`contentBase`)
const calculatorFrame = document.getElementById(`calculatorFrame`)

const displayFrame = document.getElementById(`displayFrame`)
const previousCalculation = document.getElementById(`previousCalculation`)
const displayTop = document.getElementById(`displayTop`)
const backMissingCharacters = document.getElementById(`backMissingCharacters`)

const displayBottom = document.getElementById(`displayBottom`)

const btnsFrameMain = document.getElementById(`btnsFrameMain`)
const staticBtnFrame = document.getElementById(`staticBtnFrame`)
const btnFrameFunc = document.getElementById(`btnFrameFunc`)
const btnFrameNum = document.getElementById(`btnFrameNum`)

const btnFrameOperator = document.getElementById(`btnFrameOperator`)


//#endregion	
//#region           >>> Numbers
const numBtns = {}
for (let i = 9; i >= 0; i--) {
    numBtns[i] = document.getElementById(`btn${i}`);
}
//#endregion
//#region           >>> Calculation Symbols

let symbolObject = [
    {
        //0
        id: 'Addition',
        sign: ['+', '➕', '˖'],
        precedence: 6,
        category: "operator"
    },
    {
        //1
        id: 'Subtraction',
        sign: ['-', '−', '˗', '-', '−', '➖', '﹣', '－'],
        precedence: 6,
        category: "operator"
    },
    {
        //2
        id: 'Multiplication',
        sign: ['*', '×', '⋅', '∗'],
        precedence: 5,
        category: "operator"
    },
    {
        //3
        id: 'Division',
        sign: ['/', '÷', '➗'],
        precedence: 5,
        category: 'operator'
    },
    {
        //4
        id: 'Bracket open',
        sign: ['(', '﹙', '（'],
        precedence: 2,
        category: 'bracket',
        multiplyWhenNumInFront: 'true',
    },
    {
        //5
        id: 'Bracket close',
        sign: [')', '﹚', '）'],
        precedence: 2,
        category: 'bracket',
        multiplyWhenNumBehind: 'true',
    },
    {
        //6
        id: 'Pi',
        sign: ['π', 'Π', 'Π', 'Π', 'π', 'π', 'π', 'ϖ', 'ϖ', 'ϖ'],
        precedence: 1,
        category: 'number',
        multiplyWhenNumInFront: 'true',
        multiplyWhenNumBehind: 'true',
    },
    {
        //7
        id: '2nd power',
        sign: ['²'],
        precedence: 4,
        category: 'operator'
    },
    {
        //8
        id: 'Exponentiation',
        sign: ['^', '**'],
        precedence: 4,
        category: 'operator'
    },
    {
        //9
        id: 'Factorial',
        sign: ['!'],
        precedence: 3,
        category: 'operator',
        multiplyWhenNumBehind: 'true',
        btnTxt: "x!",
    },
    {
        //10
        id: 'Modulus divide',
        sign: ['%', 'mod'],
        precedence: 5,
        category: 'operator'
    },
    {
        //11
        id: 'Square root',
        sign: ['√',],
        precedence: 4,
        category: 'operator',
        btnTxt: "x√",
        multiplyWhenNumInFront: 'true',
    },
    {
        //12
        id: 'Sine',
        sign: ['sin'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "sin",
        multiplyWhenNumInFront: 'true',
    },
    {
        //13
        id: 'CoSine',
        sign: ['cos'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "cos",
        multiplyWhenNumInFront: 'true',
    },
    {
        //14
        id: 'Tangent',
        sign: ['tan'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "tan",
        multiplyWhenNumInFront: 'true',
    },
    {
        //15
        id: 'Inverse Sine',
        sign: ['asin'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "aSin",
        multiplyWhenNumInFront: 'true',
    },
    {
        //16
        id: 'Inverse CoSine',
        sign: ['acos'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "aCos",
        multiplyWhenNumInFront: 'true',
    },
    {
        //17
        id: 'Inverse Tangent',
        sign: ['atan'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "aTan",
        multiplyWhenNumInFront: 'true',
    },
    {
        //18
        sign: ['ans'],
        precedence: 1,
        category: 'number',
        multiplyWhenNumInFront: 'true',
        multiplyWhenNumBehind: 'true',
    },

]

symbolObject.forEach((prop) => {
    let btn = document.createElement("button")
    btnFrameOperator.appendChild(btn)
    btn.setAttribute("id", prop.id)
    btn.setAttribute("title", prop.id)
    btn.classList.add("btn")
    if (typeof prop.btnTxt == "undefined") {
        btn.textContent = prop.sign[0]
    } else {
        btn.textContent = prop.btnTxt
    }
    btn.addEventListener("click", () => operatorPress(Event, prop.sign[0]))
})


// empty symbol, for later additions
/*
    {
//
    id: '' ,
    sign: [''],   
    precedence:  ,
    category: '',
    } ,

//to add an operator:
- add the operator to the operatorObject + different ways that it can be written
- write a way to check for this operator in the checkSymbol() : put it before any other signs that are smaller and might actually get confused with this sign.
- make a way to write this in makeSymbolString
- add the calculation in the doCalculation function
- think about possible errors, and add these in checkForErrors()
*/


//#endregion
//#region           >>> Function Buttons

let otherBtns = [
    {
        id: 'Equals',
        sign: '=',
        function: ()=>runEquals(),
    },
    {
        id: 'Previous answer',
        sign: 'ans',
        function: ()=>runAns(),
    },
    {
        id: 'Clear all fields',
        sign: 'C',
        function: ()=>clearDisplay(),
    },
    {
        id: 'Clear entry',
        sign: 'CE',
        function: ()=>clearEntry(),
    },
    {
        id: 'BackSpace',
        sign: '⌫',
        function: ()=>doBackspace(),
    },
    {
        id: 'Delete',
        sign: 'Del',
        function: ()=>doDelete(),
    },
]

otherBtns.forEach((prop) => {
    let btn = document.createElement("button")
    btnFrameFunc.appendChild(btn)
    btn.setAttribute("id", prop.id)
    btn.classList.add("btn")
    btn.textContent = prop.sign
    btn.setAttribute("title", prop.id)
})


//#endregion
//#endregion
//#region   > Functions 
//#region       >> Utility Functions

function logId(e) {
    console.log(`hi! is seems that the ${e.target.id} item was clicked`)
}

function getId(e) {
    return e.target.id
}

function logNum(e) {
    console.log(`hi! is seems that the ${e.target.id.replace('btn', "")} item was clicked`)
}


function makeNumber(value) {
    return parseFloat(value)
}

function returnSimplifiedString(array){
    let string = ""
    array.forEach(element => {
        if (Number(parseFloat(element))){
            string += element
        } else if (typeof element == "object"){
            string += element.sign[0]
        }
    });
    return string
}

function returnSimplifiedArray(array) {
    let result = []
    array.forEach(element => {
        if (typeof element == "object") {
            result.push(element.sign[0])
        } else {
            result.push(element)
        }
    });
    return result
}

function getFunction(e) {
    switch (e.target.textContent) {
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

        case "⌫":
            doBackspace()
            break;

        case "Del":
            doDelete()
            break;

        default:
            alert("Unknown function button pressed")
    }
}

function runEquals() {
    if (displayTop.value != "") {
        isError = false
        inputArray = []
        previousElementForMultiplication = ""
        array = getArrayFromString(displayTop.value)
        previousCalculation.textContent = returnSimplifiedString(array)
        // if there are no errors, run the rest of the function
        if (!checkForErrors(array)) {
            result = calculate(array)
            ans = ""
            ans = result.flat()
            displayAns()
            inputArray = []
            currentElement = ""
        }
    }
}

function runAns() {
    newInput = userInput.slice(0, caretPosition) + "ANS" + userInput.slice(caretPosition)
    userInput = newInput
    updateDisplay();
    returnCaret("ANS")
}

function clearDisplay() {
    console.log("clearDisplay")
    userInput = ""
    ans = ""
    updateDisplay()
}

function clearEntry() {
    userInput = ""
    updateDisplay()
}

function doBackspace() {
    userInput = userInput.slice(0, caretPosition - 1) + userInput.slice(caretPosition)
    updateDisplay()
    displayTop.setSelectionRange(caretPosition - 1, caretPosition - 1)
}

function doDelete() {
    userInput = userInput.slice(0, caretPosition) + userInput.slice(caretPosition + 1)
    updateDisplay()
    returnCaret("")
}

function displayEntry() {
    displayTop.value = userInput
}

function displayAns() {
    displayBottom.textContent = ans
}

function isNumber(value){
    if (!isNaN(value) || value === "." ){
        return true
    } else {
        return false
    }
}

function isNumberOrMinus(value){
    if (!isNaN(value) || 
    value === "." ||
    symbolObject[1].sign.includes(value) ){
        return true
    } else {
        return false
    }
}

function isNumberIncludesAll(value){
    if (!isNaN(value) || 
    value === "." ||
    symbolObject[1].sign.includes(value)||
    value.category == "number" ){
        return true
    } else {
        return false
    }
}

function evaluateStringSymbols(string) {

    // 3 values that can be given, to evaluate the context of a symbol
    let previousValue = ""
    let value = ""
    let nextValue = ""

    let twoSymbolValue
    let threeSymbolValue
    let fourSymbolValue
    let fiveSymbolValue
    let sixSymbolValue

    let i = string.length
    let j = 0
    while (j < i) {
        if (updateString) {
            string = userInput
            console.log(`updateString ${string}`)
            i = string.length
            updateString = false
        }

        previousValue = string.charAt(j - 1)
        value = string.charAt(j)
        nextValue = string.charAt(j + 1)

//        console.log(`${value} index=${j} evalStrSymbols()`)

        twoSymbolValue = string.slice(j, j + 2)
        threeSymbolValue = string.slice(j, j + 3)
        fourSymbolValue = string.slice(j, j + 4)
        fiveSymbolValue = string.slice(j, j + 5)
        sixSymbolValue = string.slice(j, j + 6)

        makeInputArray(previousValue, value, nextValue, string, j,
            twoSymbolValue,
            threeSymbolValue,
            fourSymbolValue,
            fiveSymbolValue,
            sixSymbolValue,
        )
        j++
    }

    /*
    // small script to also add the very last value to inputArray[]

    if (numberOrObject(previousValue, value, nextValue, string, j) == "number") {
        inputArray.push(currentElement)
    } else if (numberOrObject(previousValue, value, nextValue, string, j) == "operator") {
        inputArray.push(string.charAt(j - 1))

    }

    */
    return inputArray
}

function numberOrObject(previousValue, value, nextValue, string, index,
    twoSymbolValue,
    threeSymbolValue,
    fourSymbolValue,
    fiveSymbolValue,
    sixSymbolValue,
) {
    console.log(`numOrObject ${string}`)

    if (isNumber(value)){
        return value
    } else {
        return checkSymbol(previousValue, value, nextValue, string, index,
            twoSymbolValue,
            threeSymbolValue,
            fourSymbolValue,
            fiveSymbolValue,
            sixSymbolValue,
        )
    }

    /*
    let returnValue = ""
    // check if value is number, returns string "number"
    if (Number(parseFloat(value)) || value == "." || value == "0") {
        //        console.log(`value "${value}" is a number`)
        returnValue = "number"
    }

    let allowForEach = true

    // check if value is operator, returns array [operator,  arrayIndex()
    symbolObject.forEach(element => {
        if (allowForEach) {
            if (element.sign.includes(value) ||
                element.sign.includes(twoSymbolValue) ||
                element.sign.includes(threeSymbolValue) ||
                element.sign.includes(fourSymbolValue) ||
                element.sign.includes(fiveSymbolValue) ||
                element.sign.includes(sixSymbolValue)) {
                returnValue = checkSymbol(previousValue, value, nextValue, string, index,
                    twoSymbolValue,
                    threeSymbolValue,
                    fourSymbolValue,
                    fiveSymbolValue,
                    sixSymbolValue,
                )
                allowForEach = false
            }
        }
    })

    //value was not a number nor known operator
    if (returnValue == "error") {
        console.log("numberOrOperator error")
        alert("ERROR: unknown symbol")
        isError = true
        returnValue = "error"
    }
    return returnValue
    */
}

function makeInputArray(previousValue, value, nextValue, string, index,
    twoSymbolValue,
    threeSymbolValue,
    fourSymbolValue,
    fiveSymbolValue,
    sixSymbolValue,
) {
    result = numberOrObject(previousValue, value, nextValue, string, index,
        twoSymbolValue,
        threeSymbolValue,
        fourSymbolValue,
        fiveSymbolValue,
        sixSymbolValue,
    )
    console.log(`makeInputArray ${string}`)

    let lastElement = inputArray[inputArray.length-1]
    if (isNumberOrMinus(result)){
//then I need to check if the last array item is an object or "", 
//and in that case, make a new element for the number.    
        if (typeof lastElement === "object" ||
            typeof lastElement === "undefined"){
            inputArray.push(result)
        } else if (isNumber(lastElement) || lastElement == "-"){
            inputArray[inputArray.length-1] += result
        }
    } else if (typeof result == "object") {
        inputArray.push(result)
    } else {
        alert("value falls outside makeInputArray options")
    }
    addMultiplication ()

    
/*

    addMultiplication(result, currentElement)
    // check if the value if it is a number.
    if (result == "number") {
        currentElement += value
    } else if (typeof result == "object") {
        // then check if it is an operator, using the previous and next value to evaluate that
        if (currentElement != "") {
            inputArray.push(currentElement)
            if (addMultiplyOp){
                inputArray.push(symbolObject[2])
                addMultiplyOp =  false
            }
        }
        inputArray.push(result)
        currentElement = ""
    } else if (result == "skip") {

    } else if (result == "error" || typeof result == "undefined" || result == "") {
        alert(`${value} ... is invalid. It might not be possible to use this symbol yet..
             I am vewwy sowwy (◞‸ ◟)💧`)
        isError = true

    } else {
        console.log(`value :${value} falls outside makeInputArray() if statement options`)

    }
    if (addMultiplyOp){
        inputArray.push(symbolObject[2])
    }
    addMultiplyOp = false
*/
}

function addToInputArray(item, index){
    inputArray.push(item)
}

function addMultiplication (){
// pops off the last element, to put back at the end. 
//if multiplication is added, then this can thus be added in between the last and before last element


    frontNum = inputArray[inputArray.length-2]
    backNum =  inputArray.pop()

    //first check if either values are empty, then there is nothing multiply of course.
    if (typeof frontNum == "undefined"||
        typeof backNum == "undefined"||
        frontNum == ""||
        backNum == ""){
            inputArray.push(backNum)
        return
    }

    if (backNum.multiplyWhenNumInFront && isNumberIncludesAll(frontNum)) {
        inputArray.push(symbolObject[2])
    } else if (isNumberIncludesAll(backNum) && frontNum.multiplyWhenNumBehind) {
        inputArray.push(symbolObject[2])
    }

    if (frontNum == symbolObject[5] && backNum == symbolObject[4]) {
        inputArray.push(symbolObject[2])
    }

    inputArray.push(backNum)
}

function deleteValuesFromString(index, amount) {
    userInput = userInput.slice(0, index) + userInput.slice(index + amount)
    updateString = true
    stringRemovedAmount = amount
}

function checkSymbol(previousValue, value, nextValue, string, index,
    twoSymbolValue,
    threeSymbolValue,
    fourSymbolValue,
    fiveSymbolValue,
    sixSymbolValue,
) {
    console.log(`checksymbol ${string}`)
    console.log(value)

    console.log(inputArray)

    previousElement = inputArray[inputArray.length-1]

    // the checks are order by length of the symbols, so:
    //cos() is checked before (), because otherwise it might label the symbol wrongly

    switch (true) {

        //-- 4 VALUE LENGTH SYMBOLS --
        case (symbolObject[15].sign.includes(fourSymbolValue)):
            //          inverse sine
            deleteValuesFromString(index + 1, 3)
            return symbolObject[15]
            break;

        case (symbolObject[16].sign.includes(fourSymbolValue)):
            //          inverse coSine
            deleteValuesFromString(index + 1, 3)
            return symbolObject[16]
            break;

        case (symbolObject[17].sign.includes(fourSymbolValue)):
            //          inverse tangent
            deleteValuesFromString(index + 1, 3)
            return symbolObject[17]
            break;

        //-- 3 VALUE LENGTH SYMBOLS --
        case (symbolObject[10].sign.includes(threeSymbolValue)):
            //          remainder (modulo)
            deleteValuesFromString(index + 1, 2)
            return symbolObject[10]
            break;

        case (symbolObject[12].sign.includes(threeSymbolValue)):
            //          sine
            console.log("sine")
            deleteValuesFromString(index + 1, 2)
            return symbolObject[12]
            break;

        case (symbolObject[13].sign.includes(threeSymbolValue)):
            //          cosine
            deleteValuesFromString(index + 1, 2)
            return symbolObject[13]
            break;

        case (symbolObject[14].sign.includes(threeSymbolValue)):
            //          tangent
            deleteValuesFromString(index + 1, 2)
            return symbolObject[14]
            break;

        case (symbolObject[18].sign.includes(threeSymbolValue)):
            //          ANS
            deleteValuesFromString(index + 1, 2)
            return symbolObject[18]
            break;

        //-- 2 VALUE LENGTH SYMBOLS --
        case (symbolObject[8].sign.includes(twoSymbolValue)):
            //          any exponent
            deleteValuesFromString(index + 1, 1)
            return symbolObject[8]
            break;


        //-- 1 VALUE-LENGTH SYMBOLS --
        case (symbolObject[0].sign.includes(value)):
            //          addition
            return symbolObject[0]
            break;

        case (symbolObject[1].sign.includes(value)):
            //          subtraction
            // if this the first value expect that it is the start of a negative number
            if (previousValue === "") {
                return value
            } else if (typeof previousElement == "object"&&
                previousElement.category != "number"
            ){
            // if the previous value was an operator, also expect that this is a negative number
                return value
            } else if (symbolObject[1].sign.includes(nextValue)) {
            //if the next value is also a minus, see this as an operator
                return symbolObject[1]
            } else {
                // if all of those are not the case, assume this is meant as an operator.
                // see it as a number, and place a "+" operator in front of it
                addToInputArray(symbolObject[0], index)
                return value
            }
            

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
            //          Pi
            return symbolObject[6]
            break;

        case (symbolObject[7].sign.includes(value)):
            //          to the 2nd power
            return symbolObject[7]
            break;

        case (symbolObject[8].sign.includes(value)):
            //          any exponent
            return symbolObject[8]
            break;

        case (symbolObject[9].sign.includes(value)):
            //          factorial
            return symbolObject[9]
            break;

        case (symbolObject[10].sign.includes(value)):
            //          remainder (modulo)
            return symbolObject[10]
            break;

        case (symbolObject[11].sign.includes(value)):
            //          square root
            return symbolObject[11]
            break;

        case (symbolObject[13].sign.includes(value)):
            //          ..
            return symbolObject[13]
            break;

        case (symbolObject[14].sign.includes(value)):
            //          ..
            return symbolObject[14]
            break;

        case (symbolObject[15].sign.includes(value)):
            //          ..
            return symbolObject[15]
            break;

        case (symbolObject[16].sign.includes(value)):
            //          ..
            return symbolObject[16]
            break;

        case (symbolObject[17].sign.includes(value)):
            //          ..
            return symbolObject[17]
            break;

        case (symbolObject[19].sign.includes(value)):
            //          ..
            return symbolObject[19]
            break;

        case (symbolObject[20].sign.includes(value)):
            //          ..
            return symbolObject[20]
            break;

        default:
            isError = true
            alert("ERROR: unknown symbol")
            return "error"
    }
}

function calculateInOrder(array, i) {
    let operationFound = false
    // find an element with following arguments: the element and the index
    array.some((element, index) => {
        // if the element is an object and precedence is (i) do:
        if (typeof element == "object" && element.precedence == i) {
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
        return calculateInOrder(array, i)
        //if no operation was found, that means the we have no symbols at this precedence, 
        //thus we can move up one precedence value
    } else if (i < 8) {
        i++
        return calculateInOrder(array, i)
    } else if (i >= 8) {
        return array
    } else {
        console.log("calculateInOrder ERROR")
        return array
    }
}


function doCalculation(symbol, index, array) {
    let num
    let acc
    let result = ""
    let previousValue = array[index - 1]
    let nextValue = array[index + 1]


    switch (true) {
        case (symbol == symbolObject[0]):
            //          addition
            result = +previousValue + +nextValue

            array.splice(index - 1, 3, result)
            return array

            break;

        case (symbol == symbolObject[1]):
            //          subtraction
            result = +previousValue - +nextValue

            array.splice(index - 1, 3, result)
            return array

            break;

        case (symbol == symbolObject[2]):
            //          multiplication
            result = +previousValue * +nextValue

            array.splice(index - 1, 3, result)
            return array

            break;

        case (symbol == symbolObject[3]):
            //          division
            result = +previousValue / +nextValue

            array.splice(index - 1, 3, result)
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
            let bracketedLength = (bracketCloseIndex - bracketOpenIndex) + 1
            let bracketedContent = array.splice(bracketOpenIndex, bracketedLength)

            //removing the brackets from the content that they contain 
            bracketedContent.pop()
            bracketedContent.shift()

            result = calculate(bracketedContent)
            //place the result in the original array, in place of the brackets            
            array.splice(bracketOpenIndex, 0, result)

            return array
            break;

        case (symbol == symbolObject[6]):
            //          Pi
            result = Math.PI

            array.splice(index , 1, result)
            return array
            break;

        case (symbol == symbolObject[7]):
            //          to the 2nd power
            result = +previousValue * +previousValue

            array.splice(index - 1, 2, result)
            return array
            break;

        case (symbol == symbolObject[8]):
            //          any exponent
            result = (+previousValue) ** (+nextValue)

            array.splice(index - 1, 3, result)
            return array
            break;

        case (symbol == symbolObject[9]):
            //          factorial
            num = previousValue
            if (num == 0 || num == 1) {
                return 1
            }

            let acc = 1
            let i = 1
            while (i - 1 < num) {
                acc = acc * i
                i++
            }
            result = acc
            console.log(previousValue)
            console.log(result)
            array.splice(index - 1, 2, result)
            return array
            break;

        case (symbol == symbolObject[10]):
            //          remainder
            result = +previousValue % +nextValue
            array.splice(index - 1, 3, result)
            return array
            break;

        case (symbol == symbolObject[11]):
            //          square root
                result = Math.sqrt(nextValue)
                array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[12]):
            //          sinus
            result = Math.sin(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[13]):
            //          coSine
            result = Math.cos(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[14]):
            //          tangent
            result = Math.tan(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[15]):
            //          inverse sine
            result = Math.asin(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[16]):
            //          inverse coSine
            result = Math.acos(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[17]):
            //          inverse tangent
            result = Math.atan(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[18]):
            //          ans
            result = ans

            array.splice(index , 1, result)
            return array
            break;

        case (symbol == symbolObject[19]):
            //          ...
            result = +previousValue + +previousValue
            array.splice(index - 1, 3, result)
            return array
            break;

        default:
            console.log(`doCalculation symbol "${symbol.sign}" unknown, thus was removed. ERROR`)
            array.splice(index, 1)
            return array
    }
}

function doubleOperators(
    prePreviousElement,
    previousElement,
    currentElement,
    nextElement,
    nextNextElement,
    index,
    array) {
    switch (true) {
        case (symbolObject[0].sign === currentElement.sign):
            //          addition

            if (previousElement.category == "operator") {
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
            return array
    }

}

function returnCaret(value) {
    setTimeout(()=>{
        displayTop.setSelectionRange(caretPosition + value.length, caretPosition + value.length)
    }, 10)
}

function checkBracketsBalance(string) {
    let closedBracketAmount = 0
    let openBracketAmount = 0
    let BracketBalance

    open = string.match(/\(/g)
    if (open != null) {
        openBracketAmount = open.length
    }

    close = string.match(/\)/g)
    if (close != null) {
        closedBracketAmount = close.length
    }
    BracketBalance = (openBracketAmount - closedBracketAmount)

    return BracketBalance
}

function unEqualBracketAmount(string) {
    if (checkBracketsBalance(string) != 0) {
        isError = true
        alert("ERROR: unequal bracket balance")
    }
}


//#endregion
//#region       >> Controller Functions
function operatorPress(e, newSymbol) {
    userInput = displayTop.value
    newInput = userInput.slice(0, caretPosition) + newSymbol + userInput.slice(caretPosition)
    userInput = newInput
    updateDisplay();
    returnCaret(newSymbol)
}

function numberPress(e) {
    let newNum = e.target.id.replace('btn', "")
    newInput = userInput.slice(0, caretPosition) + newNum + userInput.slice(caretPosition)
    userInput = newInput
    updateDisplay();
    returnCaret(newNum)
}

function functionPress(e) {
    getFunction(e)
}


function updateDisplay() {
    //    updateNum()
    //    addSpaces()
    displayEntry()
    displayAns()
}


function getArrayFromString(string) {
    let result
    result = string.toLowerCase()
    result = result.replace(/\s/g,'').toLowerCase()
    result = result.replace(/−/g, "-")
    userInput = result
    stringErrorCheck(result)
    return evaluateStringSymbols(result)
}

function stringErrorCheck(string) {
    unEqualBracketAmount(string)
}

function calculate(array) {
    return calculateInOrder(array, 1)
}


function checkForErrors(array) {
    /* 
    if there is an error found that will not be solved, isError will be true
    this will stop the rest of calculation
    */

    if (isError) {
        return true
    }

    let j = array.length - 1
    for (let i = 0; i <= j; i++) {
        errorCheckIteration = i
        let prePreviousElement = array[i - 2]
        let previousElement = array[i - 1]
        let currentElement = array[i]
        let nextElement = array[i + 1]
        let nextNextElement = array[i + 2]
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

        let num

        if (typeof nextElement == "object") {
            num = nextNextElement
        } else {
            num = nextElement
        }

        if (currentElement == symbolObject[15]) {
            if (num < -1 ||
                num > 1) {
                isError = true
                alert("invalid input for aSine, number must be between -1 and 1")
            }
        } else if (currentElement == symbolObject[16]) {
            if (num < -1 ||
                num > 1) {
                isError = true
                alert("invalid input for aCos, number must be between -1 and 1")
            }
        }

        if (currentElement == ""){
            array.splice(index, 1)
        }

        // if any adjustments in index number need be made,
        // they can be changed in the error checks, and implemented here
        i = errorCheckIteration
    }

    return isError
}

function runEveryEdit(e) {
    userInput = displayTop.value
    balance = checkBracketsBalance(userInput)
    if (userInput.length <= 3){
        addAnsWhenOperatorFirst(userInput)
    }
    giveMissingBrackets(balance)
}

function addAnsWhenOperatorFirst(string){
    let endLoop = false
    let i
    let char = ""
    loop1: for (i = 0; i <= 3 ; i++ ){
        char += string.charAt(i)

        symbolObject.forEach(element => {
            if (element.category == "operator" &&
                element.sign.includes(char) &&
                element.id != "Square root"
            ){
                let oldInput = displayTop.value
                displayTop.value = ""
                displayTop.value = "ANS"
                displayTop.value += oldInput
                endLoop = true
            }
        });
        if (endLoop){
            break loop1
        }

    }

    /*


    char += string.charAt(1)
    char += string.charAt(2)
    */
}

function giveMissingBrackets(balance) {

    let missingCloseBrackets = ""
    if (balance >= 0) {
        for (i = balance - 1; i >= 0; i--) {
            missingCloseBrackets += ")"
        }
    }
    backMissingCharacters.textContent = missingCloseBrackets
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

window.addEventListener("mousedown", (e) => {

    if (e.target.id == "displayBottom"||
        e.target.parentNode.id == "displayFrame") {
    } else {
        setTimeout(()=>{
            displayTop.focus()
        }, 50)

    }
})

window.addEventListener("load", () => {
    displayTop.focus()
})


//----------LISTEN TO ANY INPUT CHANGE-----------
document.addEventListener("keyup", (e => {
    if (e.key == "Enter") {

        e.preventDefault()
        runEquals()
    }
    runEveryEdit(e)
}))

btnsFrameMain.addEventListener('click', (e => {
    runEveryEdit()
}))
//-----------------------------------------------
/*
displayTop.addEventListener("click", (e=>{
    caretPosition = e.target.selectionStart
    console.log(caretPosition)
}))*/

//save the last caretposition when the input goed out of focus
displayTop.addEventListener("blur", (e => {
    caretPosition = e.target.selectionStart
}))

//#endregion
//#endregion

userInput = "5 * 10 + SIN(π) * 100"
updateDisplay()


