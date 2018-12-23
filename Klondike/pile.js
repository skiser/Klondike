/**
 * Class to represent a pile of {@link Card}s.
 * Each card has an index, with index 0 being the card
 * at the bottom of the pile.
 * Each pile has an "expose index": all cards whose
 * indices are greater than or equal to the expose index
 * are face-up, and all other cards are face-down.
 */

function Pile() {
	//show in console that were in the pile class
	console.log('Pile');

	//make a new array called cards
  	this.cards = new Array();
  	//initialize exposedIndex to 0
  	this.exposedIndex = 0;

	/**
	 * @return the expose index
	 */
  	//get the exposedIndex
	this.getExposedIndex = function() {
		return this.exposedIndex;
	};

	/**
	 * Set the expose index.
	 * 
	 * @param exposeIndex the expose index to set
	 */
	//set the exposedIndex using the parameter
	this.setExposedIndex = function(exposedIndex) {
		this.exposedIndex = exposedIndex;
	};
	/**
	 * Add a {@link Card} to the pile.  The card added is placed
	 * on top of the cards currently in the pile.
	 * 
	 * @param card the {@link Card} to add
	 */
	//add the parameter of a card to the pile cards
	this.addCard = function(card) {
		this.cards.push(card);
	};

	/**
	 * @return the number of @{link Card}s in the pile
	 */
	//return the length of the cards array
	this.getNumCards = function() {
		return this.cards.length;
	};
	
	/**
	 * @return true if the pile is empty, false otherwise
	 */
	//returns ttrue if pile is empty and false otherwise
	this.isEmpty = function() {
		if (this.cards.length == 0) {
			return true;
		}
		return false;
	};
	
	/**
	 * Get the {@link Card} whose index is given.
	 * 
	 * @param index the index of the card to get
	 * @return the {@link Card} at the index
	 * @throws NoSuchElementException if the index does not refer to a valid card
	 */
	//return the card with the index using the parameter
	this.getCard = function(index) {
		//check to make sure the index is within the amount of cards possible
		if ((index < 0) && (index >= 52)) {
			alert("index does not refer to a valid card");
		} else {
			return this.cards[index];
		}
	};

	/**
	 * Get the {@link Card} on top of the pile.
	 * 
	 * @return the {@link Card} on top of the pile
	 * @throws NoSuchElementException if the pile is empty
	 */
	//return the top card of the pile
	this.getTopCard = function() {
		//check to make sure cards has something in it
		if (this.cards.length <= 0) {
			alert("pile is empty");
		} else {
			return this.cards[this.cards.length-1];
		}
	};
	
	/**
	 * @return the index of the top {@link Card}, or -1 if the pile is empty
	 */
	//return the index of the top card
	this.getIndexOfTopCard = function() {
		//return -1 if the pile is empty
		if (this.cards.length == 0) {
			return -1;
		} else {
			return this.cards.length-1;
		}
	};
	
	/**
	 * Remove given number of {@link Card}s from the top of the pile.
	 * 
	 * @param numCards number of cards to remove
	 * @return an ArrayList containing the removed cards
	 * 
	 */
	//removes the number of cards from card array
	this.removeCards = function(numCards) {
		//prints number of cards
		console.log(numCards);
		//make sure number of cards trying to remove is less than the number of cards in the pile
        if (this.cards.length < numCards) {
            alert("pile does not have enough");
        } else {
            //initialize new array for the removed cards
        		var removedCards = new Array();
            //initialze a new top card index and print it in the console
        		var topCardIndex = this.cards.length - numCards;
            console.log(topCardIndex);
            //for loop to remove the cards one by one
            for(var i = 0; i < numCards; i++) {
                removedCards.push(this.cards[topCardIndex]);
                console.log(removedCards);
                console.log(this.cards[topCardIndex]);
                console.log(this.cards.length);
                this.cards.splice(topCardIndex,1);
                console.log(this.cards.length);
            }
            //returns the removed card
            return removedCards;
        }

	};

	/**
	 * Add {@link Card}s to the top of the pile.
	 * 
	 * @param cardsToAdd an ArrayList containing the {@link Card}s to add
	 */
	//function that adds card to top of the pile
	this.addCards = function(cardsToAdd) {
		//for loop to add each card in the cardsToAdd array
		for (i = 0; i < cardsToAdd.length; i++) {
			//pushes or adds card to the cards array
			this.cards.push(cardsToAdd[i]);
		}
	};
	/**
	 * Populate the pile by adding 52 {@link Card}s
	 * representing all possible combinations of
	 * {@link Suit} and {@link Rank}.
	 */		
	//populates al 52 cards
	this.populate = function() {
		//goes through each suit
		for (var j = 0; j < CardType.suits.length; j++) {
			//goes through each ranking possible
			for (var i = 0; i < CardType.ranks.length; i++) {
				//make card for each suit and rank combination
				this.cards.push(new Card(CardType.ranks[i], CardType.suits[j]));
			}
		}	
	};

	/**
	 * Shuffle the {@link Card}s in the pile by rearranging
	 * them randomly.
	 */
	//shuffle the cards
	this.shuffle = function() {			
		    // shuffles a deck of cards
		    // uses Fisher-Yates shuffle algorithm. Source: http://sedition.com/perl/javascript-fy.html
		    var i = this.cards.length;
		    if (i == 0) {
		        return this.cards;
		    }
		    while ( --i ) {
		        var j = Math.floor( Math.random() * ( i + 1 ) );
		        var tempi = this.cards[i];
		        var tempj = this.cards[j];
		        this.cards[i] = tempj;
		        this.cards[j] = tempi;
		    }

		    return this.cards;
		
	};
	
	this.fullCopy = function(shuffledCards) {
		for (var j = 0; j < shuffledCards.length; j++) {
			this.cards.push(new Card(shuffledCards[j].getRank(), shuffledCards[j].getSuit()));

		}
		
	};

}