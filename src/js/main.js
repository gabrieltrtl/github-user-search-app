// const checkbox = document.querySelector('input#theme');

// checkbox.addEventListener('change', (cb) => {
//   document.documentElement.setAttribute('data-theme',
//   cb.target.checked ? 'dark' : 'light');
// });

async function fetchGitHubUser(event) {
  event.preventDefault();

  const username = document.getElementById('search-input').value;
  const errorMsg = document.querySelector('.form__error');
  const profileResults = document.querySelector('.profile__intro');

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
    <img src="${data.avatar_url}" class="profile__avatar">
    <div>
      <h2>${data.name}</h2>
      <p>${data.login}</p>
      <p>${data.created_at}</p>
    </div>
    `
    

  } catch (error) {
    console.log('deu erro')
  }

}

document.querySelector('.form').addEventListener('submit', fetchGitHubUser);
addEventListener('DOMContentLoaded', fetchGitHubUser)


