// const checkbox = document.querySelector('input#theme');

// checkbox.addEventListener('change', (cb) => {
//   document.documentElement.setAttribute('data-theme',
//   cb.target.checked ? 'dark' : 'light');
// });

async function fetchGitHubUser(event) {
  event.preventDefault();

  const username = document.getElementById('search-input').value;
  const errorMsg = document.querySelector('.form__error');
  const profileResults = document.querySelector('.main__github-result');

  if (!username) {
    errorMsg.style.display = "block";
  }

  try {
    // const response = await fetch(`https://api.github.com/users/${username}`);
    const response = await fetch(`https://api.github.com/users/gabrieltrtl`);

    if(!response.ok) {
      throw new Error('No Results');
    }

    const data = await response.json();
    console.log(data);
    profileResults.innerHTML = `
    <div class="profile__intro">
      <img src="${data.avatar_url}" class="profile__avatar">
      <div class="profile__info">
        <h2>${data.name}</h2>
        <p>${data.login}</p>
        <p>${data.created_at}</p>
      </div>
    </div>

    <div class="profile__bio">
      <p class="bio__text">${data.bio}</p>
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
      <div class="social__item">
      <img src="./assets/icon-location.svg">
        <p>${data.location}<p>
      </div>
      <div class="social__item">
      <img src="./assets/icon-website.svg">
        <p>${data.location}<p>
      </div>
      <div class="social__item">
      <img src="./assets/icon-twitter.svg">
        <p>${data.location}<p>
        </div>
      <div class="social__item">
      <img src="./assets/icon-company.svg">
      <p>${data.location}<p>
      </div>
    </div>
    `
    

  } catch (error) {
    console.log('deu erro')
  }

}

document.querySelector('.form').addEventListener('submit', fetchGitHubUser);
addEventListener('DOMContentLoaded', fetchGitHubUser)


