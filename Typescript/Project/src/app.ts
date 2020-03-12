// Drag n Drop App 
// In single file for now, will be expanded into multi-files later

function autoBind(trgt: any, methodname: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get(){
            
        }
    }
}

// Associate classes to each part of the template
class ProjectInput{
    templateRoot: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor(){
        this.templateRoot = <HTMLTemplateElement>document.getElementById('project-input')!; 
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedDOMNode = document.importNode(this.templateRoot.content, true);
        this.element = importedDOMNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";

        this.titleInput = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInput = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInput = this.element.querySelector('#people') as HTMLInputElement;

        // Rather than this, it's better idea to use a decorator
        // this.element.addEventListener('submit', this.submitHandler.bind(this));

        this.attachMarkup();
    }
    private attachMarkup(){
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
    @autoBind
    private submitHandler(evt: Event){
        evt.preventDefault();
        console.log(this.titleInput.value);
    }
}

const projectInputInjection = new ProjectInput();