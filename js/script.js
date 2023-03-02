const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div');

const formEl = document.createElement('form');

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputValue = Object.fromEntries(new FormData(e.target));
    let response = await fetch(`https://api.github.com/users/${inputValue.name}`);

    if(response.ok){
        let data = await response.json();
        wrapper.appendChild(createElement(data));
        mainEl.appendChild(wrapper);
        inputEl.placeholder = 'Input user-name';
        inputEl.value = '';
    }else{
        inputEl.placeholder = 'User not found';
    }
});

const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name');
inputEl.placeholder = 'Input user-name';

const searchButtonEl = document.createElement('button');
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerHTML = 'Search';

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

function createElement(profileData) {
    wrapper.innerHTML = '';
    let element = document.createElement('div');
    element.classList.add('profile');

    element.innerHTML = `
        <img class="search-image" src=${profileData.avatar_url}></img>
        <p class="search-text"><span>Login: </span>@${profileData.login}</p>
        <p class="search-text"><span>Name: </span>${profileData.name}</p>
        <p class="search-text"><span>Location: </span>${profileData.location}</p>
        <p><span>URL: </span><a href="https://github.com/${inputEl.value.toLowerCase()}">https://github.com/${inputEl.value.toLowerCase()}</a></p>
    `;
    return element;
}