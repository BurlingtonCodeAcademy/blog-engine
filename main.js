fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(function (response) {
    return response.json();
  })
  .then(function (allPosts) {
    allPosts.forEach(addPost);
  })

function addPost (thePost) {
  const element = document.getElementById('container');
  
  const title = document.createElement('h2');
  title.textContent = thePost.title;
  
  const body = document.createElement('p');
  body.textContent = thePost.body;

  fetch('https://jsonplaceholder.typicode.com/users/' + thePost.userId)
    .then(function(result) {
      return result.json();
    })
    .then(function(userData) {
      const userElement = document.createElement('h2')
      userElement.textContent = userData.name
      element.appendChild(userElement);
      element.appendChild(title);
      element.appendChild(body);
    })
}
