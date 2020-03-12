// Drag n Drop App 
// In single file for now, will be expanded into multi-files later


function autobind(trgt: any, methodname: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get(){
            const boundContext = originalMethod.bind(this);
            return boundContext;
        }
    }
    return adjDescriptor;
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

        this.configureEvents();
        this.attachMarkup();
    }
    
    private attachMarkup(){
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }

    private configureEvents(){
        // Rather than binding this, it's better idea to use a decorator
        // this.element.addEventListener('submit', this.submitHandler.bind(this));
        this.element.addEventListener('submit', this.submitHandler);
    }

    private collectInput(): [string, string, number]{
        const title = this.titleInput.value;
        const descript = this.descriptionInput.value;
        const ppl = this.peopleInput.value;

        //Validate input 

        return [title, descript, parseInt(ppl)];
    }

    private clearInput(){
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
    }

    @autobind
    private submitHandler(evt: Event){
        evt.preventDefault();
        const usrInput = this.collectInput();
        // Check type of return
        const [title, descript,ppl] = usrInput;
        console.log(title,descript,ppl);
        this.clearInput();
    }
}

const projectInputInjection = new ProjectInput();