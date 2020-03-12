"use strict";
// Drag n Drop App 
// In single file for now, will be expanded into multi-files later
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autoBind(trgt, methodname, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
        }
    };
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
        // Rather than this, it's better idea to use a decorator
        // this.element.addEventListener('submit', this.submitHandler.bind(this));
        this.attachMarkup();
    }
    attachMarkup() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
    submitHandler(evt) {
        evt.preventDefault();
        console.log(this.titleInput.value);
    }
}
__decorate([
    autoBind
], ProjectInput.prototype, "submitHandler", null);
const projectInputInjection = new ProjectInput();
