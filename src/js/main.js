 const checkbox = document.querySelector('input#theme');

checkbox.addEventListener('change', (cb) => {
   document.documentElement.setAttribute('data-theme',
   cb.target.checked ? 'dark' : 'light');

   const themeIcon = document.getElementById('theme-icon')

   if (cb.target.checked) {
    // SVG para o tema escuro (lua)
    themeIcon.innerHTML = '<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="nonzero"><path d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"/></g></svg>';

    document.querySelector('.header__theme').childNodes[0].textContent = 'Light';
  } else {
    // SVG para o tema claro (sol)
    themeIcon.innerHTML = '<path d="M19.513 11.397a.701.701 0 0 0-.588.128 7.496 7.496 0 0 1-2.276 1.336 7.101 7.101 0 0 1-2.583.462 7.505 7.505 0 0 1-5.32-2.209 7.568 7.568 0 0 1-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 0 1 1.227-2.21.657.657 0 0 0-.102-.924.701.701 0 0 0-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 0 0 0 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 0 0 7.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 0 0 3.58-5.624.623.623 0 0 0-.46-.796z" fill="#697C9A" fill-rule="nonzero"/>';

    document.querySelector('.header__theme').childNodes[0].textContent = 'Dark';
  }
});

async function fetchGitHubUser(event) {
  event.preventDefault();

  const username = document.getElementById('search-input').value;
  const errorMsg = document.querySelector('.form__error');
  const profileResults = document.querySelector('.main__github-result');

  errorMsg.style.display = "none";

  if (!username) {
    errorMsg.style.display = "block";
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);


    if(!response.ok) {
      throw new Error('No Results');
    }

    const data = await response.json();
    console.log(data);
    profileResults.style.display = 'flex';
    profileResults.innerHTML = `
    <div class="profile__intro">
      <img src="${data.avatar_url}" class="profile__avatar">
      <div class="profile__info">
        <div>
          <h2>${data.name}</h2>
          <p class="profile__username">@${data.login}</p>
        </div>
        <p>Joined ${data.created_at.substring(0, 10)}</p>
      </div>
    </div>

    <div class="profile__bio">
      <p class="bio__text">${data.bio || 'This profile has no bio'}</p>
    </div>

    <div class="profile__numbers">
      <div class="profile__repos container">
        <h3>Repos</h3>
        <p>${data.public_repos}</p>
      </div>
      <div class="profile__followers container">
        <h3>Followers</h3>
        <p>${data.followers}</p>
      </div>
      <div class="profile__following container">
        <h3>Following</h3>
        <p>${data.following}</p>
      </div>
    </div>

    <div class="profile__social container">
      <div class="social__item location">
      <img src="./assets/icon-location.svg">
        <p>${data.location || 'Not Available'}<p>
      </div>
      <div class="social__item website">
      <img src="./assets/icon-website.svg">
        <p>${data.blog || 'Not Available'}<p>
      </div>
      <div class="social__item twitter">
      <img src="./assets/icon-twitter.svg">
        <p>${data.twitter_username || 'Not Available'}<p>
        </div>
      <div class="social__item company">
      <img src="./assets/icon-company.svg">
      <p>${data.company || 'Not Available'}<p>
      </div>
    </div>
    `

    const elements = profileResults.querySelectorAll('p');
    elements.forEach(element => {
      if (element.textContent === 'Not Available') {
        element.style.opacity = '0.5'; // Define a cor desejada aqui
      }
    });
    

  } catch (error) {
    console.log('Error')
  }

}

document.querySelector('.form').addEventListener('submit', fetchGitHubUser);


