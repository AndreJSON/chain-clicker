'use strict';

/********************************************
*************  Mom's spaghetti  *************
********************************************/

var mole;
mole = {
	active: {
		bars: false
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
		bars : {
			bronze : 'input-furnace-bronze-bar'
		},
		smeltAmount : 'input-smelt-bars-amount',
		smeltConfirm: 'dialogue-furnace-mats-needed-area',
		smeltingProgress: 'notif-smelting',
		smelt: function() {
			mole.clickElement(mole.getElement(mole.crafting.furnaces.stone));
			mole.clickElement(mole.getElement(mole.crafting.bars.bronze));
			mole.getElement(mole.crafting.smeltAmount).value = 10;
			var i, children = mole.getElement(mole.crafting.smeltConfirm).childNodes;
			for (i = 0; i < children.length; i+=1) {
				if(children[i].localName === 'input') {
					mole.clickElement(children[i]);
				}
			}
		}
	},
	farming : {
		patches : [
			'farming-patch-area-1',
			'farming-patch-area-2',
			'farming-patch-area-3',
			'farming-patch-area-4'
		],
		seeds : {
			redMushroom : 'dialogue-plant-redMushroomSeeds'
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
		confirmBox : 'dialogue-confirm',
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
		mole.prependHTML(mole.getElement(mole.g.effectBar), '<span class="notif-box" style="height:50px;width:50px;"><button style="height:52px;background:#FFFFFF" onclick="mole.active.bars=!mole.active.bars">Bronze</button></span>');
	},
	prependHTML(element, text) {
		element.innerHTML = text + element.innerHTML;
	},
	main: function () {
		if(mole.active.bars && mole.getElement(mole.crafting.smeltingProgress).style.display === 'none') {//No bars in progress
			setTimeout(mole.crafting.smelt, 1000);
		}
		console.log("one instance");
		setTimeout(mole.main, 5000);
	}
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