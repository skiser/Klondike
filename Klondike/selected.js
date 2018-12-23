/**
 * A Selection object represents one or more cards that
 * the user wants to move.  A {@link Location} indicates the
 * source of the moved cards (e.g., the main deck or a
 * tableau pile).  An ArrayList of {@link Card}s stores
 * references to the cards that the user wants to move.
 */
function Selected(origin, selectedCards) {
	//write in the log that were in the selection class to help with bugs
	console.log('Selection');

	//set the selectedCards array
	this.selectedCards = selectedCards;
	//set the original location
	this.origin = origin;
	//function to return the original location
	this.getOrigin = function() {
		return origin;
	};
	//function to set the origin give the origin parameter
	this.setOrigin = function(origin) {
		this.origin = origin;
	};
	//function that returns the selected cards
	this.getCards = function() {
		return selectedCards;
	};
	//set the cards parameter to the selected cards
	this.setCards = function(cards) {
		this.selectedCards = cards;
	};	
	//return the number of cards in the selected cards array
	this.getNumCards = function() {
		return selectedCards.length;
	};
	
}