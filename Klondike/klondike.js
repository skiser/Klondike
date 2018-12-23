/**
 * Klondike Solitaire is a game known by many names: patience, klondike, classic solitaire. 
 * Just like regular solitaire, the goal is to get all 52 cards into the four foundations at the top. 
 * Cycle through the deck and remove cards to build stacks of cards in the tableau.
 * This version is more difficult, because its best to pay attention to the order of cards in the deck 
 * as you cycle through them: every time you remove a card from the deck, you rearrange the order of the waste.
 * Though the strategy of solitaire is debatable, it is agreed that flipping over the backward-facing cards 
 * in the tableau as quickly as possible serves advantage. 
 */

// global variables to include offset of card pile and padding between cards
var Sol = {
        __description__: 'A klondike game in HTML, CSS and JavaScript.\n \nFor now it follows the simplest Klondike rules: turn one card at a time, with no limit on passes through the deck.',
        __version__: 0.1,
        __author__: 'Samantha Kiser',
        __releasedate__: '2018-03-05',

    leftOffset: 20, // normal space between objects on the board
    topOffset: 10,
    padding: 2, // normal padding inside an object
    margin: 10,
    cardWidth: 80,
    cardHeight: 116,
    foundationLeftOffset: 180,
    tableauTopOffset: 160,
    horizontalPileSpacing: 110,
    verticalCardSpacing: 24,
    zIndex: 51, // initialize zIndex so we can always put cards on top of each other
    moves: 0 // number of moves in current game
 
};


// create and shuffle a new deck of cards
var model = new Model();
console.log(model);
// crate a controller to interact with the model
var controller = new Controller();
console.log(controller);
// initialize the controller
controller.initModel(model)
// boolean to initialize the tool bar
var tools = false;


// create the widnow document
window.document.addEventListener("DOMContentLoaded", function() {
// draw the game board  
    startGame(model);
// play the game of solitare   
    playGame(model);
});

function startGame(model) {
    // sets up a game and starts it

    console.log("startGame");
    // create the board
    var board = document.getElementById('board');   
      
      // if the tools haven't been added  
    if (tools == false) {   
        // add the tools
        addTools();
        tools = true;
    }
    // add the move counter
    addMoves();
     
     // draw the piles of cards on the board
    drawBoard(model);


}

function addTools() {
    // adds  redeal buttons
    var board = document.getElementById('board');
    var node = document.createElement('div');
    node.setAttribute('id', 'tools');
    board.appendChild(node);
    
    // create a button to make a new game
    btn = document.createElement('button');
    textButton = document.createTextNode("New");
    btn.setAttribute('id','redeal');
    btn.setAttribute('title','Shuffle the deck and start a new game');
    btn.appendChild(textButton);
    document.getElementById('tools').appendChild(btn);
    btn.addEventListener("click", redeal);
    
    // create a button to display the rules of the game
    btn = document.createElement('button');
    textButton = document.createTextNode("Rules");
    btn.setAttribute('id','rules');
    btn.setAttribute('title','Instructions on how to play the game');
    btn.appendChild(textButton);
    document.getElementById('tools').appendChild(btn);
    btn.addEventListener("click", rules);
    
    // create a button to display a panel about the game
    btn = document.createElement('button');
    textButton = document.createTextNode("About");
    btn.setAttribute('id','about');
    btn.setAttribute('title','About this game');
    btn.appendChild(textButton);
    document.getElementById('tools').appendChild(btn);    
    btn.addEventListener("click", about);
   
    console.log('addTools');
}

function addMoves() {
    // adds a number of moves to the board
    Sol.moves = 0; // reset moves
    console.log('addMoves');
    // create a text to display the number of moves
    var board = document.getElementById('board');
    var node = document.createElement('div');
    node.setAttribute('id', 'moves');
    var text = document.createTextNode("Moves: " + Sol.moves);
    node.appendChild(text);
    board.appendChild(node);
}

function drawBoard(model) {
	console.log('drawBoard');
	var board = document.getElementById('board');
    addFoundation(model);
    addTableau(model);
    addMainWaste(model.getMainDeck());
}

