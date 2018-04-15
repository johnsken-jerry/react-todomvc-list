import * as Utils from './utils';

export default class TodoModel {
    constructor(key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = [];
    };

    subscribe(onChange) {
        this.onChanges.push(onChange);
    };

    inform() {
        Utils.store(this.key, this.todos);
        this.onChanges.forEach((cb) => { cb(); });
    };

    addTodo = (title) => {
        this.todos = this.todos.concat({
            id: Utils.uuid(),
            title,
            completed: false
        });
        this.inform();
    };

    toggleAll = (checked) => {
       this.todos = this.todos.map(todo => {
           return Object.assign({}, todo, {completed: checked});
       });
       this.inform();
    };

    toggle = (todoToToggle) => {
        this.todos = this.todos.map(todo => {
            return todo !== todoToToggle ?
                    todo :
                    Object.assign({}, todo, {completed: !todo.completed});
        });
        this.inform();
    };

    destroy = (todo) => {
        console.log(`destroy`, todo)
        this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});
		this.inform();
    };

    save = (todoToSave, text) => {
        this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Object.assign({}, todo, {title: text});
		});
		this.inform();
    };

    clearCompleted = () => {
        this.todos = this.todos.filter((todo)=>{
            return !todo.completed;
        });
        this.inform();
    }
}