function insertNewPost(postReply, postURL, postText, postAuthor, postID) {
  var postContext = {
	"reply": postReply,
    "URL": postURL,
    "text": postText,
    "author": postAuthor,
	"ID": postID
  };
  
  var postHTML = Handlebars.templates.post(postContext);
  var postContainer = document.querySelector('main.post-container');
  postContainer.insertAdjacentHTML('beforeend',postHTML);
  return;
}

var allPosts = [];

/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so, inserts a new post into the page using these inputs.
 * If the user did not supply a required input, they instead recieve an alert,
 * and no new post is inserted.
 */
function handleModalAcceptClick() {
  
  var postReply = document.getElementById('post-reply-input').value;
  var postURL = document.getElementById('post-URL-input').value;
  var postText = document.getElementById('post-text-input').value;
  var postAuthor = document.getElementById('post-author-input').value;
  var postID = Math.floor(Math.random() * 100000);

  if (postText) {
	
	if (!postReply) {
	   postReply = "0";
	}
	
	if (!postAuthor) {
	   postAuthor = "Anonymous";
	}
	
	allPosts.push({
	   reply: postReply,
	   URL: postURL,
	   text: postText,
	   author: postAuthor,
	   ID: postID
	});

    clearSearchAndReinsertPosts();

    hideCreatePostModal();

  } else {

    alert('You must specify the text content of the post!');

  }
}


/*
 * This function clears the current search term, causing all posts to be
 * re-inserted into the DOM.
 */
function clearSearchAndReinsertPosts() {

  document.getElementById('navbar-search-input').value = "";
  doSearchUpdate();

}


/*
 * This function shows the modal to create a post when the "create post"
 * button is clicked.
 */
function showCreatePostModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPostModal = document.getElementById('create-post-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createPostModal.classList.remove('hidden');

}


/*
 * This function clears any value present in any of the post input elements.
 */
function clearPostInputValues() {

  var postInputElems = document.getElementsByClassName('post-input-element');
  for (var i = 0; i < postInputElems.length; i++) {
    var input = postInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}


/*
 * This function hides the modal to create a post and clears any existing
 * values from the input fields whenever any of the modal close actions are
 * taken.
 */
function hideCreatePostModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPostModal = document.getElementById('create-post-modal');

  // Hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  createPostModal.classList.add('hidden');

  clearPostInputValues();

}


/*
 * A function that determines whether a given post matches a search query.
 * Returns true if the post matches the query and false otherwise.
 */
function postMatchesSearchQuery(post, searchQuery) {
  /*
   * An empty query matches all posts.
   */
  if (!searchQuery) {
    return true;
  }

  /*
   * The search query matches the post if either the post's text or the post's
   * author contains the search query.
   */
  searchQuery = searchQuery.trim().toLowerCase();
  return (post.author + " " + post.text).toLowerCase().indexOf(searchQuery) >= 0;
}


/*
 * Perform a search over over all the posts based on the search query the user
 * entered in the navbar.  Only display posts that match the search query.
 * Display all posts if the search query is empty.
 */
function doSearchUpdate() {

  /*
   * Grab the search query from the navbar search box.
   */
  var searchQuery = document.getElementById('navbar-search-input').value;

  /*
   * Remove all posts from the DOM temporarily.
   */
  var postContainer = document.querySelector('.post-container');
  if (postContainer) {
    while (postContainer.lastChild) {
      postContainer.removeChild(postContainer.lastChild);
    }
  }

  /*
   * Loop through the collection of all posts and add posts back into the DOM
   * if they match the current search query.
   */
  allPosts.forEach(function (post) {
    if (postMatchesSearchQuery(post, searchQuery)) {
      insertNewPost(post.reply, post.URL, post.text, post.author, post.ID);
    }
  });

}


/*
 * This function parses an existing DOM element representing a single post
 * into an object representing that post and returns that object.
 */
function parsePostElem(postElem) {

  var post = {};
  
  var postTextElem = postElem.querySelector('.post-text');
  post.text = postTextElem.textContent.trim();

  var postAttributionLinkElem = postElem.querySelector('.post-author a');
  post.author = postAttributionLinkElem.textContent.trim();

  return post;

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  // Remember all of the existing posts in an array that we can use for search.
  var postElemsCollection = document.getElementsByClassName('post');
  for (var i = 0; i < postElemsCollection.length; i++) {
    allPosts.push(parsePostElem(postElemsCollection[i]));
  }
  
  var createPostButton = document.getElementById('create-post-button');
  if (createPostButton) {
    createPostButton.addEventListener('click', showCreatePostModal);
  }

  var modalCloseButton = document.querySelector('#create-post-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', hideCreatePostModal);
  }

  var modalCancalButton = document.querySelector('#create-post-modal .modal-cancel-button');
  if (modalCancalButton) {
    modalCancalButton.addEventListener('click', hideCreatePostModal);
  }

  var modalAcceptButton = document.querySelector('#create-post-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }

  var searchButton = document.getElementById('navbar-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', doSearchUpdate);
  }

  var searchInput = document.getElementById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', doSearchUpdate);
  }

});