function addFoundation(model) {
    // adds the foundation beds, where the cards end up sorted by suit and ascending from Ace
	console.log('addFoundation');
	// remove  foundation piles if exists
    var fnd = document.getElementById('foundation');
    if (fnd != null) {
        fnd.parentNode.removeChild(fnd);
    }
    // create the foundation element to put the foundation piles into    
    var board = document.getElementById('board');
    var fnds = document.createElement('div');
    fnds.setAttribute('id', 'foundation');
    
    // for each of the foundation piles
    for (var i = 0; i < 4; i++ ) {
         // calculate the position of the foundation pile
         var position = Sol.foundationLeftOffset + (Sol.cardWidth+Sol.margin)*i + Sol.horizontalPileSpacing;
         var node = document.createElement('div');
         var node = document.createElement('div');
         // set the attribute for each pile
         node.setAttribute('class', 'bed');
         node.setAttribute('title', 'Foundation');
         node.setAttribute('id', 'foundation_' + i);
         node.setAttribute('style', 'top: ' + Sol.margin + 'px; left: ' + position + 'px;');
         // get the foundation pile
         var pile = model.getFoundationPile(i);
         // if the foundation pile has cards 
         if (pile.getNumCards() > 0) {
             // get the top card to display
             var card = pile.getTopCard();
             console.log(card);
             // set the image of the topcards
             var img = document.createElement('img');
             img.src = 'img/' + pile.getTopCard().rank + '_of_' + pile.getTopCard().suit + '.png';          
             node.appendChild(img);  
         }
         // append the foundation pile into the foundation element
        fnds.appendChild(node);              
    }
    console.log(fnds);
    // append the foundation element into the board
    board.appendChild(fnds);
    
}


function addTableau(model) {
    // add the playing area beds, where the cards are dealt
    console.log('addTableau');
    // remove tableau pile is exists
    var tab = document.getElementById('tableau');
    if (tab != null) {
        tab.parentNode.removeChild(tab);
    }    
    // create a tableau element to hold all the tableau piles
    var board = document.getElementById('board');
    var tabs = document.createElement('div');
    tabs.setAttribute('id', 'tableau');
    // for each of the tableau piles
    for (var i=0; i<7; i++ ) {
        // if the tableau pile exists remove it 
        var tab = document.getElementById('tableau_' + i + '_0');
        if (tab != null) {
            tab.parentNode.removeChild(tab);
        }
        // get the tableau pile
        var pile = model.getTableauPile(i);
        // set the position of the pile
        var positionX = (Sol.cardWidth+Sol.margin)*i + Sol.leftOffset;
        // draw an empty pile
        if (pile.getNumCards() == 0) {
        		var positionY = Sol.cardHeight + Sol.verticalCardSpacing;
            var node = document.createElement('div');
            node.setAttribute('class', 'bed');
            node.setAttribute('title', 'Tableau');
            node.setAttribute('id', 'tableau_' + i);
            node.style.left = positionX + 'px';
            node.style.top = positionY + 'px';
            Sol.zIndex +=1;
            node.style.zIndex = Sol.zIndex;
            // append the empty piel to the tableau element
            tabs.appendChild(node);              
         
            console.log(node);
            // the tableau pile is not empty
        } else {
              // for each of the cards in the pile
              for (var cardIndex = 0; cardIndex < pile.getNumCards(); cardIndex++) {
                  // calculate the y position of the card
                  var positionY = Sol.cardHeight + Sol.verticalCardSpacing + cardIndex*Sol.margin;
                  // create a element to display the card
                  var node = document.createElement('div');
                  node.setAttribute('class', 'card');
                  node.setAttribute('title', 'Tableau');
                  node.setAttribute('id', 'tableau_' + i + '_' + cardIndex);
                  node.style.left = positionX + 'px';
                  node.style.top = positionY + 'px';
                  Sol.zIndex +=1;
    
                  node.style.zIndex = Sol.zIndex;
                  // if the card is exposed
                  if (cardIndex >= pile.getExposedIndex()) {
                      // get the image of the card
                      var img = document.createElement('img');
                      img.src = 'img/' + pile.getCard(cardIndex).rank + '_of_' + pile.getCard(cardIndex).suit + '.png';          
                  }// the card is not exposed
                  else {
                  // get the image of the back of the card
                      var img = document.createElement('img');
                      img.src = 'img/' + 'back-sm' + '.png';                
                  }
                  // append the image to the card
                  node.appendChild(img);  
                  // append the card to the tableau  
                  tabs.appendChild(node);              
              }
        }
        // append the tableau element to the boards
        board.appendChild(tabs);              
     }
}


