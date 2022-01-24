class Null {
    constructor(){}
    execute(current){
        return current
    }
}

class Addition {
    constructor(value) {
        this.value = value
    }
    execute(current) {
        return current + this.value
    }
}

class Substraction {
    constructor(value) {
        this.value = value
    }
    execute(current) {
        return current - this.value
    }
}

class Multiplication {
    constructor(value) {
        this.value = value
    }
    execute(current) {
        return current * this.value
    }
}

class Division {
    constructor(value) {
        this.value = value
    }
    execute(current) {
        return current / this.value
    }
}

class Calculator {
    constructor() {
        this.current = null
    }
    view() {
        if (this.current === null) return "0"
        return this.current.toString()
    }
    execute(operation) {
        this.current = operation.execute(this.current)
    }
}

document.addEventListener('alpine:init', () => {
    Alpine.data('state', () => ({
        calculator: new Calculator(),
        operation: new Null(),
        handleClick(action) {
            if (action === "C") {
                this.reset()
                return
            }
            if (action === "+" || action === "-" || action === "/" || action === "*") {
                this.calculator.execute(this.operation)
                this.operation = this.textToOperation(action, this.calculator.current)
                this.calculator.current = 0
                return
            }
            if (action === "=") {
                this.calculator.execute(this.operation)
                return
            }

            this.calculator.current = parseInt(`${this.calculator.current || ""}${action}`)
        },
        textToOperation(text, value) {
            switch (text) {
                case "+":   return new Addition(value)
                case "-":   return new Substraction(value)
                case "/":   return new Division(value)
                case "*":   return new Multiplication(value)
                default:    return new Null()
            }
        },
        reset() {
            this.calculator.current = 0
            this.operation = new Null()
        }
    }))
})
