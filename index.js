const bookmarksBtnEl = document.querySelector('.bookmarks-btn');
const errorEl = document.querySelector('.error');
const errorTextEl = document.querySelector('.error__text');
const jobDetailsEl = document.querySelector('.job-details');
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(".pagination__number--next");
const paginationNumberBackEl = document.querySelector(".pagination__number--back");
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnRelevantEl = document.querySelector(".sorting__button--relevant");
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");


const submitHandler = event => {
    event.preventDefault();

const searchText = searchInputEl.value;

const forebiddenpattern = /python/;

const patternmatch = forebiddenpattern.test(searchText);

if(patternmatch){
    errorTextEl.textContent = "you may typed python "; 
    errorEl.classList.add('error--visible');
    setTimeout(() => {
        errorEl.classList.remove('error--visible')
    },3000)
}

searchInputEl.blur();

jobListSearchEl.innerHTML = '';


spinnerSearchEl.classList.add('spinner--visible');

fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
.then(Response => {
    if(!Response.ok){
        console.log('somrthing went wrong');
        return;
    }
    return Response.json();
})
.then(data => {
   const { jobItems } = data ;

   spinnerSearchEl.classList.remove('spinner--visible');

    numberEl.textContent = jobItems.length;

   jobItems.slice(0,6).forEach(jobItems => {
    const newJobItemHTML = ` 
    <li class="job-item">
  <a class="job-item__link" href="${jobItems.id}">
      <div class="job-item__badge">${jobItems.badgeLetters}</div>
      <div class="job-item__middle">
          <h3 class="third-heading">${jobItems.title}</h3>
          <p class="job-item__company">${jobItems.company}</p>
          <div class="job-item__extras">
              <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItems.duration}</p>
              <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItems.salary}</p>
              <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItems.location}</p>
          </div>
      </div>
      <div class="job-item__right">
          <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
          <time class="job-item__time">${jobItems.daysAgo}</time>
      </div>
  </a>
</li>
`;
jobListSearchEl.insertAdjacentHTML('beforeend',   newJobItemHTML);
   });
   
   

   

})

  
.catch(error => console.log(error));


};

searchFormEl.addEventListener('submit', submitHandler);