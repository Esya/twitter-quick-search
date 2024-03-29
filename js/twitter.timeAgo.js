/**
 * relative time calculator
 * @param {string} twitter date string returned from Twitter API
 * @return {string} relative time like "2 minutes ago"
 */
function timeAgo(dateString) {
  var rightNow = new Date();
  var then = new Date(dateString);

  if ($.browser.msie) {
    // IE can't parse these crazy Ruby dates
    then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
  }

  var diff = rightNow - then;

  var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;

  if (isNaN(diff) || diff < 0) {
    return ""; // return blank string if unknown
  }

  if (diff < second * 2) {
    // within 2 seconds
    return "right now";
  }

  if (diff < minute) {
    return Math.floor(diff / second) + " seconds ago";
  }

  if (diff < minute * 2) {
    return "about 1 minute ago";
  }

  if (diff < hour) {
    return Math.floor(diff / minute) + " minutes ago";
  }

  if (diff < hour * 2) {
    return "about 1 hour ago";
  }

  if (diff < day) {
    return  Math.floor(diff / hour) + " hours ago";
  }

  if (diff > day && diff < day * 2) {
    return "yesterday";
  }

  if (diff < day * 365) {
    return Math.floor(diff / day) + " days ago";
  }

  else {
    return "over a year ago";
  }

};