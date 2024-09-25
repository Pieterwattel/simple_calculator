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
//#region       >> Node Declarations	
//#region           >>> Numbers
const numBtns = {}
for (let i = 9; i >= 0; i--){
    numBtns[i] = document.getElementById(`btn${i}`);
}
//#endregion
//#region           >>> Operators

const btnAdd      = document.getElementById(`btnAdd`)
const btnSubtract = document.getElementById(`btnSubtract`)
const btnMultiply = document.getElementById(`btnMultiply`)
const btnDivide   = document.getElementById(`btnDivide`)

//#endregion
//#region           >>> Other Buttons
const btnEquals      = document.getElementById(`btnEquals`)
const btnAns = document.getElementById(`btnAns`)
const btnClear = document.getElementById(`btnClear`)
const btnClearEntry   = document.getElementById(`btnClearEntry`)

//#endregion
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

            const dynamicBtnFrame = document.getElementById(`dynamicBtnFrame`)

//dynamicBtnFrame.style.backgroundColor= "rebeccapurple";


//#endregion
//#endregion
//#region       >> Global Variables

// variables that hold calculation data:
let num1 = ""
let num2 = ""
let operator = ""
let ans = ""

let currentNum = num1

numSwitchFlag = true

let testVar = num1 + operator + num2


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


function getNum (e){
    return e.target.id.replace('btn', "")
}

function concatCurrentNum (num){
    currentNum = currentNum.concat(num)
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
}

function updateDisplay (){
    updateNum()
    console.log (num1 + " " + operator + " " + num2)
}


//#endregion
//#region       >> Controller Functions
function operatorPress () {
    switchCurrentNum();
    updateDisplay ();
}

function numberPress (e) {
    let newNum = getNum(e);
    concatCurrentNum (newNum);
    updateDisplay ();
}

function functionPress () {
    updateDisplay ();
}

//#endregion
//#endregion
//#region   > Dom Generation
//#region       >> NODE CREATION


//#endregion
//#region       >> LISTENERS

btnFrameFunc.childNodes.forEach(child => {
    child.addEventListener("click", functionPress);
});

btnFrameNum.childNodes.forEach(child => {
    child.addEventListener("click", numberPress);
});

dynamicBtnFrame.childNodes.forEach(child => {
    child.addEventListener("click", operatorPress);
});

//#endregion
//#endregion