function addMainWaste(main) {
     // remove the main and waste beds
     // if the main document exists, delete it
     var main = document.getElementById('main');
     if (main != null) {
         main.parentNode.removeChild(main);
     }    
     // if the waste document exist, delete it
     var waste = document.getElementById('waste');
     if (waste != null) {
        waste.parentNode.removeChild(waste);
     }
        
    // add the main and waste beds
    for (var i=0; i<2; i++ ) {
    // calculate the position of the pile
        var position = (Sol.cardWidth+Sol.margin)*i + Sol.leftOffset;
        var board = document.getElementById('board');
        // create the pile
        var node = document.createElement('div');
        // if the bed is main set the id
        if (i == 0) {
            var thisId = 'main';
            node.setAttribute('class', 'card');
        } else { // if the bed is waste set the id
            var thisId = 'waste';
            node.setAttribute('class', 'bed');
        }
        node.setAttribute('title', thisId);
        node.setAttribute('id', thisId);
        node.setAttribute('style', 'top: ' + Sol.margin + 'px; left: ' + position + 'px;');
        // append the bed to the board
        board.appendChild(node);
        var bed = document.getElementById(thisId);
         
        console.log('in addMainWaste(); ' + thisId + ' - ' + bed.offsetLeft + ', ' + bed.offsetTop);  
    }
}


 function redeal() {
     // reshuffles the deck and deals a new hand
    console.log('redeal');
    // create a new model
    model = new Model();
    // initializze the model to the controller
    controller.initModel(model)
    // draw the game board
    startGame(model);
    Sol.moves = 0;
    // play the game
    playGame(model);
    notify('You started a new game.');

 }
   
 function rules() {
    // adds an overlay with instructions on how to play the game
    console.log('rules');
    var board = document.getElementById('board');
    // create the rules pane
    var body = document.createElement('body');
    body.setAttribute('id', 'rules_pane');

    body.remove();
    // push the rules of the klondike game to display in the panel
    var output = [];
    output.push('<div id="rules_pane" title="Click on this pane to close it.">');
    output.push('<h2>Instructions</h2>');
    output.push('<ul>');
    output.push('<li>The object is to move all the cards face-up into the <strong>foundation</strong> (the four empty beds on the top right of the board) in ascending order by suit.</li>');
    output.push('<li>The <strong>stock</strong> is the pile of face-down cards in the top left corner.</li>');
    output.push('<li>The <strong>waste</strong> is the spot next to the deck where you can turn cards up.</li>');
    output.push('<li>The <strong>playing area</strong> is the seven groups of cards along the bottom.</li>');
    output.push('<li>Click-and-hold to drag a face-up card on top of another card or into an empty bed.</li>');
    output.push('<li>Only an Ace can go onto an empty foundation bed.</li>');
    output.push('<li>Only a King can go onto an empty playing area bed.</li>');
    output.push('<li>You can only drag a face-up card onto another face-up card in the playing area if the card beneath is the opposite colour and the next number up. E.g. you can drag a 5 of hearts onto a 6 of clubs.</li>');
    output.push('<li>Click a face-down card in the stock to turn it over into the waste. Cards in the stock turn over one at a time, with no limit on passes through the deck.</li>');
    output.push('<li>Click the empty stock to turn the cards back from the waste.</li>');
    output.push('<li>Click a face-fown card in the playing area to turn it over, as long as there is no card on top of it.</li>');
    output.push('<li>Double-click a card to move it onto the foundation automatically if it can go there.</li>');
    output.push('<li>If you want to start over with the same hand, click the "Restart" button.</li>');
    output.push('<li>If you want to shuffle and redeal the cards, click the "New Game" button.</li>');
    output.push('</ul>');
    // join all the rules into html
    body.innerHTML = output.join('\n');
    // append the rules to the board
    board.appendChild(body);
    // attach eventlistener to remove the panel on a click
    body.addEventListener('click',function() {            
        body.remove();
    });

}    
        
