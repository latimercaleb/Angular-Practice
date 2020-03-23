// Drag n Drop App 
// In single file for now, will be expanded into multi-files later

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(input: Validatable){
    let isValid = true;
    if (input.required){
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if(input.minLength && typeof input.value === 'string'){
        isValid = isValid && input.value.length > input.minLength;
    }
    if(input.maxLength && typeof input.value === 'string'){
        isValid = isValid && input.value.length < input.maxLength;
    }
    if(input.min != null && typeof input.value === 'number'){
        isValid = isValid && input.value > input.min;
    }
    if(input.max != null && typeof input.value === 'number'){
        isValid = isValid && input.value < input.max;
    }
    return isValid
}

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

    private collectInput(): [string, string, number] | undefined{
        const title = this.titleInput.value;
        const descript = this.descriptionInput.value;
        const ppl = this.peopleInput.value;

        const titleValidator: Validatable = {
            value: title,
            required: true
        };
        const descriptValidator: Validatable = {
            value: descript,
            required: true,
            minLength: 5
        };
        const pplValidator: Validatable = {
            value: +ppl,
            required: true,
            min: 1,
            max: 5
        };

        //Validate input 
        if (
            validate(titleValidator) && 
            validate(descriptValidator) &&
            validate(pplValidator)
            ){
                return [title, descript, parseInt(ppl)];
            }
        else{
            alert (`Invalid input`);
        }
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
        debugger;
        const [title, descript,ppl] = usrInput;
        console.log(title,descript,ppl);
        this.clearInput();
    }
}

const projectInputInjection = new ProjectInput();