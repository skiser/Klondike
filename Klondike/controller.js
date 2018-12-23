/**
 * The controller class implements all of the logic required to
 * play a game of Klondike.  All of the data is represented
 * in a {@link KlondikeModel} object, and each controller method
 * takes a reference to the model object as a parameter. 
 */

function Controller() {
        // create all empty Piles
    console.log('Controller');
    
    this.model = new Model();
    this.copy = new Pile();
    
/**
    * Initialize the model object.
    * Should populate and shuffle the main deck, and then
    * deal cards from the main deck onto the seven tableau piles.
    * It should set the expose index of each tableau pile
    * so that only the top card is exposed.
    * It should set the expose index of the main deck so that
    * only the top card is exposed.
    * It should set the expose index of the waste pile so that
    * no cards can ever be exposed (i.e., set it to a high value,
    * such that even if it contains all 52 cards, none of them
    * would be exposed).
    * It should set the expose index of each foundation pile to 0.
    * 
    * @param model the {@link KlondikeModel} object to initialize
    **/
    
    this.initModel = function(model) {
        console.log('initModel');
        //populate and shuffle the main deck
        model.getMainDeck().populate();
        model.getMainDeck().shuffle();
        // backup copy of shuffled deck to restart game
        console.log(this.copy);
        this.copy.fullCopy(model.getMainDeck());
        this.copy.setExposedIndex(model.getMainDeck().getExposedIndex());
        console.log(this.copy);
        
        //deal cards from the main deck onto the seven tableau piles
        for (var i = 0; i < 7; i++) {
            model.getTableauPile(i).addCards(model.getMainDeck().removeCards(i+1));
            //set the expose index of each tableau pile so that only the top card is exposed
            model.getTableauPile(i).setExposedIndex(i);
        }
        
        // set the expose index of the main deck so that only the top card is exposed
        model.getMainDeck().setExposedIndex(model.getMainDeck().getIndexOfTopCard());
        
        //set the expose index of the waste pile so that no cards can ever be exposed
        model.getWastePile().setExposedIndex(52);
        
        //set the expose index of each foundation pile to 0
        for (var i = 0; i < 4; i++) {
            model.getFoundationPile(i).setExposedIndex(0);
        }
        this.model = model;
    };



    /**
    * <p>If the main deck is not empty, then remove the top card from the main deck
    * and add it to the waste pile.  If the main deck is empty, then all cards
    * should be moved from the waste pile back to the main deck.</p>
    * 
    * <p>Note: when the waste pile is recycled, it should move cards
    * back to the main deck such that they are in the same order in which
    * they originally occurred.  In other words, drawing all of the cards
    * from the main deck and then moving them back to the main deck
    * should result in the main deck being in its original order.</p>
    * 
    * <p>Before this method returns, it should check whether the
    * main deck is non-empty, and if it is non-empty, it should ensure
    * that the top card on the main deck is exposed.</p>
    * 
    * @param model the {@link KlondikeModel}
    */
    this.drawCardOrRecycleWaste = function() {
        console.log("drawCardOrRecycleWaste");
        // check is main deck is empty to recyle the waste pile  into main pile
        if (model.getMainDeck().isEmpty()) {
            //recycle waste pile
            console.log(model.getWastePile());
            numCards = model.getWastePile().getNumCards();
            // add cards from the waste pile to the main deck
            for (var i = 0; i < numCards; i++) {
                model.getMainDeck().addCard(model.getWastePile().getCard(model.getWastePile().getIndexOfTopCard()));
                model.getWastePile().removeCards(1);
            }
            
        } // main deck is not empty draw 1 card and put on waste pile
         else {
            model.getWastePile().addCard(model.getMainDeck().getTopCard());
            model.getMainDeck().removeCards(1);
        }
        // if main deck is not empty set exposed index to numcards -1 
        if (model.getMainDeck().isEmpty() == false) {
            model.getMainDeck().setExposedIndex(model.getMainDeck().getNumCards()-1);
        }
        
    };
    
    /**
	 * <p>Attempt to create a {@link Selection} that represents one
	 * or more {@link Card}s to be moved from a pile
	 * indicated by a {@link Location}.  The {@link Location} specifies
	 * which pile to move cards from, and which card or cards
	 * within the pile should be moved.  Note that this method
	 * must check to see whether the proposed move is legal:
	 * it should return <code>null</code> if it is not legal
	 * to move the card or cards indicated by the {@link Location}.</p>
	 * 
	 * <p>If the {@link Location} has {@link LocationType#MAIN_DECK} as
	 * its location type, then the main deck must not be empty,
	 * the selected card must be the top card on the main deck.
	 * </p>
	 * 
	 * <p>If the {@link Location} has {@link LocationType#TABLEAU_PILE}
	 * as its location type, then the {@link Location}'s card index
	 * must refer to a valid card, and the card index must be
	 * greater than or equal to the tableau pile's expose index.</p>
	 * 
	 * <p>It is not legal to move cards from the waste pile or from
	 * a foundation pile, so if the {@link Location}'s location type
	 * is {@link LocationType#WASTE_PILE} or {@link LocationType#FOUNDATION_PILE},
	 * then the method should return null.</p>
	 * 
	 * <p>If the move is legal, the indicated cards should be removed
	 * from the source pile (as indicated by the {@link Location}),
	 * and transfered into the {@link Selection} object returned from
	 * the method.
	 * 
	 * @param model   the {@link KlondikeModel}
	 * @param location the {@link Location} specifying which card or cards to move
	 * @return a {@link Selection} containing the cards to move and the
	 *         {@link Location}, or null if the {@link Location} does not
	 *         indicate a legal location from which cards can be moved
	 */
	
	this.select = function(location) {
		//check if location type is main deck
		if (location.getLocationType() == LocationType.MAIN_DECK) {
			//check if main deck has cards in it
			if (model.getMainDeck().isEmpty() == false) {
				//make sure the index of the location is equal to the index of the top card of the main deck
				if (location.getCardIndex() == model.getMainDeck().getIndexOfTopCard()) {
					//print in the console the removed card
					console.log(model.getMainDeck().removeCards(1));
//					return new Selection(location, model.getMainDeck().removeCards(1));
				}
			}
			//check if location type is tableau pile
		} else if (location.getLocationType() == LocationType.TABLEAU_PILE) {
			//check that the card Index is less than the number of cards in the tableau pile
			if (location.getCardIndex() < model.getTableauPile(location.getPileIndex()).getNumCards()) {
				//check if the card index is greater than or equal to the exposed index
				if (location.getCardIndex() >= model.getTableauPile(location.getPileIndex()).getExposeIndex()) {
//					ArrayList<Card> selectedCards = model.getTableauPile(location.getPileIndex()).removeCards(model.getTableauPile(location.getPileIndex()).getNumCards() - location.getCardIndex());
					console.log(selectedCards);
//					return new Selection(location,selectedCards);
				}
			}
			//returns null if location type is waste pile, foundation pile
		} else if ((location.getLocationType() == LocationType.WASTE_PILE) || (location.getLocationType() == LocationType.FOUNDATION_PILE)) {
			return null;
		}
		return null;
	};
    
    /**
    * <p>Determine whether it is legal to move the current {@link Selection} to a
    * destination pile indicated by a {@link Location}.</p>
    * 
    * <p>If the destination {@link Location} has {@link LocationType#FOUNDATION_PILE}
    * as its {@link LocationType}, then the {@link Selection} must contain a single card.
    * If the foundation pile is empty, then the selected card must be an {@link Rank#ACE}.
    * If the foundation pile is not empty, then the selected card must have the same suit
    * as the top card on the foundation pile, and the ordinal value of its {@link Rank} must
    * be one greater than the top card on the foundation pile.</p>
    * 
    * <p>If the destination {@link Location} has {@link LocationType#TABLEAU_PILE}
    * as its {@link LocationType}, then:
    * <ul>
    *   <li>If the destination tableau pile is empty, the bottom card of the {@link Selection}
    *   must be {@link Rank#KING} </li>
    *   <li>If the destination tableau pile is not empty, the bottom card of the {@link Selection}
    *   must have a {@link Suit} that is a different {@link Color} than the top card of the
    *   tableau pile, and the bottom card of the {@link Selection} must have an
    *   {@link Rank} whose ordinal value is one less than the ordinal value of the
    *   top card of the tableau pile.</li>
    * </ul>
    * </p>
    * 
    * <p>If the destination {@link Location} has {@link LocationType#MAIN_DECK} or
    * {@link LocationType#WASTE_PILE} as its {@link LocationType}, then the move is not legal.</p>
    * 
    * <p>
    * Note that this method just checks to see whether or not a move would
    * be legal: it does not move any cards.
    * </p>
    * 
    * @param model      the {@link KlondikeModel}
    * @param selection  the {@link Selection}
    * @param dest       the destination {@link Location}
    * @return true if the move is legal, false if the move is not legal
    */

    this.allowMove = function(selection, dest) {
    console.log('allowMove');
    console.log(dest);
        // if destination is a foundation pile
        if (dest.locationType == LocationType.type[1]) {
        // if selection to be moved only has 1 card
            if (selection.getNumCards() == 1) {
                // get destination foundation pile
                var pile = model.getFoundationPile(dest.getPileIndex());
                // if foundation pile is empty
                if (pile.getNumCards() == 0 ) {
                    // get cards to be moved
                    var cards = selection.getCards();
                    
                    console.log(CardType.ranks[0]);
                    // rank of card to be moved must be ace
                    if (cards[0].getRank() == "ace") {
                        return true;
                    } else {
                        return false;
                    }
                    
                } // foundation pile is not empty 
                else {
                // get top card from foundation pile
                    var topCard = model.getFoundationPile(dest.getPileIndex()).getTopCard();
                    // get card to be moved
                    var cards = selection.getCards();
                    // make sure card is same suit as foundation pile
                    if (cards[0].getSuit() == topCard.getSuit()) {
                        console.log(Ranks[cards[0].getRank()] - Ranks[topCard.getRank()]);
                        // make sure rank of cared is 1 more that top card of foundation pile
                        if (Ranks[cards[0].getRank()] - Ranks[topCard.getRank()] == 1) {
                            return true;
                        } else {
                            return false;
                        }    
                    } // suit of card doesn't match foundation pile
                    else {
                        return false;
                    }

                }
            }
        } // destination is a tableau pile 
        else if (dest.locationType == LocationType.type[2]) {
            console.log("tableau");
            // if the tableau pile is empty
            if (model.getTableauPile(dest.getPileIndex()).isEmpty() == true) {
                // get the cards to be moved
                var cards = selection.getCars();
                console.log(cards[0].getRank());
                // make sure bottom card of selections is a king
                if (cards[0].getRank() == "king") {
                    return true;
                } else {
                    return false;
                }
            } // tableau pile is not empty 
            else {
                 // get cards to more
                var cards = selection.getCards();
                // bottom card of selection is not the same as the top card on the tableau pile
                if (cards[0].getColor() != model.getTableauPile(dest.getPileIndex()).getTopCard().getColor()) {
                    // rank of top card on tableau pile is 1 move the bottom card of selections
                    if (Ranks[model.getTableauPile(dest.getPileIndex()).getTopCard().getRank()] - Ranks[cards[0].getRank()] == 1) {
                        return true;
                    } else {
                        return false;
                    }
                } // bottom card of selection is the same as the top card on the tableau pile
                 else {
                    return false;
                }
            }
        } // destination can not be main or waste pile 
        else if ((dest.getLocationType() == LocationType.type[0]) || (dest.getLocationType() == LocationType.type[3])) {
            return false;
        }
        return false;    
    };

    /**
     * <p>Move the cards in a {@link Selection} onto a pile as indicated
     * by the destination {@link Location}.</p>
     * 
     * <p>The method does <em>not</em> need to check whether or not the move is legal:
     * it can assume that the {@link #allowMove(KlondikeModel, Selection, Location)}
     * method has already determined that the move is legal.</p>
     * 
     * <p>
     * <strong>Important</strong>: If the pile that the selected cards
     * were taken from is non-empty, and if its top card is not exposed,
     * then its top card should be exposed.
     * </p>
     * 
     * <p>
     * Note that the expose index of the destination pile should not change.
     * </p>
     * 
     * @param model      the {@link KlondikeModel} 
     * @param selection  the {@link Selection} containing the selected cards
     * @param dest       the destination {@link Location}
     */
     this.moveCards = function(selection, dest) {
         console.log("moveCards");
     
         //Move the cards in a Selection onto a pile as indicated by the destination Location
         // if the destinatin is a tableau pile
         if (dest.getLocationType() == LocationType.type[2]) {
             console.log("tabeau");
             // get the tableau pile
             var pile = model.getTableauPile(dest.getPileIndex());
             // add the selection cards to the tableau piel
             pile.addCards(selection.getCards());
             console.log(pile);
         } // if the destination is a foundation piel
          else if (dest.getLocationType() == LocationType.type[1]) {
              // get the foundation piel
             var pile = model.getFoundationPile(dest.getPileIndex());
             // add the cards to the foundation pile
             pile.addCards(selection.getCards());
         }
         //If the pile that the selected cards were taken from is non-empty, 
         //and if its top card is not exposed, then its top card should be exposed.
         // if the cards was taken from the main deck sset the expose index the be the top cards
         if (selection.getOrigin().getLocationType() == LocationType.type[0]) {
             if (model.getMainDeck().getIndexOfTopCard() < model.getMainDeck().getExposeIndex() ) {
                 model.getMainDeck().setExposeIndex(model.getMainDeck().getIndexOfTopCard());
             }    
         } // if the location type is the tableau pile set the exposed index
         else if (selection.getOrigin().getLocationType() == LocationType.type[2]) {
             if (model.getTableauPile(selection.getOrigin().getPileIndex()).getNumCards() <= model.getTableauPile(selection.getOrigin().getPileIndex()).getExposedIndex()) {
                 model.getTableauPile(selection.getOrigin().getPileIndex()).setExposedIndex(model.getTableauPile(selection.getOrigin().getPileIndex()).getIndexOfTopCard());
             }
         }
     };
    
    /**
    * "Undo" a selection by moving cards from a {@link Selection} object
    * back to the pile they were taken from, as indicated by the
    * selection's origin {@link Location}.  For example, if the location
    * indicates that the selection's cards were taken from a tableau
    * pile, then they should be moved back to that tableau pile.
    * 
    * @param model      the {@link KlondikeModel}
    * @param selection  the {@link Selection} to undo
    */
    this.unselect = function(selection) {
        //selection by moving cards from a {@link Selection} object back to the pile they were take
        console.log("unselect");
        // if the cards were take from the tableau pile
        if (selection.getOrigin().getLocationType() == LocationType.type[2]) {
            // put the cards bake where they came from
            model.getTableauPile(selection.getOrigin().getPileIndex()).addCards(selection.getCards());
        }    // if the cards were taken from the waste pile
         else if (selection.getOrigin().getLocationType() == LocationType.type[3]) { 
            // put the cards bake where they came from
            model.getWastePile().addCards(selection.getCards());
        }
    }
}