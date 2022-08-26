class TaskProcessor {

    constructor(container) {
        this.tasksFormControl = container.querySelector('.tasks__control')
        this.taskInputString = container.querySelector('.tasks__input')
        this.tasksList = container.querySelector('.tasks__list')

        this.data = window.localStorage
        this.storageKey = 'TODO'

        this.currentTasksArray = []
        this.readTasks()

        this.registerEvents()
    }

    readTasks() {
        const dataFromKey = this.data.getItem(this.storageKey)
        const activeTasks = dataFromKey ? JSON.parse(dataFromKey) : []
        activeTasks.forEach(taskString => this.addTask(taskString))
    }

    saveTasks() {
        const activeTasks = this.currentTasksArray.filter((value) => {
            return value
        })

        this.data.setItem(this.storageKey, JSON.stringify(activeTasks))
    }

    registerEvents() {
        let taskHandler = this

        this.tasksFormControl.addEventListener('submit', function(event) {
            taskHandler.addTask(taskHandler.taskInputString.value)

            event.preventDefault()
        })
    }

    createTaskElement(taskString) {

        const taskElement = document.createElement('div')
        taskElement.className = 'task'
        
        const taskTitle = `<div class="task__title">${taskString}</div>`

        const taskRemoveButton = '<a href="#" class="task__remove" title="Удалить задачу">&times;</a>'

        taskElement.insertAdjacentHTML('afterBegin', taskTitle)
        taskElement.insertAdjacentHTML('beforeEnd', taskRemoveButton)
    
        return taskElement
    }

    addTask(taskDescription) {

        if (taskDescription.trim().length <= 0) {
            alert('Пустая строка')
            return
        }

        const taskElement = this.createTaskElement(taskDescription)

        this.tasksList.insertAdjacentElement('beforeEnd', taskElement)
        this.currentTasksArray.push(taskDescription)

        this.saveTasks()

        const currentTaskIndex = this.currentTasksArray.length - 1

        taskElement.querySelector('.task__remove').addEventListener('click', () => {
            taskElement.remove()
            delete this.currentTasksArray[currentTaskIndex]
            
            this.saveTasks()
        })

        this.taskInputString.value = ''
    }
}

new TaskProcessor(document.getElementById('tasks'));