/**
 * 
 */

//identify the different types of identifying card parts
var CardType = {
	//identify the different suits possible
    suits: 'hearts diamonds clubs spades'.split(' '),
    //identify the different ranks possible
    ranks: 'ace 2 3 4 5 6 7 8 9 10 jack queen king'.split(' '),
}

//identify what the ranks are equal to number wise
const Ranks = {
ace:0,
 2:1,
  3:2,
   4:3,
    5:4,
     6:5,
      7:6,
       8:7,
        9:8,
         10:9,
          jack:10,
           queen:11,
            king:12
}

//function called card with parameters rank and suit
function Card(rank, suit) {
	//identify rank as rank and suit as suit
    this.rank = rank;
    this.suit = suit;
    //set initial color to red
    this.color = 'red';
    //if the suit is clubs or spades change the color to black
    if ((suit == 'clubs') || (suit == 'spades')) {
        this.color = 'black';
    }
    //function that returns the card
    this.getCard = function() {
            return card;
    };
    //function that returns the rank
    this.getRank = function() {
            return this.rank;
    };
    //function that returns the suit
    this.getSuit = function() {
            return this.suit;
    };
    //function that returns the color
    this.getColor = function() {
            return this.color;
    };   
}