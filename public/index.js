var allPosts = [];

function handleModalAcceptClick() {
  
  var postReply = document.getElementById('post-reply-input').value;
  var postURL = document.getElementById('post-URL-input').value;
  var postText = document.getElementById('post-text-input').value;
  var postAuthor = document.getElementById('post-author-input').value;
  var postID = Math.floor(Math.random() * 100000);
  console.log(postID);

  if (true) {
	
	if (!postReply) {
	   postReply = "0";
	}
	
	if (!postAuthor) {
	   postAuthor = "Anonymous";
	}
	
	if(!postURL) {
		postURL = 'https://spng.pngfly.com/20180426/ccq/kisspng-todd-howard-the-elder-scrolls-v-skyrim-fallout-4-make-faces-5ae167071ce923.5249474515247214151184.jpg';
	}
	
	allPosts.push({
	   reply: postReply,
	   URL: postURL,
	   text: postText,
	   author: postAuthor,
	   ID: postID
	});
	
	
	var postRequest = new XMLHttpRequest();
	var linkURL = encodeURIComponent(postURL);
	var requestURL = '/post/' + postID + '/' + postReply + '/' + linkURL + '/' + postText + '/' + postAuthor;
	postRequest.open('POST', requestURL);
	

	
	postRequest.send();

    hideCreatePostModal();
	
	location.reload(true);

  } else {

    alert('You must specify the text content of the post!');

  }
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
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

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
  
});