function about() {
	// adds an overlay explaining about the game
    var board = document.getElementById('board');
   var body = document.createElement('body');
   body.setAttribute('id', 'rules_pane');

   body.remove();
   var output = [];
   // push the about information of the klondike game to display in the panel
   output.push('<div id="about_pane" title="Click on this pane to close it.">');
   output.push('<h2>About this Game</h2>');
   output.push('<p>' + Sol.__description__.replace('\n', '<br>') + '</p>');
   output.push('<ul>');
   output.push('<li>Author: ' + Sol.__author__ + '</li>');
   output.push('<li>Version: ' + Sol.__version__ + ', released ' + Sol.__releasedate__ + '</li>');
   output.push('</ul>');
   output.push('</div>');
   // join all the rules into html
   body.innerHTML = output.join('\n');
   // append the rules to the board
   board.appendChild(body);
   // attach eventlistener to remove the panel on a click
   body.addEventListener('click',function() {            
       body.remove();

   });
}

function playGame(controller, model) {
	 // main function to enable game play
     console.log('playGame');
     notify('playGame');
     // attachHandlers to the card to drag and click the cards
     attachHandlers(controller, model);
     
        
}
 
function attachHandlers(model) {
     // attaches event handlers to cards by index
     // primary use is inside the main loop in playGame(); 
     console.log('in playGame(); Card in main: ');
     // handle cards that are in main deck
     var main = document.getElementById('main');
     // add a handler on click to turn Main card onto waste
     main.addEventListener("click",turnMain);
     console.log(main);
      
     console.log('in playGame(); Card in tableau: ');
     // handle cards that are in tableau
     for (var i = 0; i < 7; i++) {
         // get the tableau pile
         var tableauPile = model.getTableauPile(i);
         // get the tableau element on the board
         var tableauCard = document.getElementById('tableau_' + i + '_0');
         //console.log(tableauPile.getIndexOfTopCard());
         // for each card in the pile except the top card make clickable
         for (var j = 0; j < tableauPile.getIndexOfTopCard(); j++) {
            tableauCard.addEventListener("click",flipCard);
            tableauCard = tableauCard.nextElementSibling
         }
         // the top card if the pile is not empty is draggable
         if (tableauCard != null) { 
            makeDraggable(tableauCard);    
        }
     };
}

