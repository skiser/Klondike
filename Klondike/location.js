/**
 * 
 */
//identify the types of locations possible
var LocationType = {
	    type: 'MAIN_DECK FOUNDATION_PILE TABLEAU_PILE WASTE_PILE'.split(' '),

}

//function for location involvind locationtype, pileindex, and cardindex
function Location(locationType, pileIndex, cardIndex) {
	//set each paramter to the corresponding this
	this.locationType = locationType;
	this.pileIndex = pileIndex;
	this.cardIndex = cardIndex;
	
	//set parameter locationType to this.locoation type
	this.setLocationType = function(locationType) {
		this.locationType = locationType;
	};
	
	//get the locationType
	this.getLocationType = function() {
		return this.locationType;
	};
	
	//set parameter pile index to this.pileIndex
	this.setPileIndex = function(pileIndex) {
		this.pileIndex = pileIndex;
	};
	
	//get the pileIndex
	this.getPileIndex = function() {
		return this.pileIndex;
	};
	
	//set parameter card Index to this.cardIndex
	this.setCardIndex = function(cardIndex) {
		this.cardIndex = cardIndex;
	};
	
	//get the cardIndex		
	this.getCardIndex = function() {
		return this.cardIndex;
	};
}