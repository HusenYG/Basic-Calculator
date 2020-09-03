class Calc{
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement= previousOperandTextElement
    this.currentOperandTextElement= currentOperandTextElement
    this.clear()
  }

  clear(){
    this.previousOperand= ''
    this.currentOperand= ''
    this.operation= undefined
  }

  delete(){
    this.currentOperand= this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand= this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation){
    if(this.currentOperand === '') return
    if(this.previousOperand !== ''){
      this.compute();
    }
    this.operation= operation
    this.previousOperand= this.currentOperand
    this.currentOperand= ''
  }

  compute(){
    let result
    const curr= parseFloat(this.currentOperand)
    const prev= parseFloat(this.previousOperand)
    switch(this.operation){
      case '+':
        result= prev + curr
        break
      case '-':
        result= prev - curr
        break
      case '×':
        result= prev * curr
        break
      case '÷':
        result= prev / curr
        break
      default:
        return
    }
    this.currentOperand= result
    this.previousOperand= ''
    this.operation= undefined
  }

  displayFormat(number){
    let floatNumber= parseFloat(number)
    if(isNaN(floatNumber)) return ''
    return floatNumber.toLocaleString('en');
  }

  updateDisplay(){
    this.currentOperandTextElement.innerText= this.currentOperand
    if(this.operation != null){
      this.previousOperandTextElement.innerText= `${this.previousOperand} ${this.operation}`
    }
    else{
      this.previousOperandTextElement.innerText= '';
    }
  }
}

const numberButtons= document.querySelectorAll('[data-number]');
const operationButtons= document.querySelectorAll('[data-operator]');
const equalsButton= document.querySelector('[data-equal]');
const clearButton= document.querySelector('[data-clear]');
const deleteButton= document.querySelector('[data-delete]');
const previousOperandTextElement= document.querySelector('[data-previous-operand]');
const currentOperandTextElement= document.querySelector('[data-current-operand]');

const calc = new Calc(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.appendNumber(button.innerText)
    calc.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.chooseOperation(button.innerText)
    calc.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calc.compute()
  calc.updateDisplay()
})

clearButton.addEventListener('click', button => {
  calc.clear()
  calc.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calc.delete()
  calc.updateDisplay()
})