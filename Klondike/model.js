/**
 * Model class storing information about a Klondike game
 * in progress.  Consists of a number of {@link Pile} objects
 * representing the various piles: main deck, waste,
 * foundation, and tableau piles.  Note that none of the
 * game logic is implemented in this class: all logic
 * is implemented in the {@link KlondikeController} class.
 */

	/**
	 * Constructor.  Should create all of the required {@link Pile} objects,
	 * but it should <em>not</em> initialize them.  All piles should start
	 * out as empty.
	 */
//model class
function Model() {
	//prints in console that were in the model class
   	console.log('Model');
   	//make maindeck and waste new piles
	this.mainDeck = new Pile();
	this.waste = new Pile();
	//make an array of 4 foundation piles
	this.foundation = new Array(4);
	for (var i = 0; i < 4; i++) {
		this.foundation[i] = new Pile();
	}
	//make an array of 7 tableau piles
	this.tableau = new Array(7);
	for (var i = 0; i < 7; i++) {
		this.tableau[i] = new Pile();
	}
			
	/**
	* @return the {@link Pile} representing the main deck
	*/
	//function that returns the main deck
	this.getMainDeck = function() {
		return this.mainDeck;
	};
	
	/**
	* Get a reference to one of the tableau piles.
	* 
	* @param index index of a tableau pile (in the range 0..6)
	* @return the tableau {@link Pile}
	*/
	//function that returns the tableau pile with the index in the parameter
	this.getTableauPile = function(index) {
		return this.tableau[index];
	};
		
	/**
	* Get a reference to one of the foundation piles.
	* 
	* @param index index of a foundation pile (in the range 0..3)
	* @return the foundation {@link Pile}
	*/
	//function that returns the foundation pile with the index in the parameter
	this.getFoundationPile = function(index) {
		return this.foundation[index];
	};

	/**
	* @return the {@link Pile} representing the waste pile
	*/
	//function that returns the waste pile
	this.getWastePile = function() {
		return this.waste;
	};

}