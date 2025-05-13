// Example 1: Handling non-JSON responses with fetch
(async function() {
  try {
    const response = await fetch('https://google.com');
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    console.log('Content type:', contentType);
    
    if (contentType && contentType.includes('application/json')) {
      const jsonData = await response.json();
      console.log('JSON data:', jsonData);
    } else {
      // Handle non-JSON response (like HTML)
      const text = await response.text();
      console.log('First 100 characters of response:', text.substring(0, 100));
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
})();

// Example 2: Fetching GitHub user data
function user() {
  return new Promise((resolve) => {
    const user = {
      name: "glianx"
    };
    resolve(user);
  })
}

user()
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    const img = document.createElement('img');

// fetch('https://google.com')
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// fetch('https://googledoesnotexist.com/')
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

function getUser() {
    return new Promise((resolve) => {
        user = {
            name: "glianx"
        };
        resolve(user);
    })
}

getUser()
//   .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
//   .then(response => console.log(response))
  .then(response => console.log(response.json()))
//   .then(githubUser => new Promise((resolve, reject) => {
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => {
//       img.remove();
//       resolve(githubUser);
//     }, 3000);
//   }))
//   .catch(error => console.error(error.message));