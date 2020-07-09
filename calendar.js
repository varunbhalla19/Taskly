const calPick = {};

calPick.create = start;

function start( dateSelected ) {

    function getDate( ev ) {
        console.log( this.custom_date_prop );
    }    

    if(!dateSelected){
        dateSelected = getDate ;
    }

    const calendarObjects = {
        pCalMonth: null, calMonthCover: null, leftBut: null, rightBut: null, calMonthDays: null,
    }

    calPick.showWeek = weekCalView;
    calPick.showMonth = monthCalView;

    const date = new Date(), month = date.getMonth() + 1, year = date.getFullYear();
    let monthToShow = month, yearToShow = year;

    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const weekNames = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];


    const view = { month: true, week: false };

    const weekSlide = { value: 0, minVal: 0, maxVal: 320 * 4, translateVal: null };


    function init() {

        let el = document.querySelector('.calendar-card');
        weekSlide.translateVal = el.offsetWidth;
        let df = document.createDocumentFragment();

        make(df, el);
        el.append(df);

        calendarObjects.weekbtn.addEventListener('click', weekCalView);
        calendarObjects.monthbtn.addEventListener('click', monthCalView);

        calendarObjects.leftBut.addEventListener('click', decMonth);
        calendarObjects.rightBut.addEventListener('click', incMonth);

        calendarObjects.monthbtn.classList.add('selected');

    }

    function make(df, el) {

        let child = document.createElement('div');
        child.classList.add('calendar-head');
        df.append(child);

        child = document.createElement('div');
        child.classList.add('calweekDays');
        df.append(child);

        child = document.createElement('div');
        child.classList.add('calMonthCover');
        calendarObjects.calMonthCover = child;
        df.append(child);

        makeHead(df, df.firstElementChild);
        makeWeek(df, df.firstElementChild.nextElementSibling);

        let customDate = new Date();
        setHeading(customDate);
        customDate.setDate(1);
        makeMonth(df, df.lastElementChild, customDate);

    }


    function makeHead(df, parent) {
        let heading = document.createElement('div');
        heading.classList.add('calendar-heading');
        heading.innerHTML = `<img src="./icon-arrow.svg" class="ar arleft" alt="">
        <p class="calMonth">June 2020</p>
        <img src="./icon-arrow.svg" class="ar arright" alt="">`
        parent.append(heading);
        calendarObjects.pCalMonth = heading.querySelector('p');

        calendarObjects.leftBut = heading.firstElementChild;

        calendarObjects.rightBut = heading.lastElementChild;

        heading = document.createElement('div');
        heading.classList.add('calendar-arrows');
        heading.innerHTML = `<div id="monthbtn">M</div> <div id="weekbtn">W</div`;
        calendarObjects.weekbtn = heading.lastElementChild;
        calendarObjects.monthbtn = heading.firstElementChild;
        parent.append(heading);
    }

    function makeWeek(df, parent) {
        let df2 = document.createDocumentFragment();
        for (let i = 0; i < 7; i++) {
            let wd = document.createElement('p');
            wd.classList.add('calWeekDay');
            wd.textContent = `${weekNames[i]}`;
            df2.append(wd);
        }
        parent.append(df2);
    }

    function makeMonth(df, parent, newDate) {

        let dateDif = getDateDif(newDate.getDay());

        setWeekLimit(newDate.getDay());

        let cmc = document.createElement('div');
        cmc.classList.add('calMonthCalendar');
        parent.append(cmc);

        let customDate = new Date(newDate);

        let tempdf = document.createDocumentFragment();

        for (let i = 1; i <= 42; i++) {

            let md = document.createElement('div');

            md.classList.add('calMonthDay');

            md.addEventListener('click', dateSelected );

            customDate.setDate(dateDif++);

            md.textContent = customDate.getDate();

            md.custom_date = `${customDate.getDate()}/${customDate.getMonth()}/${customDate.getFullYear()}`;
            md.custom_date_prop = customDate;

            if (customDate.getMonth() !== newDate.getMonth()) {
                md.classList.add('gray');
            }

            if (date.toDateString() == customDate.toDateString()) {
                md.classList.add('today');
            }

            customDate = new Date(newDate);

            tempdf.append(md);
        }

        cmc.append(tempdf);
        calendarObjects.calMonthDays = cmc.querySelectorAll('.calMonthDay');

    }

    // init();

    function incMonth() {

        if (view.week) {
            if ((weekSlide.value + weekSlide.translateVal) <= weekSlide.maxVal) {
                weekSlide.value += weekSlide.translateVal;
                calendarObjects.calMonthCover.firstElementChild.style.transform = `translateX(-${weekSlide.value}px)`
                return;
            }
        }


        if (monthToShow == 12) {
            monthToShow = 1;
            yearToShow++;
            let datee = new Date(`${monthToShow}/1/${yearToShow}`);
            return anim(datee);
        }
        let datee = new Date(`${++monthToShow}/1/${yearToShow}`);
        anim(datee);
    }

    function decMonth() {
        let displayLastWeek = false;
        if (view.week) {
            if ((weekSlide.value - weekSlide.translateVal) >= 0) {
                weekSlide.value -= weekSlide.translateVal;
                calendarObjects.calMonthCover.firstElementChild.style.transform = `translateX(-${weekSlide.value}px)`
                return;
            } else {
                displayLastWeek = true;
            }
        }

        if (monthToShow == 1) {
            monthToShow = 12;
            yearToShow--;
            let datee = new Date(`${monthToShow}/1/${yearToShow}`);
            return anim(datee, displayLastWeek);
        }
        let datee = new Date(`${--monthToShow}/1/${yearToShow}`);
        anim(datee, displayLastWeek);
    }

    function whichTransitionEvent() {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'MSTransition': 'msTransitionEnd',
            'OTransition': 'oTransitionEnd',
            'transition': 'transitionEnd'
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    function anim(datee, displayLastWeek) {
        calendarObjects.calMonthCover.classList.add('fade');
        let event = whichTransitionEvent();
        calendarObjects.calMonthCover.addEventListener(`${event}`, ev => {
            displayCal(datee, displayLastWeek);
            calendarObjects.calMonthCover.classList.remove('fade');
        }, { once: true });
    }

    function getDateDif(date) {
        if (date == 0) {
            return -5;
        } else {
            return 2 - date;
        }
    }

    function setHeading(newdate) {
        calendarObjects.pCalMonth.textContent = `${monthName[newdate.getMonth()]} ${newdate.getFullYear()}`;
    }

    function displayCal(newdate, displayLastWeek) {

        setHeading(newdate);

        let dateDif = getDateDif(newdate.getDay());

        setWeekLimit(newdate.getDay());

        if (displayLastWeek) {
            weekSlide.value = weekSlide.maxVal;
            calendarObjects.calMonthCover.firstElementChild.style.transform = `translateX(-${weekSlide.maxVal}px)`;
        } else {
            weekSlide.value = 0;
            calendarObjects.calMonthCover.firstElementChild.style.transform = '';
        }


        let customDate = new Date(newdate);

        calendarObjects.calMonthDays.forEach(el => {

            customDate.setDate(dateDif++);

            el.textContent = customDate.getDate();

            el.custom_date = `${customDate.getDate()}/${customDate.getMonth()}/${customDate.getFullYear()}`;

            el.custom_date_prop = customDate;

            if (customDate.getMonth() !== newdate.getMonth()) {
                el.classList.add('gray');
            } else {
                el.classList.remove('gray');
            }

            if (date.toDateString() == customDate.toDateString()) {
                el.classList.add('today');
            } else {
                el.classList.remove('today');
            }

            customDate = new Date(newdate);

        });
    }

    function weekCalView(ev) {

        if (view.week) {
            return false;
        }

        let calMonthCover = calendarObjects.calMonthCover;
        calendarObjects.weekbtn.classList.add('selected')
        calendarObjects.monthbtn.classList.remove('selected');

        calMonthCover.parentElement.classList.add('weekview');       // changes view height

        calMonthCover.firstElementChild.classList.add('shoshoc', 'weekview');

        calMonthCover.firstElementChild.addEventListener('animationend', ev => {
            calMonthCover.firstElementChild.classList.remove('shoshoc');

        }, { once: true })



        calMonthCover.classList.add('weekview');
        view['month'] = false;
        view['week'] = true;

        return true;

    }

    function monthCalView(ev) {

        if (view.month) {
            return false;
        }

        let calMonthCover = calendarObjects.calMonthCover;

        calendarObjects.monthbtn.classList.add('selected');
        calendarObjects.weekbtn.classList.remove('selected');

        weekSlide.value = 0;
        calendarObjects.calMonthCover.firstElementChild.style.transform = '';

        calMonthCover.parentElement.classList.remove('weekview');
        calMonthCover.firstElementChild.classList.add('shoshoc');
        calMonthCover.firstElementChild.classList.remove('weekview');


        calMonthCover.firstElementChild.addEventListener('animationend', ev => {
            calMonthCover.firstElementChild.classList.remove('shoshoc');
            calMonthCover.classList.remove('weekview');
        }, { once: true })

        view['month'] = true;
        view['week'] = false;
        return true;
    }

    function setWeekLimit(day) {
        if (day == 0 || day == 6) {
            weekSlide.maxVal = weekSlide.translateVal * 5;
        } else {
            weekSlide.maxVal = weekSlide.translateVal * 4;
        }
    }

    init();

}
