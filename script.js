$(document).ready(disableEnterButton);

var enterButton = $('.js-submit-bookmark');
var bookmarkTitle = $('.js-type-title');
var bookmarks = $('.appended-bookmark');
var bookmarkUrl = $('.js-type-url');
var bookmarkSection = $('.js-bookmark-section');
var clearReadButton = $('.js-clear-read');
var readLinks = 0;
var unreadLinks = 0;
var counter = 0;

enterButton.click(bookmarkCreate);
$(bookmarkSection).on('click','#mark-as-read', readButtonToggle);
$(bookmarkSection).on('click','#remove-bookmark', bookmarkDelete);
bookmarkTitle.on('keyup', enableEnterButton);
bookmarkUrl.on('keyup', enableEnterButton);
clearReadButton.on('click', clearReadBookmarks);

function bookmarkCreate(e) {
  e.preventDefault();
  var result = (/((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i).test($(bookmarkUrl).val());
   if (($(".js-type-title").val() === '')) {
    document.querySelector('.js-errors').innerHTML = 'Be sure you have entered a title.';
    // console.log('Be sure you have entered a title.');
   } else if (result === false) {
    document.querySelector('.js-errors').innerHTML = 'Your url address seems odd.  Try copying the url from your site and paste it into the field.';
    // console.log('Your url address seems odd.  Try copying the url from your site and paste it into the field.')
   } else {
    document.querySelector('.js-errors').innerHTML = '';
    bookmarkSection.prepend(`<article class="appended-bookmark"><h2>${bookmarkTitle.val()}</h2>
      <a href="${bookmarkUrl.val()}">${bookmarkUrl.val()}</a>
      <button class="asText" id="mark-as-read">Read</button>
      <button class="asText" id="remove-bookmark">Delete</button></article>`)
    counter++;
    enableClearButton();
    readOrUnread();
    whenBooksAreReadMessage();
    bookmarkNumberDisplay();
   }
};

function bookmarkNumberDisplay() {
  $('span').text(counter);
}

function whenBooksAreReadMessage() {
  if (readLinks > 0){ 
    $('#read-books-message').text('You have read ' + readLinks  +' books.');
  } else {
    $('#read-books-message').text('');
  }; 
};

function readButtonToggle(){
  $(this).toggleClass('read-clicked');
  $(this).parent().toggleClass('read');
  readOrUnread();
  whenBooksAreReadMessage();
  bookmarkNumberDisplay();
};
  
function readOrUnread() {
  readLinks = $('.read').length;
  unreadLinks = counter - readLinks;
};

function bookmarkDelete() {
  $(this).parent().remove();
  counter--;
  readOrUnread();
  whenBooksAreReadMessage();
  bookmarkNumberDisplay();
};

function clearReadBookmarks() {
  $('.read').remove();
  readLinks = 0;
  counter = unreadLinks;
  readOrUnread();
  whenBooksAreReadMessage();
  bookmarkNumberDisplay();
};

function disableEnterButton() {
    clearReadButton.prop('disabled', true);
    enterButton.prop('disabled', true);
};

function enableEnterButton() {
    if (bookmarkTitle.val() != 0 || bookmarkUrl.val() != 0) {
     enterButton.prop('disabled', false);
    } else {
      disableEnterButton();
    };
};

function enableClearButton() {
  clearReadButton.prop('disabled', false);
};