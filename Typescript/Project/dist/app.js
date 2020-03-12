"use strict";
// Drag n Drop App 
// In single file for now, will be expanded into multi-files later
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        //Validate input 
        return [title, descript, parseInt(ppl)];
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
        const [title, descript, ppl] = usrInput;
        console.log(title, descript, ppl);
        this.clearInput();
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const projectInputInjection = new ProjectInput();