function makeDraggable(elem) {
	// implements the functionality to make a card draggable
     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // make the element draggable and set the functions on start and end 
    elem.draggable = true;
    elem.ondragstart = dragMouseStart;
    elem.ondrag = dragMouse;
    elem.ondragend = dragMouseEnd;
  
    var selection = null;         
    // adds an event handler to  start dragging a card
    var selectednode = null;
    // function to handle a ondragstart event on a card
    function dragMouseStart(e) {
    console.log('dragMouseStart');
    // allow effect data transfer on the start of mouse move
    e.dataTransfer.effectAllowed = 'move'
    // drop effect on start of mouse move
    e.dataTransfer.dropEffect = 'move';

    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    console.log(pos3 + " " + pos4);
    // get the element from the mouse position
    var node = document.elementFromPoint(pos3, pos4);
    // get the parent node of the elemnt  
    node = node.parentNode;
      console.log(node);
      // create a selection to hold the cards to be moved
    selection = getSelection(node);
    selectednode = node;
    document.dragend = dragMouseEnd;
    
  }
  
     // adds an event handler for dragging a card
  function dragMouse(e) {
    console.log('dragMouse');
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elem.style.top = (elem.offsetTop - pos2) + "px";
    elem.style.left = (elem.offsetLeft - pos1) + "px";
  }
  
// adds an event handler to end dragging a card 
  function dragMouseEnd(e) {
     console.log('dragMouseEnd ');
     console.log(e);
     
     e.dataTransfer.dropEffect = 'move';
     e.stopPropagation();
     e.preventDefault();

     /* stop moving when mouse button is released:*/
     console.log('implement what happens when you release mouse');  
     console.log('test if the move is legal');  
     console.log(selection);
     // calculate the new cursor position:
     pos1 = pos3 - e.clientX;
     pos2 = pos4 - e.clientY;
     pos3 = e.clientX;
     pos4 = e.clientY;

     // get the element from the mouse position
     var node = document.elementFromPoint(pos3, pos4);
    
     // get the parent element for element unless empty
     if (node.className == "bed") {
         
     } else {       
       node = node.parentNode;
     }
     // create the destination location for the cards
     var dest = setDestination(node);
    
     // determine if a move is allowed
     if (controller.allowMove(selection, dest) == true){ 
         // move the cards within the model
    	     controller.moveCards(selection, dest);    
         console.log(selectednode);
         // remove the selected cards from the board
         selectednode.parentNode.removeChild(selectednode);
         // redraw the board based from the model
         drawBoard(model);
         // reattach the handlers based on the model
         attachHandlers(model);
         // update the number of moves
         Sol.moves += 1;
         updateMoves(Sol.moves);   
   } else {
         // unselect the cards not allowed to move
	    controller.unselect(selection);
        // remove the selected cards from the board            
        selectednode.parentNode.removeChild(selectednode);
        // redraw the board based from the model
        drawBoard(model);
        // reattach the handlers based on the model
        attachHandlers(model);
   }
    document.onmouseup = null;
    document.onmousemove = null;
  }    
}
 
 function turnMain() {
     // turn a card over from main to stock
	 var board = document.getElementById('board');
     console.log('turnMain');
     // update moves
     Sol.moves += 1;
     updateMoves(Sol.moves);

     console.log(model);
 
     var thisId = this.id;
     // first, get the id of the waste
     var thisWaste = document.getElementById('waste');
     var thisZindex = document.defaultView.getComputedStyle(thisWaste,null).getPropertyValue('z-index');
     console.log(thisId + ' ' + thisWaste + ' ' + thisZindex);
     
     if (thisZindex == 'auto') {
         thisZindex = 1;
     } else {
         thisZindex = parseInt(thisZindex)+1;
     }
     
     // now update the card properties in the deck
     controller.drawCardOrRecycleWaste();
     wasteCard = model.getWastePile().getTopCard();
        
     var node = document.createElement('div');
     node.setAttribute('class', 'card');
     node.setAttribute('title', 'Waste');
     node.setAttribute('id', 'waste_' + model.getWastePile().getNumCards());
     node.style.left = Sol.cardWidth+Sol.margin + Sol.leftOffset + 'px';
     node.style.top = Sol.margin + 'px';
     node.style.zIndex = thisZindex;   
              
     var img = document.createElement('img');
     
     img.src = 'img/' + wasteCard.rank + '_of_' + wasteCard.suit + '.png';

     node.appendChild(img);
     board.appendChild(node);
              
     if (model.getMainDeck().isEmpty()) {
         var main = document.getElementById('main');
         main.parentNode.removeChild(main);
     }
     
     makeDraggable(node);
     
     notify('You moved the ' + wasteCard.rank + ' of ' + wasteCard.suit + ' from the main to the waste.');    

 
 }
 
 function flipCard(e) {
    // this flips over a turned-down card in the play area
    //update moves
    Sol.moves += 1;
    updateMoves(Sol.moves);
    //get the position
    console.log('pos ' + e.clientX + " " + e.clientY);
    var node = document.elementFromPoint(e.clientX, e.clientY);    
    console.log(node);
    node = node.parentNode;
    console.log(node);
    // make sure there aren't any cards on top of this card
    var pile = getPile(node);
    console.log(pile);
    var card = pile.getTopCard();
    console.log(card);
    //get the img
    var img = document.createElement('img');
    //picture   
    img.src = 'img/' + card.rank + '_of_' + card.suit + '.png';
    //replace the card and flip it
    node.replaceChild(img,node.childNodes[0]);
    makeDraggable(node);
 
}

function setDestination(node) {
   // creates a location object to represent the destination of a move
   var destination = new Location();
   //check if the node is in the tableau
   if (node.id.substr(0,7) == 'tableau') {
       console.log(node);
       //set type
       destination.setLocationType(LocationType.type[2]);
       //set pileIndex
       var pileIndex = node.id.substr(8,1);
       destination.setPileIndex(pileIndex);
       //set pile
       var pile = model.getTableauPile(pileIndex);
       console.log(pile);
       //set the cardIndex with the exposed index
       destination.setCardIndex(pile.getExposedIndex());
  } else {
	  //check if nide is in foundation
      if (node.id.substr(0,10) == 'foundation') {
    	  	//set type
    	  	destination.setLocationType(LocationType.type[1]);
    	  	//set pileIndex
    	  	var pileIndex =  node.id.substr(11,1);
    	  	destination.setPileIndex(pileIndex);
    	  	//set pile and cardIndex
    	  	var pile = model.getFoundationPile(pileIndex);
    	  	destination.setCardIndex(pile.getIndexOfTopCard());          
       }
  }              
  return destination;
}


