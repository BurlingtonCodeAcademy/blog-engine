export function addPost(thePost) {
  const element = document.getElementById("container");
  const title = document.createElement("h2");
  const titleLink = document.createElement('a');
  const body = document.createElement("p");
  const author = document.createElement("h3");
  const email = document.createElement('a');
  const phone = document.createElement('a');

  const authorData = thePost.author;
  titleLink.textContent = `Title: ${thePost.title}`;
  titleLink.href = `/author.html?authorId=${authorData.id}`
  body.textContent = `Body: ${thePost.body}`;
  author.textContent = `Author: ${authorData.name}`;
  email.textContent = `Email: ${authorData.email}`
  email.href = 'mailto:' + authorData.email;

  phone.textContent = `Phone: ${authorData.phone}`
  phone.href = 'tel:' + authorData.phone;

  title.appendChild(titleLink);
  element.appendChild(title);
  element.appendChild(body);
  element.appendChild(author);
  element.appendChild(email);
  element.appendChild(document.createElement('br'));
  element.appendChild(phone);
}
