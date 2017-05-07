'use strict';

/********************************************
*************  Mom's spaghetti  *************
********************************************/

var mole;
mole = {
	runtimeOptions: {
		barType: 0,
		seedType: 0,
		potionType: 0
	},
	tabs : {
		'crafting'	: 'tab-container-bar-crafting',
		'farming'	: 'tab-container-bar-farming',
		'mining'	: 'tab-container-bar-mining',
		'shop'		: 'tab-container-bar-shop',
		'wc'		: 'tab-container-bar-woodcutting'
	},
	crafting : {
		furnaces : {
			stone : 'item-box-boundStoneFurnace'
		},
		bars : [
			{name: 'bronze', id: 'input-furnace-bronze-bar'},
			{name: 'iron', id: 'input-furnace-iron-bar'},
			{name: 'silver', id: 'input-furnace-silver-bar'},
			{name: 'gold', id: 'input-furnace-gold-bar'},
			{name: 'glass', id: 'input-furnace-glass'}
		],
		smeltAmount : 'input-smelt-bars-amount',
		smeltConfirm: 'dialogue-furnace-mats-needed-area',
		smeltingProgress: 'notif-smelting',
		smelt: function() {
			if(mole.getElement(mole.crafting.smeltingProgress).style.display !== 'none') { //Bars are in progress
				return;
			}
			mole.clickElement(mole.getElement(mole.crafting.furnaces.stone));
			mole.clickElement(mole.getElement(mole.crafting.bars[mole.runtimeOptions.barType].id));
			mole.getElement(mole.crafting.smeltAmount).value = 10;
			var i, children = mole.getElement(mole.crafting.smeltConfirm).childNodes;
			for (i = 0; i < children.length; i+=1) {
				if(children[i].localName === 'input') {
					mole.clickElement(children[i]);
				}
			}
		},
		changeBar: function () {
			mole.runtimeOptions.barType = (mole.runtimeOptions.barType + 1) % mole.crafting.bars.length;
			mole.getElement('smeltButton').innerHTML = mole.crafting.bars[mole.runtimeOptions.barType].name;
		}
	},
	farming : {
		patches : [
			{id: 'farming-patch-area-1', textId: 'farming-patch-text-1'},
			{id: 'farming-patch-area-2', textId: 'farming-patch-text-2'},
			{id: 'farming-patch-area-3', textId: 'farming-patch-text-3'},
			{id: 'farming-patch-area-4', textId: 'farming-patch-text-4'}
		],
		seeds : [
			{name: 'redshroom', id: 'dialogue-plant-redMushroomSeeds'},
			{name: 'dotted', id: 'dialogue-plant-dottedGreenLeafSeeds'}
		],
		farm : function () {
			var i;
			for(i = 0; i < 4; i += 1) {
				if(mole.getElement(mole.farming.patches[i].textId).innerHTML === 'Click to grow') {
					mole.clickElement(mole.getElement(mole.farming.patches[i].id));
					mole.clickElement(mole.getElement(mole.farming.seeds[mole.runtimeOptions.seedType].id));
				} else if(mole.getElement(mole.farming.patches[i].textId).innerHTML === 'Click to harvest') {
					mole.clickElement(mole.getElement(mole.farming.patches[i].id));
				}
			}
		},
		changeSeed: function () {
			mole.runtimeOptions.seedType = (mole.runtimeOptions.seedType + 1) % mole.farming.seeds.length;
			mole.getElement('seedButton').innerHTML = mole.farming.seeds[mole.runtimeOptions.seedType].name;
		}
	},
	brewing: {
		potions: [
			{name: 'sd pot', id: 'item-box-stardustPotion'}
		],
		potionProgress: 'notif-stardustPotionTimer',
		drink: function () {
			if(mole.getElement(mole.brewing.potionProgress).style.display !== 'none') { //Potion in progress
				return;
			}
			mole.clickElement(mole.getElement(mole.brewing.potions[mole.runtimeOptions.potionType].id));
			mole.clickElement(mole.getElement(mole.g.confirmButton));
		}
	},
	wc : {
		growthStatuses : [
			'wc-div-tree-lbl-1',
			'wc-div-tree-lbl-2',
			'wc-div-tree-lbl-3',
			'wc-div-tree-lbl-4'
		],
		trees : [
			'wc-div-tree-1',
			'wc-div-tree-2',
			'wc-div-tree-3',
			'wc-div-tree-4'
		],
		confirmBox : 'dialogue-loot',
		harvestTrees: function() {
			var i;
			for(i = 0; i < 4; i+=1) {
				if(mole.getElement(mole.wc.growthStatuses[i]).innerHTML === '(ready)') {
					mole.clickElement(mole.getElement(mole.wc.trees[i]));
					//confirmLogs();
				}
			}
		}
	},
	g : { //g for general
		confirmButton : 'dialogue-confirm-yes',
		effectBar : 'notifaction-area'
	},
	getElement: function(id) {
		return document.getElementById(id);
	},
	clickElement: function(element) {
		if (element.fireEvent) {
			element.fireEvent('onclick');
		} else {
			var evObj = document.createEvent('Events');
			evObj.initEvent('click', true, false);
			element.dispatchEvent(evObj);
		}
	},
	selectTab: function(tabName) {
		mole.clickElement(mole.getElement(mole.tabs[tabName]));
	},
	addNavPanel: function() {
		mole.prependHTML(mole.getElement(mole.g.effectBar), mole.navPanel);
	},
	prependHTML(element, text) {
		element.innerHTML = text + element.innerHTML;
	},
	main: function () {
		if(mole.getElement('smeltCheckbox').checked) {
			setTimeout(mole.crafting.smelt, 1000);
		}
		if(mole.getElement('seedCheckbox').checked) {
			setTimeout(mole.farming.farm, 1000);
		}
		if(mole.getElement('potionCheckbox').checked) {
			setTimeout(mole.brewing.drink, 1000);
		}
		setTimeout(mole.main, 5000);
	},
	navPanel: 
		'<span class="notif-box" style="height:50px;width:250px;">' +
			'<div style="display:inline">' +
				'<input type="checkbox" id="smeltCheckbox">' +
				'<button style="height:52px; width:55px; background:#FFFFFF" id="smeltButton" onclick="mole.crafting.changeBar()">' + 
					'bronze' + 
				'</button>' +
			'</div>' +
			'<div style="display:inline">' +
				'<input type="checkbox" id="seedCheckbox">' +
				'<button style="height:52px; width:75px; background:#FFFFFF" id="seedButton" onclick="mole.farming.changeSeed()">' + 
					'redshroom' + 
				'</button>' +
			'</div>' +
			'<div style="display:inline">' +
				'<input type="checkbox" id="potionCheckbox">' +
				'<button style="height:52px; width:55px; background:#FFFFFF" id="potionButton" onclick="">' + 
					'sd pot' + 
				'</button>' +
			'</div>' +
		'</span>'
};

setTimeout(function () {mole.addNavPanel();mole.main();}, 2000);

/*
	function confirmLogs() { //Timing problem as of now.
		var boxChildren = getElement(a.wc.confirmBox).childNodes;
		var i;
		for(i = 0; i < boxChildren.length; i+=1) {
			if(boxChildren[i].localName === 'input' && boxChildren[i].type === 'button') {
				clickElement(boxChildren[i]);
			}
		}
	}
*/