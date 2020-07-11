const todoDarkScreen = document.querySelector('.todoDarkScreen');

const taskbeingAdded = { value: false, dateVal: new Date(), dateStr: dateToStr(new Date()), el: null, cover: false };

const helper = {
    selectedTaskDate : dateToStr(new Date()) 
}

const moreOptions = document.querySelectorAll('.td-more');

const heading = document.querySelector('.headingCover')

const taskLists = {
    [helper.selectedTaskDate]: [
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
    ]
};


// fetch('tasks.json').then(res => res.json()).then(console.log)


function dateSelected(ev, el) {
    let realDate = ev.target.custom_date_prop, dateStr = ev.target.custom_date;
    console.log('el is ', ev.target.custom_date_prop);
    if (taskbeingAdded.value) {
        taskbeingAdded.dateVal = realDate;
        taskbeingAdded.dateStr = dateStr;
        taskbeingAdded.el.textContent = dateStr;
    } else {
        helper.selectedTaskDate = dateStr ;
        showTask() ;
    }
}


calPick.create(dateSelected);
calPick.showWeek();

function showMoreOptions(el) {
    el.firstElementChild.classList.toggle('short');
    el.lastElementChild.classList.toggle('short');
    el.parentElement.classList.toggle('shift');
}


const addTaskScreen = document.querySelector('.addTaskScreen');

editSelectedDate.addEventListener('click', function (ev) {

    if (!taskbeingAdded.value) {
        calPick.showMonth();
        taskbeingAdded.value = true;
        this.textContent = 'Done';
        todoDarkScreen.classList.remove('show');
        taskbeingAdded.el = this.previousElementSibling;
    } else {
        dateDone(this);
        todoDarkScreen.classList.add('show');
    }
    console.log(this.previousElementSibling);
});


function dateDone(el = editSelectedDate) {
    calPick.showWeek();
    taskbeingAdded.value = false;
    el.textContent = 'Edit';
}


addTaskBtn.addEventListener('click', el => {
    addTaskScreen.classList.toggle('shrink');
    addTaskBtn.classList.toggle('shrink');
    addTaskDoneBtn.classList.toggle('shrink');

    if (taskbeingAdded.cover) {
        document.forms[0].reset();
        todoDarkScreen.classList.remove('show');
        taskbeingAdded.cover = false;
        dateDone();
    } else {
        taskbeingAdded.cover = true
        todoDarkScreen.classList.add('show');
    }
    calPick.showWeek()
});


const todoTaskCover = document.querySelector('body > .todo-task-cover');

const todoParentCover = document.querySelector('.todo-tasks')

todoParentCover.addEventListener('click', ev => {
    if (ev.target.classList.contains('td-more')) {
        showMoreOptions(ev.target);
    }
})

console.log(todoTaskCover);

function showTask ( ) {
    todoParentCover.innerHTML = "" ;
    if(taskLists[helper.selectedTaskDate])
       taskLists[helper.selectedTaskDate].forEach(createTask);
}

showTask() ;


function createTask(task) {

    let taskCover = todoTaskCover.cloneNode(true).firstElementChild;
    taskCover.firstElementChild.textContent = task.title;
    let timings = taskCover.firstElementChild.nextElementSibling;
    timings.firstElementChild.textContent = task.timeFrom;
    timings.lastElementChild.textContent = task.timeTo;

    todoParentCover.append(taskCover.parentElement)

}


addTaskDoneBtn.addEventListener('click', function (ev) {
    let data = new FormData(document.forms[0]);
    let title = data.get('taskTitle'), detail = data.get('taskDetail'), timeFrom = data.get('timeFrom'), timeTo = data.get('timeTo');

    console.log(title, detail, timeFrom, timeTo, taskbeingAdded.dateStr);

    let task = {title , timeFrom , timeTo }

    if( taskLists[taskbeingAdded.dateStr] ) {
        taskLists[taskbeingAdded.dateStr].push(task)
    } else {
        taskLists[taskbeingAdded.dateStr] = [task] ;
    }
    document.forms[0].reset() ;

});

function dateToStr(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}


