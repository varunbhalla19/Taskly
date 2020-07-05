calPick.create();
calPick.showWeek();

const dailyTasks = [
    {
        title: "",
        detail: "",
        date : "" ,
        time : "" ,
    }, {

    }, {

    }, {

    }
];

const moreOptions = document.querySelector('.td-more') ;

moreOptions.addEventListener('click' , ev => {
    moreOptions.firstElementChild.classList.toggle('short') ;
    moreOptions.lastElementChild.classList.toggle('short') ;
    moreOptions.parentElement.classList.toggle('shift') ;
} )