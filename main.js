// Promise.all([promiseOne, promiseTwo, promiseThree]).then((values) => doSomething(values););
function getAllPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts/")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let allUsers = json.map(getUser); // => ['a', 'b', 'c'].map(letter => letter.toUpperCase()) => ['A', 'B', 'C']
      Promise.all(allUsers);
    });
}

function getUser(thePost) {
  fetch("https://jsonplaceholder.typicode.com/users/" + thePost.userId)
    .then(function(result) {
      return result.json();
    })
    .then(function(userData) {
      console.log({ userId: userData.id });
      document
        .getElementById("container")
        .appendChild(document.createElement("h3")).textContent = `Id: ${
        userData.id
      }`;
    });
}


function getAllPosts() {
  const thePromises = []
  for (let index = 1; index <= 100; index++) {
    thePromises.push(fetch(`https://jsonplaceholder.typicode.com/posts/${index}`))
  }
  addAllPosts(thePromises);
}

function addAllPosts(allPromises) {
  Promise.all(allPromises).then(postValues => {
    const allPosts = postValues.map(postResponse => postResponse.json());
    console.log({allPosts});
    Promise.all(allPosts)
      .then(allOrderedPosts => {
        return allOrderedPosts.sort((left, right) => {
          return (left.id > right.id) ? -1 : 1;
        });
      })
      .then(reversePostData => {
        console.log('All the posts...')
        console.log({allPostData: reversePostData});
        reversePostData.forEach(post => {
          addPost(post);
        });
    });
  });
}

function addPost(thePost) {
  console.log({ id: thePost.id });
  const element = document.getElementById("container");
  const title = document.createElement("h2");
  const body = document.createElement("p");

  title.textContent = thePost.title;
  body.textContent = thePost.body;

  element.appendChild(title);
  element.appendChild(body);
}

function unorderedAddAllPosts(allPromises) {
  // Unordered returned Promises
  allPromises.forEach(postValue => {
    postValue.then(value => {
      value.json().then(json => {
        addPost(json);
      })
    })
  });
}


getAllPosts();
