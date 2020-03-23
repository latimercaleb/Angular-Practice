"use strict";
// Drag n Drop App 
// In single file for now, will be expanded into multi-files later
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// State manager
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numberOfPpl) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numberOfPpl
        };
        this.projects.push(newProject);
        for (const listeners of this.listeners) {
            listeners(this.projects.slice());
        }
    }
    addListener(listnerFn) {
        this.listeners.push(listnerFn);
    }
}
const projectState = ProjectState.getInstance();
function validate(input) {
    let isValid = true;
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if (input.minLength && typeof input.value === 'string') {
        isValid = isValid && input.value.length > input.minLength;
    }
    if (input.maxLength && typeof input.value === 'string') {
        isValid = isValid && input.value.length < input.maxLength;
    }
    if (input.min != null && typeof input.value === 'number') {
        isValid = isValid && input.value > input.min;
    }
    if (input.max != null && typeof input.value === 'number') {
        isValid = isValid && input.value < input.max;
    }
    return isValid;
}
function autobind(trgt, methodname, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundContext = originalMethod.bind(this);
            return boundContext;
        }
    };
    return adjDescriptor;
}
// Associate classes to each part of the template
class ProjectInput {
    constructor() {
        this.templateRoot = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedDOMNode = document.importNode(this.templateRoot.content, true);
        this.element = importedDOMNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInput = this.element.querySelector('#title');
        this.descriptionInput = this.element.querySelector('#description');
        this.peopleInput = this.element.querySelector('#people');
        this.configureEvents();
        this.attachMarkup();
    }
    attachMarkup() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
    configureEvents() {
        // Rather than binding this, it's better idea to use a decorator
        // this.element.addEventListener('submit', this.submitHandler.bind(this));
        this.element.addEventListener('submit', this.submitHandler);
    }
    collectInput() {
        const title = this.titleInput.value;
        const descript = this.descriptionInput.value;
        const ppl = this.peopleInput.value;
        const titleValidator = {
            value: title,
            required: true
        };
        const descriptValidator = {
            value: descript,
            required: true,
            minLength: 5
        };
        const pplValidator = {
            value: +ppl,
            required: true,
            min: 1,
            max: 5
        };
        //Validate input 
        if (validate(titleValidator) &&
            validate(descriptValidator) &&
            validate(pplValidator)) {
            return [title, descript, parseInt(ppl)];
        }
        else {
            alert(`Invalid input`);
        }
    }
    clearInput() {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
    }
    submitHandler(evt) {
        evt.preventDefault();
        const usrInput = this.collectInput();
        // Check type of return
        if (Array.isArray(usrInput)) {
            const [title, descript, ppl] = usrInput;
            // console.log(title,descript,ppl);
            projectState.addProject(title, descript, ppl);
            this.clearInput();
        }
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateRoot = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        this.assignedProjects = [];
        const importedDOMNode = document.importNode(this.templateRoot.content, true);
        this.element = importedDOMNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attachMarkup();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        for (const prjItm of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItm.title;
            listEl.appendChild(listItem);
        }
    }
    attachMarkup() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toLocaleUpperCase() + ' PROJECTS';
    }
    addProject() {
    }
}
class ProjecListItem {
}
const projectInputInjection = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
