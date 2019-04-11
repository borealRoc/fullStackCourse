let a = 1;
const b = 2;

let [c, d] = [3, 4]
let {e, f} = {e: 5, f: 6}

let fe = () => {console.log('箭头函数')};

let arr1 = [1, 2, 3]
let arr2 = [...arr1, 4, 5]

class Person {
	constructor(name) {
		this.name = name
	}
	showName() {
		console.log(this.name)
	}
}

class Worker extends Person {
	constructor(name , age) {
		super(name)
		this.age = age
	}
	showAge() {
		console.log(this.age);
	}
}

let w = new Worker('xu', 17)
w.showName()
w.showAge()

