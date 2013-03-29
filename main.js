/**
 * Function called when the user clicks the "Load more" button
 * @return {void}
 */
function loadMoreTweets() {
	$.ajax({
		url: "http://search.twitter.com/search.json"+nextUrl,
		dataType: "jsonp",
		jsonpCallback: "displayTweets"
	});
}

/**
 * Function that displays the tweets as a callback of searchTweets
 * @param  {object} r The results of the API call
 * @return {void}
 */
function displayTweets(r) {
	if(r.results.length === 0) {
		$(".loadmore button").fadeOut();
		$('.noresults').fadeIn();
	} else {
		nextUrl = r.next_page;
		$(r.results).each(function() {
			tweet = this;
			clone = $('#template').clone();

			//Parses the URLs, @Usernames and #hashtags
			tweet.text = tweet.text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1'>$1</a>");
			tweet.text = tweet.text.replace(/\B@([\w-]+)/gm, '<a href="http://twitter.com/$1" target="_blank">@$1</a>');
			tweet.text = tweet.text.replace(/\B#([\w-]+)/gm, '<a href="https://twitter.com/search?q=%23$1" target="_blank">#$1</a>');

			$(clone).find('.tweet').html(tweet.text);
			$(clone).find('.time').html(timeAgo(tweet.created_at));

			link = $("<a />").attr("href","http://twitter.com/"+tweet.from_user).text(tweet.from_user_name);
			$(clone).find('.user').append($(link));

			$(clone).appendTo($(".container")).show();
			$('#container').gridalicious('append',$(clone).removeClass("hidden"));
		});
		$(".loadmore button").fadeIn();
	}
}

/**
 * Runs a search against Twitter's search API
 * @param  {string} query
 * @return {void}
 */
function searchTweets(query) {
	$('.noresults').fadeOut();
	$('#container .item').fadeOut(function() {
		$(this).remove();
	});

	$.ajax({
		url: "http://search.twitter.com/search.json?q="+query,
		dataType: "jsonp",
		jsonpCallback: "displayTweets"
	});
}

$(document).ready(function() {
	var nextUrl;

	$("#container").gridalicious({
		animate: true,
		animationOptions: {
			speed: 200,
			duration: 300
		}
	});

	$("#header form").submit(function() {
		query = escape($(this).find('.search').val());
		if(query.length === 0) {
			return false;
		}

		searchTweets(query);
		return false;
	});

	$(".loadmore button").click(function() {
		loadMoreTweets();
		$(".loadmore button").fadeOut();
	});
});