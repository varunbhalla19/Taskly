const todoDarkScreen = document.querySelector('.todoDarkScreen');

const taskbeingAdded = { value: false, dateVal: new Date(), dateStr: dateToStr(new Date()), el: null, cover: false };

const helper = {
    selectedTaskDate: dateToStr(new Date()), today: dateToStr(new Date()), todayDate: new Date() , theme : 1 
}

window['real-date'].textContent = helper.selectedTaskDate ;

const moreOptions = document.querySelectorAll('.td-more');

const heading = document.querySelector('.headingCover')

const taskLists = {
    [helper.selectedTaskDate]: [
        {
            title: 'Cycling',
            timeFrom: '18:30',
            timeTo: '20:00',
            id: 'Cycling18:3020:00',
            date: helper.selectedTaskDate

        },
        {
            title: 'Rest Api Development',
            timeFrom: '13:30',
            timeTo: '16:00',
            id: 'Rest Api Development13:3016:00',
            date: helper.selectedTaskDate

        }, {
            title: 'Webinar',
            timeFrom: '09:00',
            timeTo: '11:00',
            id: 'Webinar09:0011:00',
            date: helper.selectedTaskDate
        },
    ]
};

function changeTheme ( ) {
    let docStyl = document.documentElement.style ;
    if(helper.theme) {
        docStyl.setProperty('--light' , '#012' );
        docStyl.setProperty('--textDark' , '#789' );
        docStyl.setProperty('--gray' , '#345' );
        docStyl.setProperty('--textLight' , '#89a' ) ;
        docStyl.setProperty('--dark' , '#123' ) ;
        docStyl.setProperty('--med' , '#234' ) ;
        docStyl.setProperty('--form' , '#2f2f41' ) ;
        this.firstElementChild.src = "sun.svg";
        helper.theme = 0 ;
    } else {
        helper.theme = 1 ;
        this.firstElementChild.src = "moon.svg";
        docStyl.setProperty('--light' , '#def' );
        docStyl.setProperty('--textDark' , '#456' );
        docStyl.setProperty('--gray' , '#9ab' );
        docStyl.setProperty('--textLight' , 'whitesmoke' ) ;
        docStyl.setProperty('--dark' , '#234' ) ;
        docStyl.setProperty('--med' , '#456' ) ;
        docStyl.setProperty('--form' , '#484865' ) ;
    }
}

themeChange.addEventListener('click' , changeTheme )

// fetch('tasks.json').then(res => res.json()).then(console.log)

const todoTaskCover = document.querySelector('body > .todo-task-cover');

const todoParentCover = document.querySelector('.todo-tasks');

let todoHeading = todoParentCover.previousElementSibling;

function dateSelected(ev, el) {
    let realDate = ev.target.custom_date_prop, dateStr = ev.target.custom_date;
    // console.log('el is ', ev.target.custom_date_prop);
    if (taskbeingAdded.value) {
        if (realDate < helper.todayDate) {
            return;
        }

        taskbeingAdded.dateVal = realDate;
        taskbeingAdded.dateStr = dateStr;
        taskbeingAdded.el.textContent = dateStr;
    } else {
        helper.selectedTaskDate = dateStr;
        if (dateStr === helper.today) {
            todoHeading.textContent = 'Today'
        } else {
            todoHeading.textContent = dateStr;
        }
        showTask(helper.selectedTaskDate);
    }
}



calPick.create( { evListener : dateSelected , week : true });

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
        dateDone();
        todoDarkScreen.classList.add('show');
    }
    console.log(this.previousElementSibling);
});

[taskTit, taskDet].forEach(el => el.addEventListener('focus', ev => dateDone(true)))

function dateDone(fromInp) {
    if (taskbeingAdded.value) {

        if (fromInp) {
            todoDarkScreen.classList.add('show');
        }
        calPick.showWeek();
        taskbeingAdded.value = false;
        editSelectedDate.textContent = 'Edit';
    }
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




todoParentCover.addEventListener('click', ev => {
    if (ev.target.classList.contains('td-more')) {
        showMoreOptions(ev.target);
    }
    if (ev.target.classList.contains('td-delete')) {
        console.log('delete task');
        let task = ev.target.parentElement.previousElementSibling;
        deleteTask(task);
    }
})

function deleteTask(task) {
    console.log(task.taskId, task.date);
    taskLists[task.date] = taskLists[task.date].filter(ts => ts.id !== task.taskId);
    // showTask(helper.selectedTaskDate) ;    
    task.parentElement.remove();
}

function showTask(givenDate) {
    todoParentCover.innerHTML = "";
    console.log('selected date => ', givenDate);
    if (taskLists[givenDate]) {
        if (taskLists[givenDate].length == 1) {
            createTask(taskLists[givenDate][0]);
            return;
        }
        sortByTime(taskLists[givenDate])
        taskLists[givenDate].forEach(createTask);
    }
}

showTask(helper.selectedTaskDate);


function createTask(task) {

    let taskCover = todoTaskCover.cloneNode(true).firstElementChild;
    taskCover.firstElementChild.textContent = task.title;
    taskCover.taskId = task.id;
    taskCover.date = task.date;
    let timings = taskCover.firstElementChild.nextElementSibling;
    timings.firstElementChild.textContent = task.timeFrom;
    timings.lastElementChild.textContent = task.timeTo;

    todoParentCover.append(taskCover.parentElement);
}



addTaskDoneBtn.addEventListener('click', function (ev) {
    let data = new FormData(document.forms[0]);
    let title = data.get('taskTitle'), detail = data.get('taskDetail'), timeFrom = data.get('timeFrom'), timeTo = data.get('timeTo');

    console.log(title, detail, timeFrom, timeTo, taskbeingAdded.dateStr);

    if (!(title.length && timeFrom && timeTo)) return;

    if (((helper.today == taskbeingAdded.dateStr) && (timeFrom <= timeStr())) || (timeTo <= timeFrom)) {
        console.log('Invalid Time');
        timeSelectP.classList.add('invalid');
        return;
    } else {
        timeSelectP.classList.remove('invalid');
    }

    let task = { title, timeFrom, timeTo }

    task.id = `${title}${timeFrom}${timeTo}`;
    task.date = taskbeingAdded.dateStr;

    if (taskLists[taskbeingAdded.dateStr]) {
        taskLists[taskbeingAdded.dateStr].push(task)
    } else {
        taskLists[taskbeingAdded.dateStr] = [task];
    }
    sortByTime(taskLists[taskbeingAdded.dateStr]);
    document.forms[0].reset();

    if (taskbeingAdded.dateStr === helper.selectedTaskDate) {
        showTask(taskbeingAdded.dateStr);
    }

});

function dateToStr(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function timeStr() {
    let hrs = (new Date()).getHours();
    let mins = (new Date()).getMinutes();

    if (hrs < 10) {
        hrs = `0${hrs}`;
    }
    if (mins < 10) {
        mins = `0${mins}`;
    }
    return `${hrs}:${mins}`;

}

function sortByTime(ar) {
    ar.sort((a, b) => {
        if (a.timeFrom < b.timeFrom) return -1;
        return 0;
    })
}