function getSelection(node) {
	// creates a selection object to represent the cards that were selected to move
    //cards and origin variable for location and array
	var cards = new Array();
    var origin = new Location();
    console.log(node);
    if (node.id.substr(0,7) == 'tableau') {
    		//check if node is in tableau
    		//set location type
    		origin.setLocationType(LocationType.type[2]);
    		//set pileIndex
        var pileIndex = node.id.substr(8,1);
        origin.setPileIndex(pileIndex);
        //set pile and cardIndex
        var pile = model.getTableauPile(pileIndex);
        origin.setCardIndex(pile.getExposedIndex());
        //set cards array
        var cards = pile.removeCards(pile.getNumCards() - pile.getExposedIndex());
        console.log(cards);
    } else {
    		//check if node is in waste
    		if (node.id.substr(0,5) == 'waste') {
    			//set location type
    			origin.setLocationType(LocationType.type[3]);
    			//set pileIndex
    			var pileIndex = 0;
            origin.setPileIndex(pileIndex);
            //set pile and cardIndex
            var pile = model.getWastePile();
            origin.setCardIndex(pile.getIndexOfTopCard()); 
            console.log(pile.getIndexOfTopCard());
            //set cards array
            var cards = pile.removeCards(1);
            console.log(cards);
    		}
    }
    //set selection and return it
    var selection = new Selected(origin, cards);
    return selection;

} 

function getPile(node) {
	// determines the pile that the mouse is pointing to 
    //intitialize pile is null
	var pile = null;
	//check if node is tableau
    if (node.id.substr(0,7) == 'tableau') {
    		//set pileIndex and pile
    		var pileIndex = node.id.substr(8,1); 
        var pile = model.getTableauPile(pileIndex);
    } else {
    		//check is node is waste
        if (node.id.substr(0,5) == 'waste') {  
        		//set pileIndex and pile
            var pileIndex = 0;                 
            var pile = model.getWastePile();
        }
   }
   return pile;
}


function restoreStock() {
    // returns all the cards from the waste back into the stock
    Sol.zIndex = 0;
    //initialize cardsLeft and totalCards
    var cardsLeft = true;
    var totalCards = 0;
    //while loop for cardsLeft
    while (cardsLeft == true) {
    		//intialize elem variable
        var elem = document.elementFromPoint(88, 20); //
        //check if elem.id is waste
        if (elem.id == 'waste') {
        		//change cardsLeft to false
            cardsLeft == false;
            break;
        } else {
        		//increment total cards and index
            totalCards +=1;
            Sol.zIndex +=1;
            //intialize thisId
            var thisId = parseInt(elem.id.replace('card-', ''));
            //positionX, and Y, index, location and face
            Sol.deck[thisId].posX = 10;
            Sol.deck[thisId].posY = 10;
            Sol.deck[thisId].zIndex = Sol.zIndex;
            Sol.deck[thisId].location = 'stock';
            Sol.deck[thisId].face = 'down';
        }
    }
    //check if totalcards is 0 
    if (totalCards == 0) { // nothing left in the waste
        notify('There are no cards left to restore from the waste.');
    } else {
        notify('You restored the cards from the waste to the stock.');
    }
    addHistory(Sol.deck);
}
 
function notify(message) {
     // sends a message to the notification area
     var notification = document.getElementById('notification');
     notification.innerHTML = message;
}

function updateMoves(newval) {
    // updates the moves notification    
    var moves = document.getElementById('moves');
    //check if theres a move
    if (moves != null) {
        moves.parentNode.removeChild(moves);
    }
    var board = document.getElementById('board');
    var node = document.createElement('div');
    node.setAttribute('id', 'moves');
    var textButton = document.createTextNode("Moves: " + newval);
    node.appendChild(textButton);
    board.appendChild(node);
    console.log('moves=' + newval);
}