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
//#region           >>> Other Button Declarations
const btnEquals      = document.getElementById(`btnEquals`)
const btnAns = document.getElementById(`btnAns`)
const btnClear = document.getElementById(`btnClear`)
const btnClearEntry   = document.getElementById(`btnClearEntry`)

//#endregion
//#region           >>> Other Node Declarations
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
//#region       >> Other Global Variables


//#endregion
//#endregion
//#region   > Functions 
//#region       >> Utility Functions


//#endregion
//#region       >> Controller Functions


//#endregion
//#endregion
//#region   > Dom Generation
//#region       >> NODE CREATION


//#endregion
//#region       >> LISTENERS


//#endregion
//#endregion