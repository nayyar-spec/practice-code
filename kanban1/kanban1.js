import { LightningElement, track } from 'lwc';

export default class Kanban1 extends LightningElement {

    stages = ['To Do', 'In Process', 'QA Sandbox', 'Production'];
    stage = this.template.querySelector('kanban-column');
    @track taskList = [
        {stage:'To Do', tasks: [{id: 0, name: "first Task"}], isToDo:true},
        {stage:'In Process', tasks:  []},
        {stage:'QA Sandbox', tasks:  []},
        {stage:'Production', tasks:  []},
    ];
    @track isModalOpen = false;
    autoNumber = 0;
    groupTasks = [];
    @track dragTaskId;
    @track dragTaskName;
    @track dragTaskStage;
    get isToDo() { return this.stage === 'To Do'}


    openModal() {
        this.isModalOpen = true;
    }

    createTask() {
        const itemName = this.template.querySelector('.input-value').value;
        this.autoNumber++;
        if(itemName != null) {
            const task = {id: this.autoNumber, name: itemName};
            this.taskList.find(task => task.stage === 'To Do').tasks.push(task);
        }
        else{console.log('value is null')}
        this.isModalOpen = false;
        //  console.log(JSON.stringify(this.taskList));
    }   

    closeModal() {  
        this.isModalOpen = false;
    }

    handleDragStart(event) {
        // console.log(event.currentTarget.dataset.taskId);
        this.dragTaskId = event.currentTarget.dataset.taskId;
        this.dragTaskStage = event.currentTarget.dataset.taskStage;
        this.dragTaskName = event.currentTarget.dataset.taskName;
    }

    handleDragOver(event){
        // console.log('handleDragOver is called before prevent default')
        event.preventDefault();
        // console.log('handleDragOver is called after prevent default')
    }
    
    handleDrop(event){
        // console.log('handleDrop is called before prevent default')
        event.preventDefault();
        // console.log('handleDrop is called after prevent default')
        const newStage = event.currentTarget.dataset.stage;
        console.log(newStage);
        console.log(this.dragTaskId);
        console.log(this.dragTaskStage);
        // console.log(JSON.strigify(this.taskList.find(col => col.stage == this.dragTaskStage)));
        // let updatedTask = JSON.stringify(this.taskList);
        // console.log(updatedTask);
        // let column = JSON.stringify(JSON.parse(updatedTask).find(col => col.stage == this.dragTaskStage));
        // console.log(column);
        // let task = JSON.stringify(JSON.parse(column).tasks.find(task => task.id == this.dragTaskId));
        // console.log(task);
        // let task2 = JSON.parse(task);
        // task2.stage = newStage;
        // task = task2;
        // JSON.parse(task).stage = newStage;
        // console.log(task);
        // this.taskList = updatedTask;
        // JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.taskList)).find(col => col.stage == this.dragTaskStage).tasks)).find(task => task.id == this.dragTaskId).stage = newStage;
        const task = {id: this.dragTaskId, name: this.dragTaskName};
        this.taskList.find(col => col.stage == newStage).tasks.push(task);
        console.log(JSON.parse(JSON.stringify(this.taskList)));
        console.log(task.id);
        console.log(task.name);
        const temp = JSON.parse(JSON.stringify(this.taskList.find(col => col.stage == this.dragTaskStage))).tasks.filter(task => task.id != this.dragTaskId);
        console.log(temp);
        this.taskList.find(col => col.stage == this.dragTaskStage).tasks = [...temp];
        // this.taskList = null;
        // this.taskList = temp;
        // console.log(temp);   
        console.log(this.taskList);

        // this.taskList.find(col => col.stage == this.dragTaskStage).tasks.find(task => task.id == this.dragTaskId).stage = newStage;

        // let temp = JSON.parse(JSON.stringify(this.taskList));
        // this.taskList = null;
        // this.taskList = temp;
    
        
        // let task = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.taskList)).find(col => col.stage == this.dragTaskStage).tasks)).find(task => task.id == this.dragTaskId);
        // console.log(this.taskList);
        // task.stage = newStage;
        // this.taskList.find(col => col.stage == this.dragTaskStage).tasks.find(task => task.id == this.dragTaskId).stage = newStage;
    }

    
}