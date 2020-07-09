const todoTaskScreen = document.querySelector('.todoDarkScreen');
const taskbeingAdded = { value: false, dateVal: null, dateStr: null, el: null };

const moreOptions = document.querySelectorAll('.td-more');

const heading = document.querySelector('.headingCover')

const taskList = [
    {
        title: 'Webinar',
        timeFrom: '09:00AM',
        timeTo: '11:00AM'
    },
    {
        title: 'Rest Api Development',
        timeFrom: '01:30PM',
        timeTo: '04:00PM'
    },
];




function dateSelected(ev, el) {
    let realDate = ev.target.custom_date_prop, dateStr = ev.target.custom_date;
    console.log('el is ', ev.target.custom_date_prop);
    if (taskbeingAdded.value) {
        taskbeingAdded.dateVal = realDate;
        taskbeingAdded.el.textContent = dateStr;
    }
}


calPick.create(dateSelected);
calPick.showWeek();

function showMoreOptions(el) {
    el.firstElementChild.classList.toggle('short');
    el.lastElementChild.classList.toggle('short');
    el.parentElement.classList.toggle('shift');
}

// moreOptions.forEach(el => {
//     el.addEventListener('click', ev => {

//     })
// });

const addTaskScreen = document.querySelector('.addTaskScreen');

editSelectedDate.addEventListener('click', function (ev) {

    if (!taskbeingAdded.value) {
        calPick.showMonth();
        taskbeingAdded.value = true;
        this.textContent = 'Done';
        todoTaskScreen.classList.add('shrink');
        taskbeingAdded.el = this.previousElementSibling;
    } else {
        calPick.showWeek();
        taskbeingAdded.value = false;
        this.textContent = 'Edit';
        todoTaskScreen.classList.remove('shrink');

    }

    console.log(this.previousElementSibling);

});




addTaskBtn.addEventListener('click', el => {
    addTaskScreen.classList.toggle('shrink');
    todoTaskScreen.classList.toggle('shrink');
    // heading.classList.toggle('none') ;
    addTaskBtn.classList.toggle('shrink');
    addTaskDoneBtn.classList.toggle('shrink');
    calPick.showWeek()
});

const todoTaskCover = document.querySelector('body > .todo-task-cover');

const todoParentCover = document.querySelector('.todo-tasks')

todoParentCover.addEventListener( 'click' , ev => {
    if (ev.target.classList.contains('td-more')) {
        showMoreOptions(ev.target) ;
    }
})

console.log(todoTaskCover);

taskList.forEach(createTask);

function createTask(task) {

    let taskCover = todoTaskCover.cloneNode(true).firstElementChild;
    taskCover.firstElementChild.textContent = task.title;
    let timings = taskCover.firstElementChild.nextElementSibling;
    timings.firstElementChild.textContent = task.timeFrom;
    timings.lastElementChild.textContent = task.timeTo;

    // console.log(taskCover) ;

    todoParentCover.append(taskCover.parentElement)

}
