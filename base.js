/*

	As you can see, i'm not a javascript master
	The code is full of functions :o
	
	Btw, there are very very few comments that explain the code >:) HAHAHAHA
	
	Hope you enjoyed the game
	(I want you to read this after finishing the game or things in this game may be spoiled to you)

*/

var enemy_attack_timer;
var healthtimeout;
var skilltimeout;
var potiontimeout;
var invulnerabilitydelay;

function randomnumber(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}
function closemessage() {
	$(".alert").fadeOut("fast");
	$(".modal").fadeOut("fast");
}
function updategold() {
	$("#gold-bar").html(goldbar);
	$("#iron-bar").html(ironbar);
	
	if(ironmining>0 && ironmining<=59) {
		ibpt=ironmining;
		ibtime=3600;
	}
	else if(ironmining>59 && ironmining<=219) {
		ibpt=Math.round((ironmining-59)/2.3);
		if(ibpt==0) {
			ibpt=1;
		}
		ibtime=60;
	}
	else if(ironmining>219 && ironmining<4717) {
		ibpt=Math.round((ironmining-219)/4.5);
		if(ibpt==0) {
			ibpt=1;
		}
		ibtime=1;
	}
	else if(ironmining>=4717) {
		ibpt=1000;
		ibtime=1;
	}
	
	if(goldmining<30) {
		goldmining=30;
	}
	
	if(buyfactory==true) {
		gbps=Math.round(goldmining/10);
	}
}
function updateitems() {
	$("#otheritems").html("");
	for(i=0;i<items.length;i++) {
		thisitem=items[i];
		if(thisitem.owned>0 && thisitem.showstorage) {
			if(thisitem.owned!=1) {
				plural=thisitem.plural;
			}
			else {
				plural="";
			}
			thestorage=$("#otheritems").html();
			$("#otheritems").html(thestorage+"<br>"+thisitem.owned+" "+thisitem.name+plural);
		}
	}
	cut=$("#otheritems").html().substring(4);
	$("#otheritems").html(cut);
	$(".iron-mining-amount").html(ironmining);
	$(".ibpt").html(ibpt);
    $(".skilllvl").html(skilllvl);
    $(".thunder-damage").html(20+skilllvl*7);
    $(".invuln-time").html((3+(skilllvl*3)));
    $(".upgrade-price").html(skilllvl*skilllvl*500+500);
	$(".irontime").html(second2name(ibtime));
	$(".gold-mining").html(goldmining);
	$(".gbps").html(gbps);
	ironprice=10+Math.floor(ironmining*ironmining/150);
	$(".1-iron-cost").html(ironprice);
	$(".10-iron-cost").html(ironprice*10);
	$(".100-iron-cost").html(ironprice*100);
	goldprice=10+Math.floor(goldmining*goldmining/75);
	$(".1-gold-cost").html(goldprice);
	$(".10-gold-cost").html(goldprice*10);
	$(".100-gold-cost").html(goldprice*100);
	
	if(enchant_attack==0 && enchant_defense==0 && enchant_countdown==0 && enchant_life==0) {
		$(".enchants").html("Your sword is enchanted with:<br>Your sword is not enchanted at all.");
	}
	else {
		enchant_html="Your sword is enchanted with:<br>";
		if(enchant_attack>0) { enchant_html=enchant_html+"Attack "+enchant_attack+" (+"+(enchant_attack*7)+" damage)<br>"; }
		if(enchant_defense>0) { enchant_html=enchant_html+"Defense "+enchant_defense+" (Absorbs "+(enchant_defense*2)+"% damage)<br>"; }
		if(enchant_countdown>0) { enchant_html=enchant_html+"Countdown "+enchant_countdown+" (Countdowns are a little bit faster)<br>"; }
		if(enchant_life>0) { enchant_html=enchant_html+"Life "+enchant_life+" (Increases HP by "+enchant_life*2+" each time you attack)<br>"; }
		$(".enchants").html(enchant_html);
	}
	$(".enchant-attack-price").html(enchant_attack*enchant_attack*2000+2000);
	$(".enchant-defense-price").html(enchant_defense*enchant_defense*2500+2500);
	$(".enchant-countdown-price").html(enchant_countdown*enchant_countdown*5000+5000);
	$(".enchant-life-price").html(enchant_life*enchant_life*2500+2500);
	$(".button-enchant-attack").attr("value","Attack "+(enchant_attack+1));
	$(".button-enchant-defense").attr("value","Defense "+(enchant_defense+1));
	$(".button-enchant-life").attr("value","Life "+(enchant_life+1));

	if(enchant_countdown==0) {
		$(".button-enchant-countdown").attr("value","Countdown 1");
	}
	else {
		$(".button-enchant-countdown").attr("disabled","disabled");
		$(".enchant-sword-countdown").html("Countdown 1 is the highest level of countdown enchantment");
	}
	
	if(enchant_defense==10) { $(".button-enchant-defense").attr("disabled","disabled"); }
	if(enchant_life==10) { 
		$(".button-enchant-life").attr("disabled","disabled"); 
		$(".enchant-sword-life").html("Life 10 is the highest level of life enchantment");
	}
	
	if(airplanecountdown==0) {
		if(typeof flyingabcd !== 'undefined') {
			clearInterval(flyingabcd);
		}
		reachedclouds=true;
	}
	if(airplanecountdown<0) {
		airplanecountdown=0;
	}
	
	if(digcountdown==0) {
		clearInterval(digabcd);
		dig(false);
		digcountdown=999999999;
	}
	if(digcountdown<0) {
		digcountdown=0;
	}
	
	if(helmet==0) {
		$(".button-buy-helmet").val("Buy a leather helmet");
	}
	else if(helmet==1) {
		$(".button-buy-helmet").val("Buy a chain helmet");
	}
	else if(helmet==2) {
		$(".button-buy-helmet").val("Buy an iron helmet");
	}
	else if(helmet==3) {
		$(".button-buy-helmet").val("Buy a diamond helmet");
	}
	else {
		$(".helmet-area").html("Sorry, I have no better helmet for you");
	}
	
	if(chestplate==0) {
		$(".button-buy-chestplate").val("Buy a leather chestplate");
	}
	else if(chestplate==2) {
		$(".button-buy-chestplate").val("Buy a chain chestplate");
	}
	else if(chestplate==4) {
		$(".button-buy-chestplate").val("Buy an iron chestplate");
	}
	else if(chestplate==6) {
		$(".button-buy-chestplate").val("Buy a diamond chestplate");
	}
	else {
		$(".chestplate-area").html("Sorry, I have no better chestplate for you");
	}
	
	if(pants==0) {
		$(".button-buy-pants").val("Buy leather pants");
	}
	else if(pants==1.5) {
		$(".button-buy-pants").val("Buy chain pants");
	}
	else if(pants==3) {
		$(".button-buy-pants").val("Buy iron pants");
	}
	else if(pants==4.5) {
		$(".button-buy-pants").val("Buy diamond pants");
	}
	else {
		$(".pants-area").html("Sorry, I have no better pants for you");
	}
	
	if(boots==0) {
		$(".button-buy-boots").val("Buy leather boots");
	}
	else if(boots==0.5) {
		$(".button-buy-boots").val("Buy chain boots");
	}
	else if(boots==1) {
		$(".button-buy-boots").val("Buy iron boots");
	}
	else if(boots==1.5	) {
		$(".button-buy-boots").val("Buy diamond boots");
	}
	else {
		$(".boots-area").html("Sorry, I have no better boots for you");
	}
	
	$(".buy-helmet-price").html((helmet*helmet)*1000+1000);
	$(".buy-chestplate-price").html((chestplate*chestplate)*1000+1000);
	$(".buy-pants-price").html((pants*pants)*1000+1000);
	$(".buy-boots-price").html((boots*boots)*1000+1000);
	
	$(".absorb-percent").html(helmet+chestplate+pants+boots);
	
	$(".current-cookie").html(items[19].owned);
	$(".cps").html(cursor/10);
	$(".cursor-button").val("Cursor ["+cursor+"]");
	$(".cursor-price").html(15*Math.pow(1.15,cursor));
	
	$(".airplanecd").html(airplanecountdown);
	$(".digcd").html(digcountdown);
	
	
	
	if(items[2].owned>=1) {	
		$(".wooden-sword-shop").hide();
		$(".stone-sword-shop").show();
	}
	if(items[4].owned>=1) {	
		$(".stone-sword-shop").hide();
		$(".no-sword-upgrade").show();
	}
	if(items[5].owned>=1) {	
		$(".iron-sword-shop").hide();
		$(".diamond-sword-shop").show();
	}
	if(items[6].owned>=1) {	
		$(".diamond-sword-shop").hide();
		$(".need-iron").show();
	}
	
	if(pizzaeaten==="poisoned") {
		pizzaeaten=true;
	}
	
}
function checkbuilding() {
	if(goldbar>=50) {
		$(".theshop").removeClass("hidden");
	}
	if(items[1].owned>=1) {
		$(".sign").removeClass("hidden");
	}
	if(passthief) {
		$(".sign").css("cursor","default");
		$(".dig-step-1").removeClass("hidden");
		$(".anothershop").removeClass("hidden");
		$(".gate").removeClass("hidden");
	}
	if(passworms) {
		$(".dig-step-1").css("cursor","default").attr("title","");
		$(".dig-step-2").removeClass("hidden");
		$(".underworld-building").removeClass("hidden");
	}
	if(passgate) {
		$(".gate").html('\n\
\n\
\n\
\n\
\n\
 _ ______\n\
| |      |\n\
| |      |\n\
| |      |\n\
| |      |\n\
| |      |\n\
|_|______|');
		$(".gate").attr("title","Unlocked Gate");
		$(".gate").css("cursor","default");
		$(".enchant").removeClass("hidden");
		$(".hill").removeClass("hidden");
		$(".chest").removeClass("hidden");
		$(".castle").removeClass("hidden");
	}
	if(items[8].owned==1&&items[9].owned==14 || hasportal) {
		$(".laboratory").removeClass("hidden");
		$(".portal").removeClass("hidden");
		$(".airplane").removeClass("hidden");
		items[9].owned=0;
		hasportal=true;
	}
	if(reachedclouds) {
planeascii='.--. _        ,---.   ___\n\
 \\# `----------"---=<_)_)_>-.\n\
 `,_/________.-----,_____,.-`\n\
      o\'     `-===\'   `o,   ';
		$("#wrapper").css("top","500px");
		$(".cloud-4").removeClass("hidden");
		$(".airplane").html(planeascii);
		$(".airplane").css({"top":"-450px", "left":"1100px", "cursor":"default"});
	}
	if(items[24].owned==1) {
		$(".sand").removeClass("hidden");
	}
	if(gethole) {
		$(".hole").removeClass("hidden");
	}
}
function updatestatus() {
	if(items[3].owned!=1){plural=items[3].plural;}else{plural="";}
	$(".pizzacount").html(items[3].owned+" pizza"+plural);
	$(".currentsword").html(currentsword);
}
function checkitem() {
	for(i=0;i<items.length;i++) {
		thisitem=items[i];
		itemnamenospace=thisitem.name.replace(" ","-");
		if(goldbar>=thisitem.price) {
			$(".buy-"+itemnamenospace).removeAttr("disabled");
		}
		else {
			$(".buy-"+itemnamenospace).attr("disabled","disabled");
		}
	}
	if(goldbar < 400) { $(".buy-pizza-20").attr("disabled","disabled"); } else { $(".buy-pizza-20").removeAttr("disabled"); }
	if(goldbar < 100) { $(".buy-iron-bar").attr("disabled","disabled"); } else { $(".buy-iron-bar").removeAttr("disabled"); }
	if(goldbar < 20) { $(".training-button").attr("disabled","disabled"); }else { $(".training-button").removeAttr("disabled"); }
	if(ironbar < ironprice) { $(".buy-1-mining").attr("disabled","disabled"); } else { $(".buy-1-mining").removeAttr("disabled"); }
	if(ironbar < (ironprice*10)) { $(".buy-10-mining").attr("disabled","disabled"); } else { $(".buy-10-mining").removeAttr("disabled"); }
	if(ironbar < (ironprice*100)) { $(".buy-100-mining").attr("disabled","disabled"); } else { $(".buy-100-mining").removeAttr("disabled"); }
	if(goldbar < (skilllvl+1)) { $(".upgrade-price").attr("disabled","disabled"); } else { $(".upgrade-price").removeAttr("disabled"); }
	if(goldbar < 5000) { $(".buy-factory-button").attr("disabled","disabled"); } else { $(".buy-factory-button").removeAttr("disabled"); }
	if(ironbar < goldprice) { $(".buy-1-mining-gold").attr("disabled","disabled"); } else { $(".buy-1-mining").removeAttr("disabled"); }
	if(ironbar < goldprice*10) { $(".buy-10-mining-gold").attr("disabled","disabled"); } else { $(".buy-10-mining").removeAttr("disabled"); }
	if(ironbar < goldprice*100) { $(".buy-100-mining-gold").attr("disabled","disabled"); } else { $(".buy-100-mining").removeAttr("disabled"); }
}
function buy(item,number) {
	for(i=0;i<items.length;i++) {
		thisitem=items[i];
		if(item==thisitem.name) {
			if(goldbar>=thisitem.price*number) {
				valid=true;
				if(i==2) {
					currentsword="Wooden Sword";
					$(".wooden-sword-shop").hide();
					$(".stone-sword-shop").show();
				}
				else if(i==4) {
					if(items[2].owned!=0) {
						currentsword="Stone Sword";
						$(".stone-sword-shop").hide();
						$(".no-sword-upgrade").show();
					}
					else {
						valid=false;
					}
				}
				else if(i==5) {
					if(items[4].owned!=0) {
						currentsword="Iron Sword";
						$(".iron-sword-shop").hide();
						$(".diamond-sword-shop").show();
					}
					else {
						alert('I need a sword stone too! Maybe this iron sword is too expensive for you, but it\'s useful!');
						valid=false;
					}
				}
				else if(i==6) {
					if(items[5].owned!=0) {
						currentsword="Diamond Sword";
						$(".diamond-sword-shop").hide();
						$(".need-iron").show();
					}
					else {
						valid=false;
					}
				}
				if(valid) {
					goldbar-=thisitem.price*number;
					thisitem.owned+=number;
					checkthings();
				}
			}
			break;
		}
	}
}
function buyminingmachine(amount) {
	theprice=ironprice*amount;
	if(ironbar>=theprice) {
		ironbar-=theprice;
		ironmining+=amount;
		checkthings();
		clearInterval(a);
		a=setInterval(function() {
			ironbar+=ibpt;
			checkthings();
		},ibtime*1000);
	}
}
function buyminingmachinegold(amount) {
	theprice=goldprice*amount;
	if(ironbar>=theprice) {
		ironbar-=theprice;
		goldmining+=amount;
		checkthings();
	}
}
function enchantsword(type) {
	if(type=="attack") {
		price=enchant_attack*enchant_attack*2000+2000;
		if(goldbar>=price) {
			goldbar-=price;
			enchant_attack++; 
			checkthings();
		}
	}
	else if(type=="defense") {
		if(enchant_defense<10) {
			price=enchant_defense*enchant_defense*2500+2500;
			if(goldbar>=price) {
				goldbar-=price;
				enchant_defense++; 
				checkthings();
			}
		}
	}
	else if(type=="countdown") {
		if(enchant_countdown==0) {
			price=enchant_countdown*enchant_countdown*5000+5000;
			if(goldbar>=price) {
				goldbar-=price;
				enchant_countdown++; 
				checkthings();
			}
		}
	}
	else if(type=="life") {
		if(enchant_life<10) {
			price=enchant_life*enchant_life*2500+2500;
			if(goldbar>=price) {
				goldbar-=price;
				enchant_life++; 
				checkthings();
			}
		}
	}
}
$(document).ready(function() {

	$('.leversion').html("1.2");
	//closemessage();
	//makealert("beta-notice","Beta version notice","As you can see on the left bottom corner of the page, this game is still in beta version (although it is beta but the game is finished)<br><br>So, please let me know if there are some bugs or not working features via <a href=\"http://reddit.com/r/thegoldfactory\">reddit</a> (especially for the saving feature)<br><br>Plus, when i'm typing this, I haven't completed the game without cheating ;) So, the game may be impossible to win. Please let me know if the game is really impossible to win<br><br>Enjoy the game! :D",true);

	goldbar=0; //0
	ironbar=0; //0
	gbps=1;
	goldmining=30;
	ibpt=0;
	ibtime=3600;
	ironmining=0;
	
	items=[];
	items.push({"name":"torch","price":10,"owned":0,"plural":"es","showstorage":true}); //0
	items.push({"name":"shovel","price":50,"owned":0,"plural":"s","showstorage":true}); //1
	items.push({"name":"wooden sword","price":150,"owned":0,"plural":"s","showstorage":false}); //2
	items.push({"name":"pizza","price":20,"owned":0,"plural":"s","showstorage":false}); //3
	items.push({"name":"stone sword","price":500,"owned":0,"plural":"s","showstorage":false}); //4
	items.push({"name":"iron sword","price":1500,"owned":0,"plural":"s","showstorage":false}); //5
	items.push({"name":"diamond sword","price":4000,"owned":0,"plural":"s","showstorage":false}); //6
	items.push({"name":"health potion","price":50,"owned":0,"plural":"s","showstorage":true}); //7
	items.push({"name":"ancient scroll","price":0,"owned":0,"plural":"s","showstorage":true}); //8
	items.push({"name":"nether stone","price":0,"owned":0,"plural":"s","showstorage":true}); //9
	items.push({"name":"lava bucket","price":0,"owned":0,"plural":"s","showstorage":true}); //10
	items.push({"name":"empty potion","price":0,"owned":0,"plural":"s","showstorage":true}); //11
	items.push({"name":"poison potion","price":0,"owned":0,"plural":"s","showstorage":true}); //12
	items.push({"name":"confusion potion","price":0,"owned":0,"plural":"s","showstorage":true}); //13
	items.push({"name":"invisibility potion","price":0,"owned":0,"plural":"s","showstorage":true});
	items.push({"name":"instant countdown potion","price":0,"owned":0,"plural":"s","showstorage":true});
	items.push({"name":"suicide potion","price":0,"owned":0,"plural":"s","showstorage":true}); //16
	items.push({"name":"cookie potion","price":0,"owned":0,"plural":"s","showstorage":true}); //17
	items.push({"name":"X potion","price":0,"owned":0,"plural":"s","showstorage":true}); //18
	items.push({"name":"cookie","price":0,"owned":0,"plural":"s","showstorage":true}); //19
	items.push({"name":"secret potion","price":0,"owned":0,"plural":"s","showstorage":true}); //20
	items.push({"name":"key","price":0,"owned":0,"plural":"s","showstorage":true}); //21
	items.push({"name":"emerald sword","price":0,"owned":0,"plural":"s","showstorage":false}); //22
	items.push({"name":"music disc","price":0,"owned":0,"plural":"s","showstorage":true}); //23
	items.push({"name":"glasses","price":0,"owned":0,"plural":"s","showstorage":false}); //24
	
	swords=[];
	swords.push({"name":"wooden sword","power":6});
	swords.push({"name":"stone sword","power":11});
	swords.push({"name":"iron sword","power":15});
	swords.push({"name":"diamond sword","power":22});
	swords.push({"name":"emerald sword","power":30});
	
	enchant_attack=0; //0
	enchant_defense=0; //deprecated :o
	enchant_countdown=0; //0
	enchant_life=0; //0
	
	helmet=0;
	chestplate=0;
	pants=0;
	boots=0;
	
	theusername="You";
	theuserdesc="This is you.";
	
	cipherstep=0;
	cheststep=0;
	searchtimes=0;
	shovelbroken=0;
	cursor=0;
	pizzaeaten=false;
	poisoned=false;
	chestunderground=false;
	talk=0;
	wob=false;
	buyfactory=false; //false
	skill="none"; //"none"
    skilllvl=0; //0
	additionalattack=0;
	clickcloudcount=0;
	openchestcount=0;
	candybox=false;
	hpactive=0;
	airplanecountdown=999999999; //999999999
	digcountdown=999999999;
	digstep=0;
	currentsword="none"; //"none"
	passthief=false; //false
	passworms=false; //false
	passgate=false; //false
	unlockenchant=false; //false
	unlockchest=false; //false
	beatboss=false; //false
	hasairplane=false; //false
	reachedclouds=false; //false
	defeatinvisiblebot=false; //false
	gethole=false;
	win=false;
	hasportal=false;
	activatemachine=false;
	autosave=true;
	autosavetime=30;
	
	if(localStorage.thegoldfactorygamesave) {
		dosave('loadlocalstorage');
	}
	
	setInterval(function() {
		if(autosave) {
			autosavetime--;
			$("#autosavetime").html(autosavetime);
			if(autosavetime==0) {
				autosavetime=30;
				dosave('autolocalstorage');
			}
		}
	},1000);
	
	asdasdf=digstep;
	digstep=0;
	for(i=0;i<asdasdf;i++) {
		dig(false,true);
	}
	
	if(airplanecountdown<=30) {
		flyingabcd=setInterval(function(){airplanecountdown--;},60000);
	}
	if(digcountdown<=30) {
		digabcd=setInterval(function(){digcountdown--;},60000);
	}
	
	$("#gold-factory").click(function() {
		if(!passgate&&!buyfactory) {
			closemessage();
			makealert("gold-factory","The Gold Factory","Status: You work here, and you get 1 gold bar per second as the salary<br><br><input type=\"button\" value=\"Make the boss happier\" onclick=\"makebosshappy()\"> and receive bonus!",true)
		}
		else if(passgate&&!buyfactory) {
			closemessage();
			makealert("buy-factory","The Gold Factory","Status: You work here, and you get 1 gold bar per second as the salary<br><br><input type=\"button\" value=\"Make the boss happier\" onclick=\"makebosshappy()\">and receive bonus!<br><input type=\"button\" value=\"Buy this factory\" onclick=\"buythefactory()\" class=\"buy-factory-button\"> for 5000 goldbars and get more goldbars each second!",true)
		}
		else if(passgate&&buyfactory) {
			closemessage();
			makealert("buy-factory-new","The Gold Factory","Status: You are the boss! :o<br><br>Currently you have <span class=\"gold-mining\">"+goldmining+"</span> mining machines<br>Production: <span class=\"gbps\">"+gbps+"</span> goldbars / second<br><br><input type=\"button\" value=\"Buy 1 mining machine\" onclick=\"buyminingmachinegold(1)\" class=\"buy-1-mining-gold\"> (<span class=\"1-gold-cost\">"+goldprice+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 10 mining machines\" onclick=\"buyminingmachinegold(10)\" class=\"buy-10-mining-gold\"> (<span class=\"10-gold-cost\">"+goldprice*10+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 100 mining machines\" onclick=\"buyminingmachinegold(100)\" class=\"buy-100-mining-gold\"> (<span class=\"100-gold-cost\">"+goldprice*100+"</span> Iron Bars)<br><br>Tips: Buying 100 machines once is cheaper than buying 1 machine 100 times",true)
		}
	});
	$(".theshop").click(function() {
		closemessage();
		$(".alert-theshop").fadeIn("fast");
		$(".modal").fadeIn("fast");
	});
	$(".anothershop").click(function() {
		closemessage();
		$(".alert-anothershop").fadeIn("fast");
		$(".modal").fadeIn("fast");
	});
	$(".sign").click(function() {
		if(!passthief) {
			closemessage();
			$(".alert-sign").fadeIn("fast");
			$(".modal").fadeIn("fast");
		}
	});
	$(".dig-step-1").click(function() {
		if(passthief && !passworms) {
			closemessage();
			$(".alert-dig-step-1").fadeIn("fast");
			$(".modal").fadeIn("fast");
		}
	});
	$(".training-center").click(function() {
		if(passworms) {
			closemessage();
			if(skill!="none") {
				makealert("training-center","Training Center","Welcome to the training center!<br>Here you can test your skills or study a new power<br><br><input type=\"button\" value=\"Test my skill\" onclick=\"testskill()\" class=\"training-button\"> (20 Gold Bars)<br><input type=\"button\" value=\"Upgrade my skill\" onclick=\"upgradeskill()\" class=\"upgrade-skill\">",true)
			}
			else {
				makealert("training-center","Training Center","Welcome to the training center!<br>Here you can test your skills or study a new power<br><br><input type=\"button\" value=\"Test my skill\" onclick=\"testskill()\" class=\"training-button\"> (20 Gold Bars)<br><input type=\"button\" value=\"Learn a new skill\" onclick=\"learnnewskill()\" class=\"new-skill\">",true)
			}
		}
	});
	$(".mining").click(function() {
		if(passworms) {
			closemessage();
			irontime=second2name(ibtime);
			makealert("mining","Iron Mine","Iron mine allows you to get some iron bar(s) each hour / min / sec<br><br>Currently you have <span class=\"iron-mining-amount\">"+ironmining+"</span> mining machine(s)<br>Production: <span class=\"ibpt\">"+ibpt+"</span> iron bar(s) / <span class=\"irontime\">"+irontime+"</span><br><br><input type=\"button\" value=\"Buy 1 mining machine\" onclick=\"buyminingmachine(1)\" class=\"buy-1-mining\"> (<span class=\"1-iron-cost\">"+ironprice+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 10 mining machines\" onclick=\"buyminingmachine(10)\" class=\"buy-10-mining\"> (<span class=\"10-iron-cost\">"+ironprice*10+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 100 mining machines\" onclick=\"buyminingmachine(100)\" class=\"buy-100-mining\"> (<span class=\"100-iron-cost\">"+ironprice*100+"</span> Iron Bars)<br><br>Tips: Buying 100 machines once is cheaper than buying 1 machine 100 times",true)
		}
	});
	$(".gate").click(function() {
		if(passthief&&!passgate) {
			closemessage();
			makealert("locked-gate","Locked Gate","This gate is locked, you need to make a key to unlock it.<br><br><input type=\"button\" value=\"Make a key and unlock the gate\" onclick=\"makekey()\" class=\"make-key\"> (100 Iron Bars) (the key is complex :d)",true)
		}
	});
	$(".enchant").click(function() {
		if(passgate&&!unlockenchant) {
			closemessage();
			powerhp();
			battle=makebattle(Math.round(Math.random()*100),"Monster",150,150,"Spatula??",15,"A monster",3,power,hp,hp,currentsword,false,"vs-monster");
			html="<div class=\"alert alert-battle-monster\"><b>Monster!</b><br>There is a dangerous monster in the enchanting shop!<br><br>"+battle.html+"</div>";
			$("#otheralerts").append(html);
			battle.init();
			closemessage();
			$(".alert-battle-monster").fadeIn("fast");
		}
		else if(passgate&&unlockenchant) {
			if(items[6].owned==0 && items[22].owned==0) {
				closemessage();
				makealert("enchant-shop","Enchanting Shop","You can only enchant diamond and emerald sword, sorry :(",true)
			}
			else {
				closemessage();
				makealert("enchant-shop","Enchanting Shop","Welcome to the enchanting shop! Here you can enchant your sword<br><br><span class=\"enchants\"></span><br><br><div class='enchant-sword-attack'>Enchant with <input type=\"button\" value=\"Attack 1\" onclick=\"enchantsword('attack')\" class=\"button-enchant-attack\"> (<span class=\"enchant-attack-price\"></span> gold bars)</div><!--br>Enchant with <input type=\"button\" value=\"Defense 1\" onclick=\"enchantsword('defense')\" class=\"button-enchant-defense\"> (<span class=\"enchant-defense-price\"></span> gold bars)--><div class='enchant-sword-countdown'>Enchant with <input type=\"button\" value=\"Countdown 1\" onclick=\"enchantsword('countdown')\" class=\"button-enchant-countdown\"> (<span class=\"enchant-countdown-price\"></span> gold bars)</div><div class='enchant-sword-life'>Enchant with <input type=\"button\" value=\"Life 1\" onclick=\"enchantsword('life')\" class=\"button-enchant-life\"> (<span class=\"enchant-life-price\"></span> gold bars)</div><br><br>Or, <input type=\"button\" value=\"visit the armor section\" onclick=\"armorshop()\" class=\"button-armor-shop\"> of the shop",true)
				checkthings();
			}
		}
	});
	$(".chest").click(function() {
		if(passgate&&!unlockchest) {
			closemessage();
			powerhp();
			battle=makebattle(Math.round(Math.random()*100),"Ghost",400,400,"Invisible hands",27,"This ghost is gurading the chest",4,power,hp,hp,currentsword,false,"vs-ghost");
			html="<div class=\"alert alert-battle-ghost\"><b>Ghost</b><br>The chest is guarded by a ghost<br><br>"+battle.html+"</div>";
			$("#otheralerts").append(html);
			battle.init();
			closemessage();
			$(".alert-battle-ghost").fadeIn("fast");
		}
		else if(passgate&&unlockchest) {
			openchestcount++;
			closemessage();
			if(openchestcount==1) {
				message="The chest is empty now";
			}
			else if(openchestcount==2) {
				message="The chest is empty now, told ya before";
			}
			else if(openchestcount==3) {
				message="THE CHEST IS EMPTY!!!!!";
			}
			else if(openchestcount==4) {
				message="PLS BELIEVE ME!!!";
			}
			else if(openchestcount==5) {
				message="I've told you";
			}
			else if(openchestcount==6) {
				message="Now I hate you";
			}
			else if(openchestcount==7) {
				message="Oh, no, sorry, the chest is not empty, there are 1000 gold bars hidden inside the chest :D";
				goldbar+=1000;
			}
			else if(openchestcount>=8) {
				message="The chest is empty now (really)";
			}
			$(".alert-chest-empty").remove();
			makealert("chest-empty","Empty",message,true)
		}
	});
	$(".castle").click(function() {
		
		if(passgate) {
			entercastle();
		}
		
		/* 
			For future update, I guess:
		
			if(passgate && !beatboss) {
				entercastle();
			}
			else if(passgate && beatboss) {
				makealert("castle","Castle","You are at the castle entrance<br><br><div class=\"castle-steps\"><span class=\"castle-entrance\">Castle Entrance</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-hall grey\">Castle Hall</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-room grey\">King's Room</span></div><br><br>",true);
			}
			
		*/	
			
	});
	$(".laboratory").click(function() {
		if(passgate) {
		
			makealert("laboratory","Laboratory","<div style='max-height:300px; overflow-y:auto;'><del title=\"No, i'm not CrazyRussianHacker\">What's up everybody, welcome back to my laboratory, safety is number 1 priority</del><br>In this laboratory, you can make potions from resources you have (<a href='potions.html' target='_blank'>Potions guide</a>)<br><br><input type=\"button\" value=\"Put\" onclick=\"putitem()\">&nbsp;<input type='text' id='quantity' placeholder='0' size='1'>&nbsp;<select id='itemlist'></select><br>Item(s) going to be mixed:<br><div id='goingtobemixed'></div><br><input type=\"button\" value=\"Mix!\" onclick=\"mixitems()\"></div>",true);
		
			/*
		
				For future update, I guess
			
				makealert("laboratory","Laboratory","<div style='max-height:300px; overflow-y:auto;'><del title=\"No, i'm not CrazyRussianHacker\">What's up everybody, welcome back to my laboratory, safety is number 1 priority</del><br>In this laboratory, you can make potions and items from resources you have (<a href='lab.html' target='_blank'>Laboratory guide</a>)<br><br><input type=\"button\" value=\"Put\" onclick=\"putitem()\">&nbsp;<input type='text' id='quantity' placeholder='0' size='1'>&nbsp;<select id='itemlist'></select><br>Item(s) going to be mixed:<br><div id='goingtobemixed'></div><br><input type=\"button\" value=\"Mix!\" onclick=\"mixitems()\"></div>",true);
				
			*/	
				
			thecauldron("make",0,0);
			updateitemlist();
		}
	});
	$(".portal").click(function() {
		if(passgate) {
			enterportal(1,"a");
		}
	});
	$(".airplane").click(function() {
		if(reachedclouds) {
		}
		else if(passgate&&!hasairplane) {
			makealert("buy-airplane","Airplane","This airplane is for sale, you can buy it<br><br><input type=\"button\" value=\"Buy\" onclick=\"buyairplane()\"> the airplane (5,000,000 iron bars)",true);
		}
		else if(passgate&&hasairplane&&airplanecountdown==999999999) {
			makealert("fly","Fly!!!","Are you ready to fly?<br><br><input type=\"button\" value=\"Fly now!!!\" onclick=\"fly()\">",true);
		}
		else if(passgate&&hasairplane&&airplanecountdown<=30) {
			makealert("fly-countdown","Fly!!!","Your plane is currently flying<br>Time left: <span class='airplanecd'>"+airplanecountdown+" </span> minute(s) left",true);
		}
	});
	$(".cloud-4").click(function() {
man="\n\
\n\
                              O\n\
                             /|\\\n\
                              |\n\
                             / \\";
		if(items[20].owned>0) {
			givesecretpotion="<input type=\"button\" value=\"Give him a secret potion\" onclick=\"theman('givesecretpotion');\" class='give-secret-potion'>";
		}
		else {
			givesecretpotion="";
		}
		makealert("castle-clouds","The castle","You enter the castle and see a man standing inside the castle<br><br><pre class='theman'>"+man+"</pre><br><br><input type=\"button\" value=\"Talk to him\" onclick=\"theman('talk');\" class='talk-with-dude'><input type=\"button\" value=\"Fight with him\" onclick=\"theman('fight');\" class='fight-with-dude'>"+givesecretpotion,true);
	});
	$(".small-hole").click(function() {
		if(digcountdown<=30) {
			dig(true,false);
		}
		else {
			if(digstep<5) {
				makealert("small-hole","A small hole","It seems that you can dig here<br><br><input type=\"button\" value=\"Dig the hole!\" onclick=\"dig(true,false)\"> (Make sure you have a shovel!)",true);
			}
		}
	});
	$(".nametag").click(function() {
		makealert("name-tag","Name tag","You found a name tag!<br>You can change your name and description in battles<br><br>Name: <input type='text' id='yourname' value='"+theusername+"'><br>Description: <input type='text' id='yourdesc' value='"+theuserdesc+"'><br><br>Warning: Putting very long name / description or putting some wild characters may mess up the game",true);
		namedesc=setInterval(function() {
			theusername=$("#yourname").val();
			theuserdesc=$("#yourdesc").val();
		},100);
	});
	$(".chest-dig").click(function() {
		if(!chestunderground) {
chestascii='\n\
         __________\n\
        /\\____;;___\\\n\
       | /         /\n\
       `. ())oo() .\n\
        |\\(%()*^^()^\\\n\
       %| |-%-------|\n\
      % \\ | %  ))   |\n\
      %  \\|%________|\n\
       %%%%';
			makealert("chest-underground","Chest","You found a chest, the chest contains some resources and items!<br><br><pre>"+chestascii+"</pre>",true);
			goldbar+=5000;
			ironbar+=5000;
			items[7].owned+=5;
			chestunderground=true;
			checkthings();
		}
		else {
			makealert("chest-underground","Chest","The chest is empty, 100% sure",true);
		}
	});
	$(".pizzas").click(function() {
		if(!pizzaeaten) {
			makealert("pizza-alert","Pizzas?","You found some pizzas, you don't know they are rotten or not<br>Do you want to eat them?<br><br><input type='button' value='Eat the pizzas' onclick='eatpizza()'>",true);
		}
		else if(pizzaeaten) {
			if(!poisoned) {
				makealert("pizza-alert","Pizzas","There are some leftovers, and you decided not to eat them",true);
			}
			else {
				makealert("pizzas-rotten","Nom.. nom..","You eat the pizzas, but... they are rotten!<br>You are poisoned, this causes you to die easily in battles even if you have a lot of hp<br><br>Luckily you can heal yourself by drinking 10 health potions<br><br><input type=\"button\" value=\"Drink 10 health potions\" onclick=\"healme()\">",true);
			}
		}
	});
	$(".laptop").click(function() {
		makealert("cookieclicker","Cookie Clicker (not full version)","Play the full game here: <a href='http://orteil.dashnet.org/cookieclicker/' target='_blank'>http://orteil.dashnet.org/cookieclicker/</a><br><br><span style='font-size:20px;'><span class='current-cookie'>"+items[19].owned+"</span> cookie(s)</span><br><span class='cps'>"+cursor/10+" </span> per second<br><br><input type=\"button\" value=\"Bake a cookie\" onclick=\"cookieclicker('bake')\"><br><br><span style='font-size:20px;'>Shop:</span><br><br><input type=\"button\" value=\"Cursor ["+cursor+"]\" onclick=\"alert('This is not the full version of Cookie Clicker, therefore you cant buy cursors')\" class='cursor-button'> (<span class='cursor-price'>"+Math.round(15*Math.pow(1.15,cursor))+"</span> cookies)<br><!--input type=\"button\" value=\"Grandma [0]\" onclick=\"alert('This is not the full version of Cookie Clicker')\"> (100 cookies)00-->",true);
		
		/* 
		
			Actually I want to allow you guys to buy cursors,
			But when I implement it, i got some decimal digit issues like 99985.2000000000002 cookies
			
			ALso cursors' price can't be rounded using Math.round() dunno why, lol
			
		*/
		
	});
	$(".sign-dig").click(function() {
		makealert("sign-underground-alert","A sign","\"Nothing more to dig, this is the end. But maybe there will be updates in the future\"",true);
	});
	$(".theportal").click(function() {
		exitmagicportal();
	});
	$(".thefox").click(function() {
		closemessage();
		powerhp();
		battle=makebattle(Math.round(Math.random()*100),"The Fox",2000,2000,"Unknown",1,"A fox!",10,power,hp,hp,currentsword,false,"vs-fox");
		html="<div class=\"alert alert-battle-fox\"><b>The Fox</b><br>You choose to kill the fox<br><br>"+battle.html+"<br><br><input type=\"button\" value=\"Or stop attacking the innocent fox\" onclick=\"myhealthpoint(true,0); closemessage();\"></div>";
		$("#otheralerts").append(html);
		battle.init();
		closemessage();
		$(".alert-battle-fox").fadeIn("fast");
	});
	$(".thehouse").click(function() {
computer="                                            _________________\n\
                                           |                 |\n\
                                           |   <span class=\"click\" onclick=\"computeraction('disc')\">___________</span>   |\n\
                                           |  <span class=\"click\" onclick=\"computeraction('disc')\">|   .....   |</span>  |\n\
 ______________________________________    |  <span class=\"click\" onclick=\"computeraction('disc')\">|___________|</span>  |\n\
|  __________________________________  |   |   ___________   |\n\
| |                                  | |   |  |   .....   |  |\n\
| |                                  | |   |  |___________|  |\n\
| |                                  | |   |   <span class=\"click\" onclick=\"computeraction('error')\">__</span>   __   _   |\n\
| |                                  | |   |  <span class=\"click\" onclick=\"computeraction('error')\">|__|</span> |__| |_|  |\n\
| |                                  | |   |                 |\n\
| |                                  | |   |                 |\n\
| |                                  | |   |                 |\n\
| |                                  | |   |                 |\n\
| |                                  | |   |       <span class=\"click\" onclick=\"computeraction('power')\">.|.</span>       |\n\
| |                                  | |   |      <span class=\"click\" onclick=\"computeraction('power')\">(   )</span>      |\n\
| |                                  | |   |       <span class=\"click\" onclick=\"computeraction('power')\">'-'</span>       |\n\
| |__________________________________| |   |                 |\n\
|______________________________________|   |                 |\n\
                 |    |      '.            |                 |\n\
                 |    |        '-.-'-.-'-.-|                 |\n\
                 )    (                    |                 |\n\
                /      \\                   |                 |\n\
               /________\\                  |_________________|";
		makealert("the-house-enter","The house","<div style='max-height:300px; width:538px; overflow-y:auto;'>You entered the house, and you see a computer in front of you<br><br><pre class='computer-ascii'>"+computer+"</pre><div class='ylvis-the-fox'></div></div>",true);
	});
	$(".sand").click(function() {
		makealert("sand","Sand","There are tons of sand here, you don't know who put it there and what is buried there.<br><br><input type='button' value='Search for something!' onclick='searchsand()'> <span class='search-result'></span><br><input type='button' value='Bury yourself inside the sand!' onclick='burysand()'>",true);
	});
	$(".boss").click(function() {
		if(!win) {
story="\n\
\n\
       _\n\
   .&bull;'   '&bull;.    \"Who is standing there?               O\n\
  /         \\    Hmmmm..... That's weird :/\"         /|\\\n\
 |           |                                        |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Next >' onclick='guy(1)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
";
			makealert("boss-conversation","Someone","Someone is standing there<br><br><pre class='boss-story'>"+story+"</pre>",true);
		}
		else {
			makealert("chest-from-boss","Chest","<br><input type='button' onclick='openthechestfromsomeone()' value='Interact with chest'>",true);
		}
	});
	$(".old-machine").click(function() {
		if(activatemachine) {
			makealert("old-machine","An old machine","The machine a hole and a text 'Insert some gold bars here', you don't really know what this machine does, but maybe it will be useful<br><br><input type='button' value='Put 10 gold bars inside the machine' onclick='givemachinegoldbar(10)'><br><input type='button' value='Put 100 gold bars inside the machine' onclick='givemachinegoldbar(100)'><br><input type='button' value='Put 1000 gold bars inside the machine' onclick='givemachinegoldbar(1000)'><br><input type='button' value='Put 10000 gold bars inside the machine' onclick='givemachinegoldbar(10000)'><br><input type='button' value='Put 100000 gold bars inside the machine' onclick='givemachinegoldbar(100000)'><br>",true);
		}
		else {
			makealert("old-machine","An old machine","This old machine seems to need some fuel to work, maybe a lava bucket can be the fuel.<br><br><input type='button' value='Pour a bucket of lava to the machine' onclick='givelavabuckettothemachine()'>",true);
		}
	});
	
	a=setInterval(function() {
		ironbar+=ibpt;
		checkthings();
	},ibtime*1000);
	checkthings();
	setInterval(function() {
		goldbar+=gbps;
		checkthings();
	},1000);
});
function checkthings() {
	updategold();
	checkbuilding();
	updateitems();
	checkitem();
	updatestatus();
	if(wob) {
		$('body').addClass("wob");
	}
	else {
		$('body').removeClass("wob");
	}
}
function makealert(id,title,text,show) {
	$(".alert-"+id).remove();
	html="<div class=\"alert alert-"+id+"\"><b>"+title+"</b><br>"+text+"<div class=\"close-message-button-"+id+"\"><br><br><input type=\"button\" value=\"Close this window\" onclick=\"closemessage()\" class='button-close-window-"+id+"'></div></div>";
	$("#otheralerts").append(html);
	if(show) {
		closemessage();
		$(".alert-"+id).fadeIn("fast");
		$(".modal").fadeIn("fast");
	}
}
function givemachinegoldbar(howmany) {
	if(howmany%10==0) {
		if(goldbar>=howmany) {
			goldbar-=howmany;
			howmany/=10;
			ironbar+=howmany;
			checkthings();
			alert('The machine gives you '+howmany+' iron bar(s)!');
		}
		else {
			alert('Not enough gold bars!');
		}
	}
}
function givelavabuckettothemachine() {
	if(!activatemachine) {
		if(items[10].owned>=1) {
			items[10].owned-=1;
			activatemachine=true;
			makealert("lava-success","The machine worked!","You successfully make the machine work!",true);
		}
		else {
			alert('You have no lava bucket!');
		}
	}
}
function clickcloud() {
	clickcloudcount++;
	if(clickcloudcount==10) {
		goldbar+=100;
		makealert("falling-gold","Gold!","100 gold bars are falling from the sky!",true);
		checkthings();
	}
}
function powerhp() {
	for(i=0;i<swords.length;i++) {
		thissword=swords[i];
		if(currentsword.toLowerCase()==thissword.name) {
			power=thissword.power+additionalattack;
			break;
		}
	}
	power+=enchant_attack*7;
	hp=100;
	hp+=Math.floor(items[3].owned/3.5);
	thisismyhp=100;
	thisismyhp+=Math.floor(items[3].owned/3.5);
}
function testskill() {
	if(goldbar>=20) {
		goldbar-=20;
		checkthings();
		powerhp();
		hpdivide10=Math.ceil(hp/10);
		battle=makebattle(Math.round(Math.random()*100),"Training Robot",hp+hpdivide10,hp+hpdivide10,"Short ranged laser!",power+Math.ceil(power/10),"A training robot",2,power,hp,hp,currentsword,false,"training");
		html="<div class=\"alert alert-training\"><b>Test my skill!</b><br>Let's see how strong you are<br><br>"+battle.html+"</div>";
		$("#otheralerts").append(html);
		battle.init();
		closemessage();
		$(".alert-training").fadeIn("fast");
	}
}
function showcredits() {
	closemessage();
	makealert("credits","Credits","<div style='max-height:300px; overflow-y:auto;'><br>Ascii arts:<br><br>Factory, house, thunder, monster, castle, chest,<br>ghost, airplane, microscope, scroll, fox, rat:<br><a href='http://www.retrojunkie.com/asciiart/asciiart.htm' target='_blank'>http://www.retrojunkie.com/asciiart/asciiart.htm</a> (with a little modification)<br><hr>Cloud:<Br><a href='http://www.geocities.com/spunk1111/nature.htm#clouds' target='_blank'>http://www.geocities.com/spunk1111/nature.htm#clouds</a><br>(taken from a \"landscape\")<br><hr>Computer:<br>aniwey (from Candy Box 2)<br><hr>Some other ascii arts are created by me :D<br><br><br>Inspired by:<br>The \"legendary\" <a href='http://candies.aniwey.net' target='_blank' onclick='candybox=true'>Candy Box</a> game<br>and <a href='http://adarkroom.doublespeakgames.net' target='_blank'>A Dark Room</a><br>and also <a href='http://candybox2.net' target='_blank' onclick='candybox=true'>Candy Box 2</a><br><br>Thanks to<br>Minecraft for the \"names\", enchanting, and some others :D<br><br>Also special thanks to:<br>- Redditors, people from cb2 forum, people from jayisgames.com for the bug<br>&nbsp;&nbsp;&nbsp;reports, suggestions and critics<br>- Also thanks to <a href='https://github.com/Stevie-O'>Stevie-O</a> for some fixes</div>",true)
}
function showetc() {
	closemessage();
	makealert("etc","Etc.","<div style='max-height:300px; overflow-y:auto;'>I don't know what name is good for this part, so i just give the name \"etc\" :D<br><br>If there are some bugs, glitches, suggestions, etc., you can contact me via: <a href=\"http://reddit.com/r/thegoldfactory\" target='_blank'>reddit</a><br>If you like this game, feel free to share it<br>.. and don't forget to <a href='http://github.com/gamehelp16/thegoldfactory' target='_blank'>view the repo</a> on GitHub!<br><br><i>\"The awkward moment when you need gold to buy wooden sword and you can't make a butter sword by yourself\"</i><br><br>...and sorry if my English is bad XD<br><br><small><a href='javascript:headache()' style='color:white;' title='Dont click me, pls'>headache mode</a></small></div>",true)
}
function toggle() {
	if(wob) {
		wob=false;
	}
	else {
		wob=true;
	}
	checkthings();
}
function headache() {
	setInterval(toggle,1);
}
function showbugs() {
	closemessage();
	makealert("bugs","Known Bugs & Glitches","<div style='max-height:300px; overflow-y:auto;'>Bugs list:<br>- After battling (win / lose), please wait for around 5 seconds before battling again<br>&nbsp;&nbsp;or you will get instant death<br />",true)
}
function dighole() {
	if(items[2].owned==0) {
		makealert("attacked","Attacked!","While you are digging the hole, suddenly someone runs towards you and tried to attack you<br>You have no weapon, so you run away",true);
	}
	else {
		powerhp();
		battle=makebattle(Math.round(Math.random()*100),"Thief",100,100,"Handmade Sword",3,"A thief, nothing else",0,power,hp,hp,currentsword,false,"vs-thief");
		html="<div class=\"alert alert-battle1\"><b>Attacked!</b><br>While you are digging the hole, suddenly someone runs towards you and tried to attack you<br><br>"+battle.html+"</div>";
		$("#otheralerts").append(html);
		battle.init();
		closemessage();
		$(".alert-battle1").fadeIn("fast");
	}
}
function continuedigging() {
	powerhp();
	battle=makebattle(Math.round(Math.random()*100),"Worms",80,80,"Their body",15,"Worms!",1,power,hp,hp,currentsword,false,"vs-worms");
	html="<div class=\"alert alert-battle2\"><b>Worms! :o</b><br>There are worms under the ground!<br>They seemed to be mad because you destroyed their home<br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	battle.init();
	closemessage();
	$(".alert-battle2").fadeIn("fast");
}
function second2name(second) {
	if(second==1) {
		return "second";
	}
	else if(second==60) {
		return "minute";
	}
	else if(second==3600) {
		return "hour";
	}
}
function makekey() {
	if(ironbar>=100) {
		ironbar-=100;
		passgate=true;
		closemessage();
		checkthings();
	}
}
function learnnewskill() {
	closemessage();
	makealert("choose-skill","Choose a skill","Choose a skill that you want to learn (choose wisely because you can't change after choosing)<br><br><input type=\"button\" value=\"Thunder Bolt\" onclick=\"chooseskill(1)\"><br><input type=\"button\" value=\"Invulnerability\" onclick=\"chooseskill(2)\">",true)
}
function chooseskill(type) {
	closemessage();
	if(type==1) {
		skill="thunder";
		makealert("get-skill","Thunder Bolt","Now you can upgrade this skill by visiting the training center",true)
	}
	else {
		skill="invuln";
		makealert("get-skill","Invulnerability","Now you can upgrade this skill by visiting the training center",true)
	}
}
function upgradeskill() {
	if(skill=="thunder") {
		makealert("upgrade-skill","Upgrade Skill","Your skill is: Thunder Bolt<br>Skill level: <span class=\"skilllvl\">"+skilllvl+"</span> (<span class=\"thunder-damage\">"+(20+skilllvl*7)+"</span> damage)<br><br><input type=\"button\" value=\"Upgrade this skill\" onclick=\"doupgrade()\"> (<span class=\"upgrade-price\">"+(skilllvl*skilllvl*500+500)+"</span> gold bars)",true);
	}
	else {
		makealert("upgrade-skill","Upgrade Skill","Your skill is: Invulnerability<br>Skill level: <span class=\"skilllvl\">"+skilllvl+"</span> (<span class=\"invuln-time\">"+(3+(skilllvl*3))+"</span> second(s))<br><br><input type=\"button\" value=\"Upgrade this skill\" onclick=\"doupgrade()\"> (<span class=\"upgrade-price\">"+(skilllvl*skilllvl*500+500)+"</span> gold bars)",true);
	}
}
function doupgrade() {
	cost=(skilllvl*skilllvl*500+500);
	if (goldbar>=cost) {
		goldbar-=cost;
		skilllvl++;
		checkthings();
	}
}
function buythefactory() {
	if(goldbar>=5000) {
		goldbar-=5000;
		gbps=3;
		goldmining=30;
		buyfactory=true;
		checkthings();
		closemessage();
	}
}
function readscroll() {
	items[8].owned=1;
scroll='\n\
   _______________________\n\
 =(__    ___      __     _)=\n\
   |                     |\n\
   | How to make a       |\n\
   | nether portal:      |\n\
   |                     |\n\
   | 1. Get 14 nether    |\n\
   |    stones           |\n\
   | 2. Arrange them so  |\n\
   |    they form a      |\n\
   |    frame            |\n\
   | 3. Walk through the |\n\
   |    frame            |\n\
   |                     |\n\
   |__    ___   __    ___|\n\
 =(_______________________)=\n\
';
	makealert("scroll","The ancient scroll","You read the ancient scroll, it says:<br><br><pre>"+scroll+"</pre>",true);
}
function entercastle() {
	closemessage();
	powerhp();
	battle=makebattle(Math.round(Math.random()*100),"Castle Guard",200,200,"Butter Sword!",30,"Guards the castle.",0,power,hp,hp,currentsword,false,"vs-castle-guard");
	html="<div class=\"alert alert-castle\"><b>Castle</b><br>You are entering the castle...<br><br><div class=\"castle-steps\"><span class=\"castle-entrance\">Castle Entrance</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-hall\">Castle Hall</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-room\">King's Room</span></div><br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	$(".castle-hall").addClass("grey");
	$(".castle-room").addClass("grey");
	battle.init();
	$(".alert-castle").fadeIn("fast");
}
function castlegotohall(myfinalhp) {
	powerhp();
	battle=makebattle(Math.round(Math.random()*100),"Castle Staff",300,300,"Sword-like-knife",20,"The staff makes the castle look good.",0,power,myfinalhp,hp,currentsword,false,"vs-castle-staff");
	html="<div class=\"alert alert-castle-hall\"><b>Castle</b><br>You are inside the castle...<br><br><div class=\"castle-steps\"><span class=\"castle-entrance\">Castle Entrance</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-hall\">Castle Hall</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-room\">King's Room</span></div><br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	$(".castle-entrance").addClass("grey");
	$(".castle-room").addClass("grey");
	battle.init();
	$(".alert-castle-hall").fadeIn("fast");
}
function castlegotoking(myfinalhp) {
	powerhp();
	battle=makebattle(Math.round(Math.random()*100),"Zombie King",650,650,"Diamond Sword",50,"I AM THE BOSS!!",0,power,myfinalhp,hp,currentsword,false,"vs-castle-boss");
	html="<div class=\"alert alert-castle-king\"><b>Castle</b><br>You are in front of the king! :o<br><br><div class=\"castle-steps\"><span class=\"castle-entrance\">Castle Entrance</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-hall\">Castle Hall</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"castle-room\">King's Room</span></div><br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	$(".castle-entrance").addClass("grey");
	$(".castle-hall").addClass("grey");
	battle.init();
	$(".alert-castle-king").fadeIn("fast");
}
function buyairplane() {
	if(ironbar>=5000000) {
		ironbar-=5000000;
		checkthings();
		hasairplane=true;
		makealert("get-airplane","You have an airplane now","The airplane is yours now</pre>",true);
	}
}
function fly() {
	airplanecountdown=30;
	flyingabcd=setInterval(function(){airplanecountdown--;},60000);
	closemessage();
}
function enterportal(step,thehp2) {

	totalprogress=20;
	progress="";
	
	for(i=1;i<=totalprogress;i++) {
		if(i==step) {
			if(candybox) {
				you="\\o/";
			}
			else {
				you="YOU";
			}
			progress=progress+you;
		}
		else {
			progress=progress+"___";
		}
	}

	$(".alert-nether").remove();
	closemessage();
	html="<div class=\"alert alert-nether\"><b>Nether!</b><br>Welcome to the nether!<br><pre>"+progress+"</pre><br><div id='nether-battle-area'></div></div>";
	$("#otheralerts").append(html);
	if(step==1) {
		$(".alert-nether").fadeIn("fast");
	}
	else {
		$(".alert-nether").show();
	}
	
	if(step<=totalprogress) {
		if(Math.random()<=0.5) {
			powerhp();
			therand=randomnumber(1,8);
			maxhp=hp;
			if(thehp2!="a") {
				hp=thehp2;
			}
			if(therand==1) {
				battle=makebattle(Math.round(Math.random()*100),"Monster",200,200,"Spatula??",20,"A monster",3,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==2) {
				battle=makebattle(Math.round(Math.random()*100),"Ghost",300,300,"Invisible hands",25,"A Ghost, nothing else.",4,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==3) {
				battle=makebattle(Math.round(Math.random()*100),"Giant",500,500,"Big hand",10,"Bam, bam, bam.",5,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==4) {
				battle=makebattle(Math.round(Math.random()*100),"Unicorn",100,100,"Big hand",30,"Unicorn!! Yay!!! :D",6,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==5) {
				battle=makebattle(Math.round(Math.random()*100),"Wizard",250,250,"Spells",17,"Abrakadabra!",7,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else if(therand==6) {
				battle=makebattle(Math.round(Math.random()*100),"Pegasus",100,100,"Wings",10,"The Pegasus is facing the wrong direction :/",8,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			else {
				battle=makebattle(Math.round(Math.random()*100),"Weakened Ghost",200,200,"Invisible hands",17,"A weakened ghost.",4,power,hp,maxhp,currentsword,false,"in-the-nether-"+step);
			}
			$("#nether-battle-area").html(battle.html);
			battle.init();
		}
		else {
			step++;
			setTimeout(function(){enterportal(step,thehp2);},1000);
		}
	}
	else {
		closemessage();
		items[10].owned+=1;
		makealert("get-lava-bucket","End of the nether","You managed to go to the end of the nether, and you get 1 lava bucket",true);
	}
	
}
function showstorage() {
	closemessage();
	$(".alert-storage").fadeIn("fast");
	$(".modal").fadeIn("fast");
}
function changelog() {
	closemessage();
	makealert("changelog","Changelog","<div style='max-height:300px; overflow-y:auto;'>12 January 2014<br>- Iron mining machine price is a bit cheaper<br>- Reset game button added<br>- A super minor change (you don't need to know about this, actually)<br>- Zombie king is a bit easier to kill<br>- Each level of thunder skill now gives 7 more attack instead of 5<br><br>04 January 2014<br>-Fixed bug in the old machine <br><br>03 January 2014<br>- Version 1.0 released! (finally :D)<br>- There is something new in the end of 'the digging'<br><br>24 December 2013:<br>- Airplane price is now 5 million iron bars instead of 9 million! <br><br>20 December 2013:<br>- <a href='http://www.reddit.com/r/thegoldfactory/comments/1tbmnk/20_dec_2013_update_version_094_beta/' target='_blank'>Updates</a><br><br>18 December 2013:<br>- Some fixes thanks to <a href='https://github.com/Stevie-O' target='_blank'>Stevie-O</a><br>- <a href='http://www.reddit.com/r/thegoldfactory/comments/1t5g6i/18_dec_2013_update_093_beta/' target='_blank'>Updates</a><br><br>14 December 2013:<br>- <a href='http://www.reddit.com/r/thegoldfactory/comments/1sv65j/updates_2/' target='_blank'>Bug fixes & Updates</a><br><br>13 December 2013:<br>- <a href='http://www.reddit.com/r/thegoldfactory/comments/1ss7u8/updates/' target='_blank'>Lots of updates</a><br><br>11 December 2013:<br>- Version 1.0 Beta released!<br>- Bug fix</div>",true);
}
function armorshop() {
	closemessage();
	makealert("armor-shop","Armor Section","We sell armors too! Buy some armors to absorb damages from your enemies!<br><br>Your stats: <span class=\'absorb-percent'>0</span>% damage absorbed<br><br><div class='helmet-area'>Helmet: <input type=\"button\" value=\"Buy a leather helmet\" onclick=\"buyarmor('helmet')\" class=\"button-buy-helmet\"> (<span class=\"buy-helmet-price\">0</span> gold bars)</div><div class='chestplate-area'>Chestplate: <input type=\"button\" value=\"Buy a leather chestplate\" onclick=\"buyarmor('chestplate')\" class=\"button-buy-chestplate\"> (<span class=\"buy-chestplate-price\">0</span> gold bars)</div><div class='pants-area'>Pants: <input type=\"button\" value=\"Buy a leather pants\" onclick=\"buyarmor('pants')\" class=\"button-buy-pants\"> (<span class=\"buy-pants-price\">0</span> gold bars)</div><div class='boots-area'>Boots: <input type=\"button\" value=\"Buy a leather boots\" onclick=\"buyarmor('boots')\" class=\"button-buy-boots\"> (<span class=\"buy-boots-price\">0</span> gold bars)</div>",true)
	checkthings();
}
function buyarmor(armor) {
	if(armor=="helmet") {
		price=(helmet*helmet)*1000+1000;
	}
	else if(armor=="chestplate") {
		price=(chestplate*chestplate)*1000+1000;
	}
	else if(armor=="pants") {
		price=(pants*pants)*1000+1000;
	}
	else if(armor=="boots") {
		price=(boots*boots)*1000+1000;
	}
	
	if(goldbar>=price) {
		goldbar-=price;
		if(armor=="helmet") {
			helmet+=1;
		}
		else if(armor=="chestplate") {
			chestplate+=2;
		}
		else if(armor=="pants") {
			pants+=1.5;
		}
		else if(armor=="boots") {
			boots+=0.5;
		}
	}
	checkthings();
}
function theman(action) {
man="\n\
                              O\n\
                             /|\\\n\
                              |\n\
                             / \\";
	if(action=="talk") {
		if(talk==0) {
man="\n\
           Hi, it seems       O\n\
           that you have     /|\\\n\
           spent a lot of     |\n\
           time to go here   / \\";
		   
			$(".talk-with-dude").val("Yeah, it's a long journey");
			$(".fight-with-dude").hide();
			$(".give-secret-potion").hide();
		}
		else if(talk==1) {
man="\n\
           How I could        O\n\
           help you?         /|\\\n\
                              |\n\
                             / \\";
							 
			$(".talk-with-dude").val("I have no idea too!");
			$(".fight-with-dude").hide();
			$(".give-secret-potion").hide();
		}
		else if(talk==2) {
man="\n\
           Oh, i know,        O      I'm interested with:\n\
           please tell me    /|\\     <input type=\"button\" value=\"Battle\" onclick=\"theman('battle')\">\n\
           what you are       |      <input type=\"button\" value=\"Magic\" onclick=\"theman('magic')\">\n\
           interested with   / \\";
		   
		}
		
		if(talk!=2) {
			talk++;
		}
		else {
			talk=0;
			$(".talk-with-dude").val("Talk to him");
			$(".talk-with-dude").hide();
			$(".fight-with-dude").show();
			$(".give-secret-potion").show();
			if(items[20].owned<=0) {
				$(".give-secret-potion").hide();
			}
		}
		$(".theman").html(man);
	}
	else if(action=="fight") {
	randomspeech=randomnumber(1,8);
if(randomspeech==1) {
man="\n\
            Ugh...            O\n\
            I hate fighting  /|\\\n\
                              |\n\
                             / \\";
}
else if(randomspeech==2) {
man="\n\
            Is fighting       O\n\
            the only hobby   /|\\\n\
            you have?         |\n\
                             / \\";
}
else if(randomspeech==3) {
man="\n\
            No, i'm           O\n\
            not ready        /|\\\n\
                              |\n\
                             / \\";
}
else if(randomspeech==4) {
man="\n\
            Maybe you         O\n\
            would like       /|\\\n\
            to fight with     |\n\
            someone else?    / \\";
}
else if(randomspeech==5) {
man="\n\
            I'm not           O\n\
            equipped with    /|\\\n\
            armors and        |\n\
            weapons          / \\";
}
else if(randomspeech==6) {
man="\n\
                              O\n\
            No, no pls       /|\\\n\
                              |\n\
                             / \\";
}
else  {
man="\n\
                              O\n\
            Not now          /|\\\n\
                              |\n\
                             / \\";
}
		$(".theman").html(man);
		$(".talk-with-dude").val("Talk to him");
		$(".talk-with-dude").show();
		$(".fight-with-dude").show();
		$(".give-secret-potion").show();
		if(items[20].owned<=0) {
			$(".give-secret-potion").hide();
		}
	}
	else if(action=="battle") {
man="\n\
  Oh, so you liked battle?    O   managed to defeat it will\n\
  I have an invisible        /|\\  get lots of prizes from\n\
  training robot in my        |   me, are you ready?\n\
  castle and anyone who      / \\  <input type=\"button\" value=\"Yes, I'm ready!\" onclick=\"vsinvisiblebot()\">";		
		$(".theman").html(man);	
	}
	else if(action=="magic") {
man="\n\
         There is a portal    O     portal seems\n\
         in my castle. I     /|\\    so magical :)\n\
         have never entered   |     <input type=\"button\" value=\"Enter the portal!\" onclick=\"entermagicportal()\">\n\
         it before, but that / \\";		
		$(".theman").html(man);
	}
	else if(action=="givesecretpotion") {
		items[20].owned--;
		items[23].owned++;
man="\n\
         Oh, thanks for the   O    this thing years ago\n\
         potion! As a reward /|\\   but i don't know what\n\
         I give you a music   |    is it use for. Maybe you\n\
         disc. I have kept   / \\   can use it better than me";		
		$(".theman").html(man);
		if(items[20].owned<=0) {
			$(".give-secret-potion").hide();
		}
	}
}
function eatpizza() {
	if(Math.random()<=0.5) {
		makealert("pizzas-not-rotten","Nom.. nom..","You eat the pizzas, luckily they are not rotten",true);
		eaten=randomnumber(10,50);
		items[3].owned+=eaten;
		checkthings();
		pizzaeaten=true;
	}
	else {
		makealert("pizzas-rotten","Nom.. nom..","You eat the pizzas, but... they are rotten!<br>You are poisoned, this causes you to die easily in battles even if you have a lot of hp<br><br>Luckily you can heal yourself by drinking 10 health potions<br><br><input type=\"button\" value=\"Drink 10 health potions\" onclick=\"healme()\">",true);
		poisoned=true;
		pizzaeaten=true;
	}
}
function healme() {
	if(items[7].owned>=10) {
		items[7].owned-=10;
		poisoned=false;
		makealert("drink-10-health-potion","Healed","You drank 10 health potions and now you are not posioned anymore",true);
	}
}
function cookieclicker(action) {
	if(action=="bake") {
		items[19].owned++;
		checkthings();
	}
	else if(action=="cursor") {
		if(items[19].owned>=Math.round(15*Math.pow(1.15,cursor))) {
			items[19].owned-=Math.round(15*Math.pow(1.15,cursor));
			cursor++;
			checkthings();
		}
	}
}
function vsinvisiblebot() {
	closemessage();
	powerhp();
	battle=makebattle(Math.round(Math.random()*100),"Invisible Bot",300,300,"Invisible Sword",30,"An invisible bot",9,power,hp,hp,currentsword,false,"vs-invisible-bot");
	html="<div class=\"alert alert-battle-invisible-bot\"><b>Invisible Bot</b><br>Here is the invisible bot, good luck!<br><br>"+battle.html+"</div>";
	$("#otheralerts").append(html);
	battle.init();
	closemessage();
	$(".alert-battle-invisible-bot").fadeIn("fast");
}
function entermagicportal() {
	$(".fader").fadeIn("slow");
	setTimeout(function() {
		$(".fader").fadeOut("slow");
		$("#wrapper").hide();
		$("#realworld").show();
		closemessage();
	}, 750);
}
function exitmagicportal() {
	$(".fader").fadeIn("slow");
	setTimeout(function() {
		$(".fader").fadeOut("slow");
		$("#wrapper").show();
		$("#realworld").hide();
		closemessage();
	}, 750);
}
function computeraction(type) {
	if(type=="disc") {
		if(items[23].owned>0) {
			items[23].owned--;
			$(".ylvis-the-fox").html("<iframe src=\"http://www.youtube.com/embed/jofNR_WkoCE?autoplay=1&controls=0&modestbranding=1&loop=1&rel=0&showinfo=0\" frameborder=\"0\" class=\"ylvis\" allowfullscreen></iframe>");
			$(".ylvis-the-fox").show();
		}
		else {
			alert('You have no disc to insert!');
		}
	}
	else if(type=="glasses") {
		items[24].owned++;
		makealert("get-glasses","Glasses!","You found glasses!<br>These glasses allows you to see some mysterious things!<br><br><span class=\"click\" onclick=\"alert('Hi there, grammar nazi! ;)')\">Your</span> amazing!",true);
	}
	else if(type=="error") {
computer="                                            _________________\n\
                                           |                 |\n\
                                           |   ___________   |\n\
                                           |  |   .....   |  |\n\
 ______________________________________    |  |___________|  |\n\
|  __________________________________  |   |   ___________   |\n\
| |<span class=\"bsod\">A problem has been detected and   </span>| |   |  |   .....   |  |\n\
| |<span class=\"bsod\">Windows has been shut down to     </span>| |   |  |___________|  |\n\
| |<span class=\"bsod\">prevent damage to your computer.  </span>| |   |   __   __   _   |\n\
| |<span class=\"bsod\">                                  </span>| |   |  |__| |__| |_|  |\n\
| |<span class=\"bsod\">The problem seems to be caused by </span>| |   |                 |\n\
| |<span class=\"bsod\">the following file: vmilib.sys    </span>| |   |                 |\n\
| |<span class=\"bsod\">                                  </span>| |   |                 |\n\
| |<span class=\"bsod\">SESSION2_INITIALIZATION_FAILED    </span>| |   |                 |\n\
| |<span class=\"bsod\">                                  </span>| |   |       .|.       |\n\
| |<span class=\"bsod\">If this is the first time you've  </span>| |   |      (   )      |\n\
| |<span class=\"bsod\">seen this Stop error screen.      </span>| |   |       '-'       |\n\
| |<span class=\"bsod\" style\"color:black;\">__________________________________</span>| |   |                 |\n\
|______________________________________|   |                 |\n\
                 |    |      '.            |                 |\n\
                 |    |        '-.-'-.-'-.-|                 |\n\
                 )    (                    |                 |\n\
                /      \\                   |                 |\n\
               /________\\                  |_________________|";
		$(".computer-ascii").html(computer);
		$(".ylvis-the-fox").hide();
	}
	else if(type=="goldfactory") {
		if(!passgate&&!buyfactory) {
			closemessage();
			$(".alert-gold-factory").fadeIn("fast");
			$(".modal").fadeIn("fast");
		}
		else if(passgate&&!buyfactory) {
			closemessage();
			makealert("buy-factory","The Gold Factory","Status: You work here, and you get 1 gold bar per second as the salary<br><br><input type=\"button\" value=\"Buy this factory\" onclick=\"buythefactory()\" class=\"buy-factory-button\"> for 10000 goldbars and get more goldbars each second!",true)
		}
		else if(passgate&&buyfactory) {
			closemessage();
			makealert("buy-factory-new","The Gold Factory","Status: You are the boss! :o<br><br>Currently you have <span class=\"gold-mining\">"+goldmining+"</span> mining machines<br>Production: <span class=\"gbps\">"+gbps+"</span> goldbars / second<br><br><input type=\"button\" value=\"Buy 1 mining machine\" onclick=\"buyminingmachinegold(1)\" class=\"buy-1-mining-gold\"> (<span class=\"1-gold-cost\">"+goldprice+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 10 mining machines\" onclick=\"buyminingmachinegold(10)\" class=\"buy-10-mining-gold\"> (<span class=\"10-gold-cost\">"+goldprice*10+"</span> Iron Bars)<br><input type=\"button\" value=\"Buy 100 mining machines\" onclick=\"buyminingmachinegold(100)\" class=\"buy-100-mining-gold\"> (<span class=\"100-gold-cost\">"+goldprice*100+"</span> Iron Bars)<br><br>Tips: Buying 100 machines once is cheaper than buying 1 machine 100 times",true)
		}
		$(".ylvis-the-fox").hide();
	}
	else if(type=="power") {
		if(items[24].owned==0) {
computer="                                            _________________\n\
                                           |                 |\n\
                                           |   <span class=\"click\" onclick=\"computeraction('disc')\">___________</span>   |\n\
                                           |  <span class=\"click\" onclick=\"computeraction('disc')\">|   .....   |</span>  |\n\
 ______________________________________    |  <span class=\"click\" onclick=\"computeraction('disc')\">|___________|</span>  |\n\
|  __________________________________  |   |   ___________   |\n\
| |----------------------------------| |   |  |   .....   |  |\n\
| |http://gamehelp16.github.io/the...| |   |  |___________|  |\n\
| |----------------------------------| |   |   <span class=\"click\" onclick=\"computeraction('error')\">__</span>   __   _   |\n\
| |       <span class=\"click\" onclick=\"computeraction('goldfactory')\">...</span>                |       | |   |  <span class=\"click\" onclick=\"computeraction('error')\">|__|</span> |__| |_|  |\n\
| |     <span class=\"click\" onclick=\"computeraction('goldfactory')\">...</span>                  |       | |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">..</span>                     |_______| |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">||</span> <span class=\"click\" onclick=\"computeraction('goldfactory')\"> __</span>                         | |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">||</span> <span class=\"click\" onclick=\"computeraction('goldfactory')\">| #|__.</span>                     | |   |                 |\n\
| |__<span class=\"click\" onclick=\"computeraction('goldfactory')\">/__\\|__|__|</span>____________<span class=\"click\" onclick=\"computeraction('glasses')\">.</span>________| |   |       <span class=\"click\" onclick=\"computeraction('power')\">.|.</span>       |\n\
| |                                  | |   |      <span class=\"click\" onclick=\"computeraction('power')\">(   )</span>      |\n\
| |_____                     ________| |   |       <span class=\"click\" onclick=\"computeraction('power')\">'-'</span>       |\n\
| |_____|___________________|________| |   |                 |\n\
|______________________________________|   |                 |\n\
                 |    |      '.            |                 |\n\
                 |    |        '-.-'-.-'-.-|                 |\n\
                 )    (                    |                 |\n\
                /      \\                   |                 |\n\
               /________\\                  |_________________|";
		}
		else {
computer="                                            _________________\n\
                                           |                 |\n\
                                           |   <span class=\"click\" onclick=\"computeraction('disc')\">___________</span>   |\n\
                                           |  <span class=\"click\" onclick=\"computeraction('disc')\">|   .....   |</span>  |\n\
 ______________________________________    |  <span class=\"click\" onclick=\"computeraction('disc')\">|___________|</span>  |\n\
|  __________________________________  |   |   ___________   |\n\
| |----------------------------------| |   |  |   .....   |  |\n\
| |http://gamehelp16.github.io/the...| |   |  |___________|  |\n\
| |----------------------------------| |   |   <span class=\"click\" onclick=\"computeraction('error')\">__</span>   __   _   |\n\
| |       <span class=\"click\" onclick=\"computeraction('goldfactory')\">...</span>                |       | |   |  <span class=\"click\" onclick=\"computeraction('error')\">|__|</span> |__| |_|  |\n\
| |     <span class=\"click\" onclick=\"computeraction('goldfactory')\">...</span>                  |       | |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">..</span>                     |_______| |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">||</span> <span class=\"click\" onclick=\"computeraction('goldfactory')\"> __</span>                         | |   |                 |\n\
| |   <span class=\"click\" onclick=\"computeraction('goldfactory')\">||</span> <span class=\"click\" onclick=\"computeraction('goldfactory')\">| #|__.</span>                     | |   |                 |\n\
| |__<span class=\"click\" onclick=\"computeraction('goldfactory')\">/__\\|__|__|</span>_____________________| |   |       <span class=\"click\" onclick=\"computeraction('power')\">.|.</span>       |\n\
| |                                  | |   |      <span class=\"click\" onclick=\"computeraction('power')\">(   )</span>      |\n\
| |_____                     ________| |   |       <span class=\"click\" onclick=\"computeraction('power')\">'-'</span>       |\n\
| |_____|___________________|________| |   |                 |\n\
|______________________________________|   |                 |\n\
                 |    |      '.            |                 |\n\
                 |    |        '-.-'-.-'-.-|                 |\n\
                 )    (                    |                 |\n\
                /      \\                   |                 |\n\
               /________\\                  |_________________|";
		}
		$(".computer-ascii").html(computer);
		$(".ylvis-the-fox").hide();
	}
}

function searchsand() {
	random=randomnumber(1,20*searchtimes);
	if(random==10) {
		r=randomnumber(100,1000);
		goldbar+=r;
		$(".search-result").html("You got "+r+" gold bars!");
		searchtimes++;
	}
	else if(random==20) {
		r=randomnumber(100,1000);
		ironbar+=r;
		$(".search-result").html("You got "+r+" iron bars!");
		searchtimes++;
	}
	else if(random==15) {
		r=randomnumber(2,5);
		items[7].owned+=r;
		$(".search-result").html("You got "+r+" health potions!");
		searchtimes++;
	}
	else {
		$(".search-result").html("You got nothing :(");
	}
}
function burysand() {
	if(gethole) {
		closemessage();
		makealert("suffocated","Suffocated","Now you are suffocated inside the sand",true);
	}
	else {
		closemessage();
		makealert("bury-sand","...","You bury yourself inside the sand when you realize that you fell into a hole",true);
		gethole=true;
	}
}
function guy(step) {
	if(step==1) {
story="\n\
       _\n\
   .&bull;'   '&bull;.    \"It seems that I have ever seen       O\n\
  /         \\    that guy before, hmmmm....\"         /|\\\n\
 |           |                                        |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Next >' onclick='guy(2)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
";
		$(".boss-story").html(story);
	}
	else if(step==2) {
story="\n\
       _\n\
   .&bull;'   '&bull;.    \"Oh, yes, I know him!                 O\n\
  /         \\    he is the one who brought me        /|\\\n\
 |           |    to this weird world >:C\"            |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Next >' onclick='guy(3)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
";
		$(".boss-story").html(story);
	}
	else if(step==3) {
story="\n\
       _\n\
   .&bull;'   '&bull;.    \"I must kill him!\"                    O\n\
  /         \\                                        /|\\\n\
 |           |                                        |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Next >' onclick='guy(4)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
";
		$(".boss-story").html(story);
	}
	else if(step==4) {
story="\n\
       _\n\
   .&bull;'   '&bull;.                    \"No, you can't kill   O\n\
  /         \\                   me, you idiot >:(\"   /|\\\n\
 |           |                                        |\n\
 |           |                                       / \\\n\
  \\         /    <input type='button' value='Fight!' onclick='guy(5)'>                              \n\
   '&bull;.   .&bull;'\n\
     /   \\\n\
    / | | \\\n\
   / /| |\\ \\\n\
  / / | | \\ \\\n\
\n\
\n\
PS: He heals 3 HP each time he attacks you and he also absorb some damage from you!";
		$(".boss-story").html(story);
	}
	else if(step==5) {
		closemessage();
		powerhp();
		battle=makebattle(Math.round(Math.random()*100),"Mr. Professor",1000,1000,"Super powerful sword",50,"He brought you to this weird world!",0,power,hp,hp,currentsword,false,"vs-boss");
		html="<div class=\"alert alert-boss-fight\"><b>Fight! Fight! Fight!</b><br>This dude has brought you to this weird world without permission, you have been searching for him for a long time, and now you found him!<br><br>"+battle.html+"</div>";
		$("#otheralerts").append(html);
		battle.init();
		closemessage();
		$(".alert-boss-fight").fadeIn("fast");
	}
}
function openthechestfromsomeone() {
	if(cheststep==0) {
		closemessage();
		makealert("chest-locked","Locked","The chest is locked, you need a key to open it<br><br><input type='button' onclick='openthechest()' value='Open the chest'>",true);
	}
	else if(cheststep==1) {
		closemessage();
		makealert("chest-locked2","Password?","Oh noes! You need a password to open the chest (this chest is really annoying -_-)<br><br>Please type the password<br><input type='text' id='chest-password-form'><br><br><input type='button' value='Submit' onclick='openthechest()'>",true);
	}
	else if(cheststep==2) {
		closemessage();
message='\n\
   _______________________\n\
 =(__    ___      __     _)=\n\
   |                     |\n\
   | A message from the  |\n\
   | developer to you:   |\n\
   |                     |\n\
   | Hi! and thanks for  |\n\
   | playing my game! :D |\n\
   |                     |\n\
   | I would like to say |\n\
   | Congratulations!!!! |\n\
   | You won the game!   |\n\
   |                     |\n\
   | But maybe this game |\n\
   | is not finished for |\n\
   | you, have you dug   |\n\
   | through the end?    |\n\
   |                     |\n\
   | If not, then do it! |\n\
   |                     |\n\
   | If yes, then I      |\n\
   | think you will be   |\n\
   | bored, that\'s why   |\n\
   | I recommend you to  |\n\
   | <a href="http://bit.ly/1gMQO9u">Click here</a> to kill  |\n\
   | your boredom :D     |\n\
   |                     |\n\
 =(_______________________)=\n\
';
		makealert("open-chest","A message","<div style='max-height:300px; overflow-y:auto;'>The chest contains a message:<br><br><pre>"+message+"</pre></div>",true);
	}
}

// Just some random comment ;)

function openthechest() {
	if(cheststep==0) {
		if(items[21].owned==1) {
			items[21].owned--;
			cheststep++;
			alert('The chest has been opened!');
			closemessage();
		}
		else {
			alert('You need a key to open the chest!');
		}
	}
	else if(cheststep==1) {
		if($("#chest-password-form").val()=="password" || $("#chest-password-form").val()=="the password") {
			alert('Sorry, this is not a tricky question');
		}
		else if($("#chest-password-form").val()=="Ring-ding-ding-ding-dingeringeding!") {
			cheststep++;
			alert('Password is true. Access Granted');
			closemessage();
		}
		else {
			alert('Wrong password!');
		}
	}
}

function localstoragehelp() {
	alert('Basicly it\'s a feature that allows the game to save your progress in your browser');
}

function save() {
	makealert("save","Save game","Here you can save your progress (Since i'm not sure if the saving works well or not, so I recommend you to save the game as text too, in case there are some errors)<br><br><input type='button' value='Save game' onclick='dosave(\"localstorage\")'> (Uses HTML5 Local Storage <small>[<a href='javascript:localstoragehelp();' title='What is HTML5 Local Storage???'>?</a>]</small>)<br><input type='button' value='Save game as text' onclick='dosave(\"text\")'><br><input type='button' value='Load game' onclick='dosave(\"load\")'><br><input type='button' value='Reset game' onclick='dosave(\"reset\")'><br><input type='button' value='Toggle autosave' onclick='dosave(\"autotoggle\")'> Game autosaves in <span id='autosavetime'>"+autosavetime+"</span> second(s)",true);
}

function dosave(param) {
	if(param=='autotoggle') {
		if(autosave) {
			autosave=false;
			alert('Autosave disabled');
		}
		else {
			autosave=true;
			alert('Autosave enabled');
		}
	}
	else if(param=='text') {
		prompt("Save the code somewhere safe!", btoa(goldbar+"|"+ironbar+"|"+gbps+"|"+goldmining+"|"+ibpt+"|"+ibtime+"|"+ironmining+"|"+items[0].owned+"|"+items[1].owned+"|"+items[2].owned+"|"+items[3].owned+"|"+items[4].owned+"|"+items[5].owned+"|"+items[6].owned+"|"+items[7].owned+"|"+items[8].owned+"|"+items[9].owned+"|"+items[10].owned+"|"+items[11].owned+"|"+items[12].owned+"|"+items[13].owned+"|"+items[14].owned+"|"+items[15].owned+"|"+items[16].owned+"|"+items[17].owned+"|"+items[18].owned+"|"+items[19].owned+"|"+items[20].owned+"|"+items[21].owned+"|"+items[22].owned+"|"+items[23].owned+"|"+items[24].owned+"|"+enchant_attack+"|"+enchant_defense+"|"+enchant_countdown+"|"+enchant_life+"|"+helmet+"|"+chestplate+"|"+pants+"|"+boots+"|"+theusername+"|"+theuserdesc+"|"+cheststep+"|"+searchtimes+"|"+shovelbroken+"|"+cursor+"|"+pizzaeaten+"|"+poisoned+"|"+chestunderground+"|"+talk+"|"+wob+"|"+buyfactory+"|"+skill+"|"+skilllvl+"|"+additionalattack+"|"+clickcloudcount+"|"+openchestcount+"|"+candybox+"|"+hpactive+"|"+airplanecountdown+"|"+digcountdown+"|"+digstep+"|"+currentsword+"|"+passthief+"|"+passworms+"|"+passgate+"|"+unlockenchant+"|"+unlockchest+"|"+beatboss+"|"+hasairplane+"|"+reachedclouds+"|"+defeatinvisiblebot+"|"+gethole+"|"+win+"|"+hasportal+"|"+cipherstep+"|"+activatemachine+"|"+autosave)+"encrypted");
	}
	else if(param=='load') {
		savecode=prompt("Please enter the save code", "Enter the code here");
		if(savecode.slice(-9)=="encrypted")savecode=atob(savecode.replace("encrypted",""));
		savecode=savecode.split("|");
		
		if(savecode.length<75) {
			alert('Wrong save code?');
			return;
		}
		
		goldbar=parseInt(savecode[0]);
		ironbar=parseInt(savecode[1]);
		gbps=parseInt(savecode[2]);
		goldmining=parseInt(savecode[3]);
		ibpt=parseInt(savecode[4]);
		ibtime=parseInt(savecode[5]);
		ironmining=parseInt(savecode[6]);
		items[0].owned=parseInt(savecode[7]);
		items[1].owned=parseInt(savecode[8]);
		items[2].owned=parseInt(savecode[9]);
		items[3].owned=parseInt(savecode[10]);
		items[4].owned=parseInt(savecode[11]);
		items[5].owned=parseInt(savecode[12]);
		items[6].owned=parseInt(savecode[13]);
		items[7].owned=parseInt(savecode[14]);
		items[8].owned=parseInt(savecode[15]);
		items[9].owned=parseInt(savecode[16]);
		items[10].owned=parseInt(savecode[17]);
		items[11].owned=parseInt(savecode[18]);
		items[12].owned=parseInt(savecode[19]);
		items[13].owned=parseInt(savecode[20]);
		items[14].owned=parseInt(savecode[21]);
		items[15].owned=parseInt(savecode[22]);
		items[16].owned=parseInt(savecode[23]);
		items[17].owned=parseInt(savecode[24]);
		items[18].owned=parseInt(savecode[25]);
		items[19].owned=parseInt(savecode[26]);
		items[20].owned=parseInt(savecode[27]);
		items[21].owned=parseInt(savecode[28]);
		items[22].owned=parseInt(savecode[29]);
		items[23].owned=parseInt(savecode[30]);
		items[24].owned=parseInt(savecode[31]);
		enchant_attack=parseInt(savecode[32]);
		enchant_defense=parseInt(savecode[33]);
		enchant_countdown=parseInt(savecode[34]);
		enchant_life=parseInt(savecode[35]);
		helmet=parseInt(savecode[36]);
		chestplate=parseInt(savecode[37]);
		pants=parseInt(savecode[38]);
		boots=parseInt(savecode[39]);
		theusername=savecode[40];
		theuserdesc=savecode[41];
		cheststep=parseInt(savecode[42]);
		searchtimes=parseInt(savecode[43]);
		shovelbroken=parseInt(savecode[44]);
		cursor=parseInt(savecode[45]);
		pizzaeaten=(savecode[46] === "true");
		poisoned=(savecode[47] === "true");
		chestunderground=(savecode[48] === "true");
		talk=parseInt(savecode[49]);
		wob=(savecode[50] === "true");
		buyfactory=(savecode[51] === "true");
		skill=savecode[52];
		skilllvl=parseInt(savecode[53]);
		additionalattack=parseInt(savecode[54]);
		clickcloudcount=parseInt(savecode[55]);
		openchestcount=parseInt(savecode[56]);
		candybox=(savecode[57] === "true");
		hpactive=parseInt(savecode[58]);
		airplanecountdown=parseInt(savecode[59]);
		digcountdown=parseInt(savecode[60]);
		digstep=parseInt(savecode[61]);
		currentsword=savecode[62];
		passthief=(savecode[63] === "true");
		passworms=(savecode[64] === "true");
		passgate=(savecode[65] === "true");
		unlockenchant=(savecode[66] === "true");
		unlockchest=(savecode[67] === "true");
		beatboss=(savecode[68] === "true");
		hasairplane=(savecode[69] === "true");
		reachedclouds=(savecode[70] === "true");
		defeatinvisiblebot=(savecode[71] === "true");
		gethole=(savecode[72] === "true");
		win=(savecode[73] === "true");
		hasportal=(savecode[74] === "true");
		if(savecode.length>=76) { cipherstep=parseInt(savecode[75]); } else { cipherstep=0; }
		if(savecode.length>=77) { activatemachine=(savecode[76] === "true"); } else { activatemachine=0; }
		if(savecode.length>=78) { autosave=(savecode[77] === "true"); } else { autosave=false; }
		
		checkthings();
		alert('Because of some issues, you should save your game and refresh the page for changes to apply, sorry :(');
		
	}
	else if(param=='loadlocalstorage') {
		savecode=localStorage.thegoldfactorygamesave;
		if(savecode.slice(-9)=="encrypted")savecode=atob(savecode.replace("encrypted",""));
		savecode=savecode.split("|");
		
		goldbar=parseInt(savecode[0]);
		ironbar=parseInt(savecode[1]);
		gbps=parseInt(savecode[2]);
		goldmining=parseInt(savecode[3]);
		ibpt=parseInt(savecode[4]);
		ibtime=parseInt(savecode[5]);
		ironmining=parseInt(savecode[6]);
		items[0].owned=parseInt(savecode[7]);
		items[1].owned=parseInt(savecode[8]);
		items[2].owned=parseInt(savecode[9]);
		items[3].owned=parseInt(savecode[10]);
		items[4].owned=parseInt(savecode[11]);
		items[5].owned=parseInt(savecode[12]);
		items[6].owned=parseInt(savecode[13]);
		items[7].owned=parseInt(savecode[14]);
		items[8].owned=parseInt(savecode[15]);
		items[9].owned=parseInt(savecode[16]);
		items[10].owned=parseInt(savecode[17]);
		items[11].owned=parseInt(savecode[18]);
		items[12].owned=parseInt(savecode[19]);
		items[13].owned=parseInt(savecode[20]);
		items[14].owned=parseInt(savecode[21]);
		items[15].owned=parseInt(savecode[22]);
		items[16].owned=parseInt(savecode[23]);
		items[17].owned=parseInt(savecode[24]);
		items[18].owned=parseInt(savecode[25]);
		items[19].owned=parseInt(savecode[26]);
		items[20].owned=parseInt(savecode[27]);
		items[21].owned=parseInt(savecode[28]);
		items[22].owned=parseInt(savecode[29]);
		items[23].owned=parseInt(savecode[30]);
		items[24].owned=parseInt(savecode[31]);
		enchant_attack=parseInt(savecode[32]);
		enchant_defense=parseInt(savecode[33]);
		enchant_countdown=parseInt(savecode[34]);
		enchant_life=parseInt(savecode[35]);
		helmet=parseInt(savecode[36]);
		chestplate=parseInt(savecode[37]);
		pants=parseInt(savecode[38]);
		boots=parseInt(savecode[39]);
		theusername=savecode[40];
		theuserdesc=savecode[41];
		cheststep=parseInt(savecode[42]);
		searchtimes=parseInt(savecode[43]);
		shovelbroken=parseInt(savecode[44]);
		cursor=parseInt(savecode[45]);
		pizzaeaten=(savecode[46] === "true");
		poisoned=(savecode[47] === "true");
		chestunderground=(savecode[48] === "true");
		talk=parseInt(savecode[49]);
		wob=(savecode[50] === "true");
		buyfactory=(savecode[51] === "true");
		skill=savecode[52];
		skilllvl=parseInt(savecode[53]);
		additionalattack=parseInt(savecode[54]);
		clickcloudcount=parseInt(savecode[55]);
		openchestcount=parseInt(savecode[56]);
		candybox=(savecode[57] === "true");
		hpactive=parseInt(savecode[58]);
		airplanecountdown=parseInt(savecode[59]);
		digcountdown=parseInt(savecode[60]);
		digstep=parseInt(savecode[61]);
		currentsword=savecode[62];
		passthief=(savecode[63] === "true");
		passworms=(savecode[64] === "true");
		passgate=(savecode[65] === "true");
		unlockenchant=(savecode[66] === "true");
		unlockchest=(savecode[67] === "true");
		beatboss=(savecode[68] === "true");
		hasairplane=(savecode[69] === "true");
		reachedclouds=(savecode[70] === "true");
		defeatinvisiblebot=(savecode[71] === "true");
		gethole=(savecode[72] === "true");
		win=(savecode[73] === "true");
		hasportal=(savecode[74] === "true");
		if(savecode.length>=76) { cipherstep=parseInt(savecode[75]); } else { cipherstep=0; }
		if(savecode.length>=77) { activatemachine=(savecode[76] === "true"); } else { activatemachine=0; }
		if(savecode.length>=78) { autosave=(savecode[77] === "true"); } else { autosave=false; }
		
		checkthings();
		
	}
	else if(param=="localstorage") {	
		
		if(typeof(Storage) === "undefined") {
			alert('Oh snap! It seems that HTML5 Local Storage is not supported on your browser. I recommend you to upgrade your browser or use the text saving method');
		}
		
		localStorage.thegoldfactorygamesave=btoa(goldbar+"|"+ironbar+"|"+gbps+"|"+goldmining+"|"+ibpt+"|"+ibtime+"|"+ironmining+"|"+items[0].owned+"|"+items[1].owned+"|"+items[2].owned+"|"+items[3].owned+"|"+items[4].owned+"|"+items[5].owned+"|"+items[6].owned+"|"+items[7].owned+"|"+items[8].owned+"|"+items[9].owned+"|"+items[10].owned+"|"+items[11].owned+"|"+items[12].owned+"|"+items[13].owned+"|"+items[14].owned+"|"+items[15].owned+"|"+items[16].owned+"|"+items[17].owned+"|"+items[18].owned+"|"+items[19].owned+"|"+items[20].owned+"|"+items[21].owned+"|"+items[22].owned+"|"+items[23].owned+"|"+items[24].owned+"|"+enchant_attack+"|"+enchant_defense+"|"+enchant_countdown+"|"+enchant_life+"|"+helmet+"|"+chestplate+"|"+pants+"|"+boots+"|"+theusername+"|"+theuserdesc+"|"+cheststep+"|"+searchtimes+"|"+shovelbroken+"|"+cursor+"|"+pizzaeaten+"|"+poisoned+"|"+chestunderground+"|"+talk+"|"+wob+"|"+buyfactory+"|"+skill+"|"+skilllvl+"|"+additionalattack+"|"+clickcloudcount+"|"+openchestcount+"|"+candybox+"|"+hpactive+"|"+airplanecountdown+"|"+digcountdown+"|"+digstep+"|"+currentsword+"|"+passthief+"|"+passworms+"|"+passgate+"|"+unlockenchant+"|"+unlockchest+"|"+beatboss+"|"+hasairplane+"|"+reachedclouds+"|"+defeatinvisiblebot+"|"+gethole+"|"+win+"|"+hasportal+"|"+cipherstep+"|"+activatemachine+"|"+autosave)+"encrypted";
		
		alert('Your game has been saved!');
		
	}
	else if(param=="autolocalstorage") {	
		
		if(typeof(Storage) === "undefined") {
			alert('Oh snap! It seems that HTML5 Local Storage is not supported on your browser. I recommend you to upgrade your browser or use the text saving method');
		}
		
		localStorage.thegoldfactorygamesave=btoa(goldbar+"|"+ironbar+"|"+gbps+"|"+goldmining+"|"+ibpt+"|"+ibtime+"|"+ironmining+"|"+items[0].owned+"|"+items[1].owned+"|"+items[2].owned+"|"+items[3].owned+"|"+items[4].owned+"|"+items[5].owned+"|"+items[6].owned+"|"+items[7].owned+"|"+items[8].owned+"|"+items[9].owned+"|"+items[10].owned+"|"+items[11].owned+"|"+items[12].owned+"|"+items[13].owned+"|"+items[14].owned+"|"+items[15].owned+"|"+items[16].owned+"|"+items[17].owned+"|"+items[18].owned+"|"+items[19].owned+"|"+items[20].owned+"|"+items[21].owned+"|"+items[22].owned+"|"+items[23].owned+"|"+items[24].owned+"|"+enchant_attack+"|"+enchant_defense+"|"+enchant_countdown+"|"+enchant_life+"|"+helmet+"|"+chestplate+"|"+pants+"|"+boots+"|"+theusername+"|"+theuserdesc+"|"+cheststep+"|"+searchtimes+"|"+shovelbroken+"|"+cursor+"|"+pizzaeaten+"|"+poisoned+"|"+chestunderground+"|"+talk+"|"+wob+"|"+buyfactory+"|"+skill+"|"+skilllvl+"|"+additionalattack+"|"+clickcloudcount+"|"+openchestcount+"|"+candybox+"|"+hpactive+"|"+airplanecountdown+"|"+digcountdown+"|"+digstep+"|"+currentsword+"|"+passthief+"|"+passworms+"|"+passgate+"|"+unlockenchant+"|"+unlockchest+"|"+beatboss+"|"+hasairplane+"|"+reachedclouds+"|"+defeatinvisiblebot+"|"+gethole+"|"+win+"|"+hasportal+"|"+cipherstep+"|"+activatemachine+"|"+autosave)+"encrypted";
		
		justarandomvariablename=$('#credits').html();
		$('#credits').html("(Game saved)&nbsp;"+justarandomvariablename);
		setTimeout(function() {
			$('#credits').html(justarandomvariablename);
		},5000);
		
	}
	else if(param=="reset") {	
		a=confirm("Are you sure you want to reset your game?");
		if(a) {
			b=confirm("Are you sure?");
			if(b) {
				c=confirm("Ok, the last confirmation, are you sure? Remember, this can't be undone");
				if(c) {
				
					localStorage.thegoldfactorygamesave=btoa("0|0|1|0|0|3600|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|You|This is you.|0|0|0|0|false|false|false|0|false|false|none|0|0|0|0|false|0|999999999|999999999|0|none|false|false|false|false|false|false|false|false|false|false|false|false")+"encrypted";
					checkthings();
					
					alert('Localstorage cleared, please refresh the page for\nchanges to apply (don\'t save before refreshing!)');
					
				}
			}
		}
	}
}

jQuery.fn.shake = function() {
    this.each(function(i) {
        for (var x = 1; x <= 2; x++) {
            $(this).animate({ left: 225 }, 10).animate({ left: 250 }, 50).animate({ left: 225 }, 10).animate({ left: 250 }, 50);
        }
    });
    return this;
} 



/* BATTLE SYSTEM */

function makebattle(id,name,hp,maxhp,weapon,damage,description,enemyascii,power,myhp,mymaxhp,myweapon,loop,param) {
	enemyasciis=[];
enemyasciis.push("\n\
     O\n\
    /|\\\n\
     |\n\
    / \\");
enemyasciis.push("\n\
\n\
    ~    ~\n\
  ~   ~     ~\n\
    ~    ~");
enemyasciis.push("\n\
    [_]\n\
    /|\\\n\
     |\n\
    / \\");
enemyasciis.push("\n\
     (_(\n\
    ('')\n\
  _  \"\\ )>,_     .-->\n\
  _>--w/((_ >,_.'\n\
         ///\n\
         \"`\"");
enemyasciis.push("\n\
    ___\n\
   /.. \\_\n\
 __\\0  / )\n\
(__/    /\n\
  /     \\\n\
 /_      \\\n\
   ``\"\"\"\"\"`");
enemyasciis.push("\n\
        _ (m)\n\
  __(\")/ |\n\
 ( (   )/\n\
 / |   | \n\
 \\( ( ) )\n\
  /_| |_\\");
enemyasciis.push("\n\
\\\n\
 \\ji\n\
 /.((( \n\
(,/\"(((__,--.\n\
    \\  ) _( /{ \n\
    !|| \" :||\n\
    !||   :||\n\
    '''   ''' ");
enemyasciis.push("\n\
  _W_\n\
_ (\")\n\
 \\/ /\\_\n\
  \\ \\\n\
__///__");
enemyasciis.push('\n\
     ,\n\
    {\\\\\n\
   {~ \\\\\n\
   {~=_\\\\,;._\n\
    {~-(;; \'_)\n\
   ,~---"  /\n\
~~~( )__\\ )\n\
   /))  \\\\\\\n\
   \\\\\\   \\\\\\\n\
    ``"   `"\'');
enemyasciis.push("\n\
\n\
\n\
\n\
");
enemyasciis.push("\n\
            ,^\n\
           ;  ;\n\
\\`.,'/      ; ;\n\
/_  _\\`-----';\n\
  \\/` ,,,,,, ;\n\
    )//     \\))");
enemyasciis.push("\n\
	   _  _\n\
  (o)(o)--.\n\
   \\../ (  )\n\
   m\\/m--m'`--.");
output2="<tr><td>";
output2=output2+"<pre style=\"opacity:0;\">\n\
     O\n\
    /|\\\n\
     |\n\
    / \\</pre>";
	
output2=output2+"<pre style=\"position:absolute;margin-top:-77px;\" class=\"player-"+id+"\">\n\
     O\n\
    /|\\\n\
     |\n\
    / \\</pre>";

	
if(currentsword=="Wooden Sword") { stype="Wood"; }
if(currentsword=="Stone Sword") { stype="Stone"; }
if(currentsword=="Iron Sword") { stype="Iron"; }
if(currentsword=="Diamond Sword") { stype="Diamond"; }
if(currentsword=="Emerald Sword") { stype="Diamond"; }
	
output2=output2+"<img style=\"position:absolute;\" class=\"player-sword-"+id+"\" src=\"images/sword"+stype+".png\">";

output2=output2+"<pre style=\"position:absolute;margin-top:-180px;margin-left:50px;opacity:0;\" class=\"thunder-"+id+"\">\n\
                         ___\n\
                        /  /  \n\
     ..zzzZAP!!!!!     /  /  \n\
                     _/ ./  \n\
                    / ./   \n\
                   / /  \n\
              .   /./    \n\
         ..   |  //  .    \n\
      .   \\\\  | /' .'  .  \n\
       ~-. `     ' .-~  \n\
           _.oOOo._       </pre>";	
	
output2=output2+"</td><td style=\"width:50px;\"></td><td>";
output2=output2+"<pre style=\"opacity:0;\">"+enemyasciis[enemyascii]+"</pre>";

if(enemyascii==3) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-120px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==4) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-140px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==5) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-125px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==6) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-165px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==7) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-103px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==8) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-210px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else if(enemyascii==10) {
	output2=output2+"<pre style=\"position:absolute;margin-top:-125px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}
else {
	output2=output2+"<pre style=\"position:absolute;margin-top:-77px;\" class=\"enemy-"+id+"\">"+enemyasciis[enemyascii]+"</pre>";
}

if(name=="Thief") {
	output2=output2+"<img style=\"position:absolute;\" class=\"enemy-sword-"+id+"\" src=\"images/swordWood.png\">";
}
else if(name=="Castle Guard") {
	output2=output2+"<img style=\"position:absolute;\" class=\"enemy-sword-"+id+"\" src=\"images/swordGold.png\">";
}
else if(name=="Castle Staff") {
	output2=output2+"<img style=\"position:absolute;\" class=\"enemy-sword-"+id+"\" src=\"images/swordIron.png\">";
}
else if(name=="Zombie King") {
	output2=output2+"<img style=\"position:absolute;\" class=\"enemy-sword-"+id+"\" src=\"images/swordDiamond.png\">";
}


output2=output2+"</td></tr><tr><td>";
output2=output2+"<span class=\"you-"+id+"\">"+theusername+"</span> (<span class=\"player-"+id+"-hp\">"+myhp+"</span>/"+mymaxhp+")<br>Damage: "+power+"<br>Weapon: "+myweapon+"<br>\"<span class=\"you-desc-"+id+"\">"+theuserdesc+"</span>\"";
output2=output2+"</td><td><div style=\"text-align:center;\">VS</div></td><td>";
output2=output2+name+" (<span class=\"enemy-"+id+"-hp\">"+hp+"</span>/"+maxhp+")<br>Damage: "+damage+"<br>Weapon: "+weapon+"<br>\""+description+"\"";
output2=output2+"</td></tr>";

output="<table id=\"battle-"+id+"\">"+output2+"</table><br><div class=\"buttons-"+id+"\"><input type=\"button\" value=\"Attack!\" class=\"button-attack-"+id+"\" onclick=\"attackenemy("+id+","+power+","+hp+",'"+param+"')\"><input type=\"button\" value=\"["+items[7].owned+"] Drink health potion\" style=\"display:none;\" class=\"button-health-"+id+"\" onclick=\"drinkhealthpotion("+id+")\"><input type=\"button\" value=\"Use skill\" style=\"display:none;\" class=\"button-skill-"+id+"\" onclick=\"usetheskill("+id+")\"><br>\n\
<input type=\"button\" value=\"["+items[11].owned+"] empty\" class=\"button-potion-11-"+id+"\" onclick=\"usepotion(11,"+id+")\">\n\
<input type=\"button\" value=\"["+items[12].owned+"] poison\" class=\"button-potion-12-"+id+"\" onclick=\"usepotion(12,"+id+")\">\n\
<input type=\"button\" value=\"["+items[13].owned+"] confusion\" class=\"button-potion-13-"+id+"\" onclick=\"usepotion(13,"+id+")\">\n\
<input type=\"button\" value=\"["+items[14].owned+"] invisibility\" class=\"button-potion-14-"+id+"\" onclick=\"usepotion(14,"+id+")\">\n\
<input type=\"button\" value=\"["+items[15].owned+"] instant countdown\" class=\"button-potion-15-"+id+"\" onclick=\"usepotion(15,"+id+")\">\n\
<input type=\"button\" value=\"["+items[16].owned+"] suicide\" class=\"button-potion-16-"+id+"\" onclick=\"usepotion(16,"+id+")\">\n\
<input type=\"button\" value=\"["+items[17].owned+"] cookie\" class=\"button-potion-17-"+id+"\" onclick=\"usepotion(17,"+id+")\">\n\
<input type=\"button\" value=\"["+items[18].owned+"] X\" class=\"button-potion-18-"+id+"\" onclick=\"usepotion(18,"+id+")\"> <span class=\"potion-countdown-"+id+"\"></span></div>";

	if(hp<=0) {
		//win
		setTimeout(function(){winbattle(param,id);},2000);
	}
	else if(myhp<=0) {
		//lose
		setTimeout(function(){closemessage();},2000);
	}
	else {
		// this should have happened already, but just in case
		stop_battle_timers();

		if(poisoned) {
			$(".player-"+id+"-hp").html(10);
			myhealthpoint(true,10);
		}
		else {
			myhealthpoint(true,myhp);
		}
		enemyhealthpoint(true,hp);
		enemyhealthpoint2(true,hp);
		enemy_attack_timer = setTimeout(function(){enemyattack(id,damage);},2000+Math.random()*1000);
		theparam(true,param);
		isinvuln(true,false);
		battlestop(true,false);
		enemyconfused(true,false);
		isinvisible(true,false);
		theenemyascii(true,enemyascii);
		theenemyname123(true,name);
		$(".modal").fadeIn();
		attackdelay(id,0);
		healthdelay(id,0);
		skilldelay(id,0);
	}
	
	var init_func = function() { 
						checkhealthbutton(id);
						checkskillbutton(id);
						checkpotionsbutton(id);
				};
	
	if(!loop) {
		return { html: output,
			     init: init_func
				};
	}
	else {
		$("#battle-"+id).html(output2);
		init_func();
	}
}
function enemyattack(id,damage) {
	if(id=="clear") {
		//clearTiemout(asdasdf);
	}
	else {
		$(".button-health-"+id).attr("onclick","drinkhealthpotion("+id+","+myhealthpoint(false,0)+")");
		if(myhealthpoint(false,0)<=0) {
			battle_ended();
			setTimeout(function(){closemessage();},0);
			//clearTiemout(asdasdf);
		}
		else {
			if(battlestop(false,0)==false) {
				enemyisattacking=true;
				if(!enemyconfused(false,0)) {
					$(".enemy-"+id).animate({"margin-left":-160+"px"},200);
					$(".enemy-sword-"+id).animate({"margin-left":-160+"px"},200);
				}
				enemy_attack_timer = setTimeout(function(){
					// actually perform the attack
					// this timer is set to coincide with the completion of the above animate() calls [200ms]
					lagipusing=false;
					if(isinvuln(false,0)==false) {
						if(enemyconfused(false,0)) {
							enemyhp=enemyhealthpoint(false,0);
							enemyhp-=damage;
							enemyhealthpoint(true,enemyhp);
							$(".enemy-"+id+"-hp").html(enemyhp);
							enemyconfused(true,false);
							lagipusing=true;
							
							if(enemyhealthpoint(false,0)<=0) {
								thenewhp=enemyhealthpoint(true,0);
								$(".enemy-"+id+"-hp").html("0");
								$(".button-attack-"+id).attr("disabled","disabled");
								setTimeout(function(){winbattle(theparam(false,0),id);},0);
								return;
							}
							
						}
						else {
							myhp=myhealthpoint(false,0);
							absorb=helmet+chestplate+pants+boots;
							myhp-=damage-Math.round(damage*(absorb/100));
							myhealthpoint(true,myhp);
						}
					}
					if(myhealthpoint(false,0)<=0) {
						myhealthpoint(true,0)
						myhp=myhealthpoint(false,0);
						enemyattack(id,damage,myhp);
						if(!lagipusing) {
							$(".enemy-"+id).animate({"margin-left":0+"px"},200);
							$(".enemy-sword-"+id).animate({"margin-left":21+"px"},200);
						}
						$(".player-"+id+"-hp").html(myhp);
						$(".button-attack-"+id).attr("disabled","disabled");
					}
					else {
						myhp=myhealthpoint(false,0);
						$(".player-"+id+"-hp").html(myhp);
						if(!lagipusing) {
							$(".enemy-"+id).animate({"margin-left":0+"px"},200);
							$(".enemy-sword-"+id).animate({"margin-left":21+"px"},200);
						}
						enemyisattacking=false;
						if(theenemyname123(false,0)=="Mr. Professor") {
							hp=enemyhealthpoint(false,0);
							hp+=3;
							enemyhealthpoint(true,hp);
							$(".enemy-"+id+"-hp").html(hp);
						}
						// Schedule a new attack
						enemy_attack_timer = setTimeout(function(){enemyattack(id,damage);},1800+Math.random()*1000);
					}
				},200);
			}
		}
		$(".button-health-"+id).attr("onclick","drinkhealthpotion("+id+","+myhealthpoint(false,0)+")");
	}
}
function attackenemy(id,power,hp,param) {
	if(theenemyascii(false,0)==9 && isinvisible(false,0)==false) {
		alert('You can\'t attack the bot because you can\'t see it');
		return;
	}
	if(enemyhealthpoint(false,0)<=0) {
		enemyattack("clear",0);
		setTimeout(function(){winbattle(param,id);},0);
	}
	else {
		if(id>0) {
			if(enchant_countdown==1) { mindelay=2; } else { mindelay=3; }
			myhp=myhealthpoint(false,0);
			myhp+=enchant_life*2;
			powerhp();
			if(myhp>thisismyhp) {
				myhp=thisismyhp;
			}
			myhealthpoint(true,myhp);
			$(".player-"+id+"-hp").html(myhp);
			playerisattacking=true;
			attackdelay(id,mindelay);
			$(".player-"+id).animate({"margin-left":160+"px"},200);
			$(".player-sword-"+id).animate({"margin-left":200+"px"},200);
			setTimeout(function(){
				hp=enemyhealthpoint(false,0);
				if(theenemyname123(false,0)=="Mr. Professor") {
					power-=Math.round(power*5/100);
				}
				hp-=power;
				enemyhealthpoint(true,hp);
				if(enemyhealthpoint(false,0)<=0) {
					thenewhp=enemyhealthpoint(true,0);
					attackenemy(id,power,hp,param);
					$(".player-"+id).animate({"margin-left":0+"px"},200);
					$(".player-sword-"+id).animate({"margin-left":50+"px"},200);
					$(".enemy-"+id+"-hp").html("0");
					$(".button-attack-"+id).attr("disabled","disabled");
				}
				else {
					hp=enemyhealthpoint(false,0);
					$(".enemy-"+id+"-hp").html(hp);
					$(".player-"+id).animate({"margin-left":0+"px"},200);
					$(".player-sword-"+id).animate({"margin-left":50+"px"},200);
					$(".button-attack-"+id).attr("onclick","attackenemy("+id+","+power+","+hp+",'"+param+"')");
					playerisattacking=false;
				}
			},200);
		}
	}
}
function attackdelay(id,sec) {
	if(sec!=0) {
		$(".button-attack-"+id).attr("disabled","disabled");
		$(".button-attack-"+id).attr("value","Attack! ("+sec+")");
		sec--;
		attacktimeout=setTimeout(function(){attackdelay(id,sec);},1000);
	}
	else {
		$(".button-attack-"+id).removeAttr("disabled");
		$(".button-attack-"+id).attr("value","Attack!");
	}
}
function checkhealthbutton(id) {
	if(items[7].owned!=0) {
		$(".button-health-"+id).show();
	}
	else {
		$(".button-health-"+id).hide();
	}
}
function checkskillbutton(id) {
	if(skill!="none") {
		$(".button-skill-"+id).show();
	}
	else {
		$(".button-skill-"+id).hide();
	}
}
function checkpotionsbutton(id) {
	for(i=11;i<=18;i++) {
		thepotionname=items[i];
		if(thepotionname.owned>0) {
			$(".button-potion-"+i+"-"+id).show();
		}
		else {
			$(".button-potion-"+i+"-"+id).hide();
		}
	}
}
function drinkhealthpotion(id) {
	if(items[7].owned!=0) {
		if(enchant_countdown==1) { mindelay=6; } else { mindelay=7; }
		items[7].owned-=1;
		checkhealthbutton(id);
		checkthings();
		myhp=myhealthpoint(false,0);
		myhp+=50;
		powerhp();
		if(myhp>hp) {
			myhp=hp;
		}
		myhealthpoint(true,myhp);
		$(".player-"+id+"-hp").html(myhp);
		$(".button-health-"+id).attr("onclick","drinkhealthpotion("+id+","+myhp+")");
		healthdelay(id,mindelay);
	}
}
function usetheskill(id) {
	if(skill!="none") {
		if(enchant_countdown==1) { mindelay=18; } else { mindelay=20; }
		if(skill=="thunder") {
			enemyhp=enemyhealthpoint(false,0);
			enemyhp-=20+skilllvl*7;
			enemyhealthpoint(true,enemyhp);
			if(enemyhealthpoint(false,0)<=0) {
				enemyhealthpoint(true,0);
			}
			$(".enemy-"+id+"-hp").html(enemyhp);
			$(".thunder-"+id).css("opacity","1");
			$(".alert").shake();
			setTimeout(function() {
				$(".thunder-"+id).css("opacity","0");
				if(enemyhealthpoint(false,0)<=0) {
					setTimeout(function(){winbattle(theparam(false,0),id);},0);
				}
			},300);
			skilldelay(id,mindelay);
		}
		else {
			$(".player-"+id).css("opacity","0.5");
			isinvuln(true,true);
			invulnerabilitydelay=setTimeout(function() {
				$(".player-"+id).css("opacity","1");
				isinvuln(true,false);
			},(3+(skilllvl*3))*1000);
			skilldelay(id,mindelay+(3+(skilllvl*3)));
		}
	}
}
function usepotion(pid,id) {
	if(items[pid].owned>=1) {
		items[pid].owned--;
		checkpotionsbutton(id);
		thepotionname=items[pid].name.replace(" potion","");
		$(".button-potion-"+pid+"-"+id).val("["+items[pid].owned+"] "+thepotionname);
		if(enchant_countdown==1) { mindelay=6; } else { mindelay=7; }
		potiondelay(id,mindelay)
		
		if(pid==12) {
			damage=Math.round(Math.random()*100/3);
			hp=enemyhealthpoint(false,0);
			hp-=damage;
			if(hp<=0) {
				hp=0;
			}
			enemyhealthpoint(true,hp);
			$(".enemy-"+id+"-hp").html(hp);
			if(enemyhealthpoint(false,0)<=0) {
				setTimeout(function(){winbattle(theparam(false,0),id);},0);
			}
		}
		else if(pid==13) {
			enemyconfused(true,true);
		}
		else if(pid==14) {
			$(".player-"+id).css("opacity",0);
			isinvisible(true,true);
		}
		else if(pid==15) {
			if(typeof attacktimeout !== 'undefined') {
				clearTimeout(attacktimeout);
			}
			if(typeof healthtimeout !== 'undefined') {
				clearTimeout(healthtimeout);
			}
			if(typeof skilltimeout !== 'undefined') {
				clearTimeout(skilltimeout);
			}
			attackdelay(id,0);
			healthdelay(id,0);
			skilldelay(id,0);
		}
		else if(pid==16) {
			myhealthpoint(true,0);
			$(".player-"+id+"-hp").html(0);
		}
		else if(pid==17) {
			prompt("What the...","MS4wMzkzfHwxMzc4ODMwNjMyODc2O05hTjsxMzgzMjM5MTM4NTc1fDAwMTEwMHwxOTI5ODUyNzY5LjA2MDA1NTs3MDY0MjEyNzE3NDkuMTAyMzs4Mjk3OzE5OzEzODI1NTk5NDIxLjg4MTQ0Mzs4MDstMTstMTswOzA7MDswOzY3OzQ3OTY5OzA7MDswOzB8MTI4LDEyOSw3Njg0NTM2MjE3LDA7MTA1LDEwNiwyMzc2Njc5MzIwLDA7MTAxLDEwMSw1NDE3MzU5OCwwOzEwMSwxMDEsMjM5MDExOTgxLDE7ODIsODIsNjEzNDEwODI2LDA7NTgsNTgsMTQxNDg4MTkyNiwwOzUwLDUwLDI4MzExMzI1NzIsMDs1MCw1MCw0MDU2NjYyNTI3MywwOzI3LDI3LDY2NDU0OTU1NDYwLDA7MTYsMTYsMjI3NzgyMzIwNDU0LDA7fDQ1MDM1OTk2MjczNzA0OTU7NDUwMzEwMDMzNzQyMjMzNTsyMjUxODM0MTczNDAxNzAzOzM5NDA2NDk2NzM5NTk5MzU7MjI1MTc5OTk0NTgwNTk2MzsxMzc0Mzg5NTM0NzN8NDUwMzA0Nzc5MTA4MzUxOTsyMzkyODE2NzQwMTEyMDkxOzEwMjU%3D%21END%21");
		}
		else if(pid==18) {
			rand=Math.round(Math.random()*1000);
			$(".you-"+id).html('Player-'+rand);
			$(".you-desc-"+id).html('Player number '+rand);
			checkthings();
		}
		
	}
}
function potiondelay(id,sec) {
	if(sec!=0) {
		$("[class^=button-potion-]").attr("disabled","disabled");
		$(".potion-countdown-"+id).html("("+sec+" sec)");
		sec--;
		potiontimeout = setTimeout(function(){potiondelay(id,sec);},1000);
	}
	else {
		$("[class^=button-potion-]").removeAttr("disabled");
		$(".potion-countdown-"+id).html("");
		potiontimeout = undefined;
	}
}
function skilldelay(id,sec) {
	if(sec!=0) {
		$(".button-skill-"+id).attr("disabled","disabled");
		$(".button-skill-"+id).attr("value","Use skill ("+sec+")");
		sec--;
		skilltimeout=setTimeout(function(){skilldelay(id,sec);},1000);
	}
	else {
		$(".button-skill-"+id).removeAttr("disabled");
		$(".button-skill-"+id).attr("value","Use skill");
		skilltimeout = undefined;
	}
}
function healthdelay(id,sec) {
	if(sec!=0) {
		$(".button-health-"+id).attr("disabled","disabled");
		$(".button-health-"+id).attr("value","["+items[7].owned+"] Drink health potion ("+sec+")");
		sec--;
		healthtimeout=setTimeout(function(){healthdelay(id,sec);},1000);
	}
	else {
		$(".button-health-"+id).removeAttr("disabled");
		$(".button-health-"+id).attr("value","["+items[7].owned+"] Drink health potion");
		healthtimeout = undefined;
	}
}

// stop all of the background timers for the current battle
function stop_battle_timers() {
	// it is expected that the enemy is either attacking or preparing to attack; put a stop to that immediately.
	if (typeof enemy_attack_timer !== 'undefined') { clearTimeout(enemy_attack_timer); enemy_attack_timer = undefined; }

		if(typeof attacktimeout !== 'undefined') {
			clearTimeout(attacktimeout);
			attacktimeout = undefined;
		}
		if(typeof healthtimeout !== 'undefined') {
			clearTimeout(healthtimeout);
			healthtimeout = undefined;
		}
		if(typeof skilltimeout !== 'undefined') {
			clearTimeout(skilltimeout);
			skilltimeout = undefined;
		}
		if(typeof invulnerabilitydelay !== 'undefined') {
			clearTimeout(invulnerabilitydelay);
			invulnerabilitydelay = undefined;
		}
}

// perform cleanup at the end of the battle, regardless of outcome
function battle_ended() {
	// signal to others that the battle has ended
	battlestop(true, true);
	stop_battle_timers();
}

function myhealthpoint(set,health) { if(!set) { return myhp; } else { myhp=health; } }
function enemyhealthpoint(set,health) { if(!set) { return enemyhp; } else { enemyhp=health; } }
function enemyhealthpoint2(set,health) { if(!set) { return enemyhp2; } else { enemyhp2=health; } }
function theparam(set,param) { if(!set) { return theparameter; } else { theparameter=param; } }
function isinvuln(set,invuln) { if(!set) { return invulncond; } else { invulncond=invuln; } }
function battlestop(set,stop) { if(!set) { return isstop; } else { isstop=stop; } }
function enemyconfused(set,confused) { if(!set) { return isconfused; } else { isconfused=confused; } }
function isinvisible(set,invisibility) { if(!set) { return amiinvisible; } else { amiinvisible=invisibility; } }
function theenemyascii(set,asciiartno) { if(!set) { return theasciiartno; } else { theasciiartno=asciiartno; } }
function theenemyname123(set,enemyname) { if(!set) { return theenemyname; } else { theenemyname=enemyname; } }
function winbattle(param,id) {
	myfinalhp=myhealthpoint(false,0);
	myhealthpoint(true,99999999999999999999);
	battle_ended();
	if(param=="vs-thief") {
		passthief=true;
		closemessage();
		makealert("new-shop","Thanks!","Hi, i'm Andrew, thanks for helping us kill the thief!<br>Btw I just built a new shop, maybe you want to buy something",true);
		checkthings();
	}
	else if(param=="vs-worms"){
		passworms=true;
		closemessage();
		makealert("underground-world","Underground World!","Wow! You discovered an underground world! :o",true);
		checkthings();
	}
	else if(param=="training"){
		closemessage();
		additionalattack+=1;
		checkthings();
	}
	else if(param=="vs-monster"){
		closemessage();
		unlockenchant=true;
		makealert("enchant-unlocked","Enchanting shop","You can visit enchanting shop and enchant your sword now!<br>And the owner of the enchanting shop gives you 5000 goldbars as a reward!",true);
		goldbar+=5000;
	}
	else if(param=="vs-ghost"){
		closemessage();
		unlockchest=true;
chest='\n\
   __________\n\
  /\\____;;___\\\n\
 | /         /\n\
 `. ())oo() .\n\
  |\\(%()*^^()^\\\n\
 %| |-%-------|\n\
% \\ | %  ))   |\n\
%  \\|%________|\n\
 %%%%';
		goldbar+=10000;
		html="<div class=\"alert alert-chest-unlocked\"><b>A Chest!</b><br>The chest contains 5000 goldbars + an ancient scroll<br><br><pre>"+chest+"</pre><br><br><input type=\"button\" value=\"Read scroll\" onclick=\"readscroll()\"></div>";
		$("#otheralerts").append(html);
		closemessage();
		$(".alert-chest-unlocked").fadeIn("fast");
	}
	else if(param=="vs-castle-guard"){
		$(".buttons-"+id).hide();
		setTimeout(function(){
			closemessage();
			castlegotohall(myfinalhp);
		},2000);
	}
	else if(param=="vs-castle-staff"){
		$(".buttons-"+id).hide();
		setTimeout(function(){
			closemessage();
			castlegotoking(myfinalhp);
		},2000);
	}
	else if(param=="vs-castle-boss"){
		closemessage();
		if(beatboss) {
			makealert("castle-beated","Yay!","You defeated the boss (again)! No more nether stones for ya! :(",true);
		}
		else {
			makealert("castle-beated","Yay!","You defeated the boss! And you found 14 nether stones!",true);
			beatboss=true;
			items[9].owned=14;
		}
	}
	else if(param.slice(0,14)=="in-the-nether-"){
		$(".buttons-"+id).hide();
		param=param.replace('in-the-nether-','');
		param++;
		setTimeout(function(){
			enterportal(param,myfinalhp);
		},2000);
	}
	else if(param=="vs-invisible-bot"){
		if(defeatinvisiblebot) {
			makealert("no-more-items","No more items :(","Sorry, I have no more items to give you :(",true);
		}
		else {
			defeatinvisiblebot=true;
			makealert("defeat-invisible","Thanks!","Thanks for helping me! I have some items for you<br>And I also give you an emerald sword, hope this can be useful",true);
			items[21].owned=1;
			items[22].owned=1;
			currentsword="Emerald Sword";
			goldbar+=10000;
			ironbar+=10000;
			for(i=11;i<=15;i++) {
				items[i].owned+=randomnumber(1,5);
			}
		}
	}
	else if(param=="vs-fox"){
scroll='\n\
   _______________________\n\
 =(__    ___      __     _)=\n\
   |                     |\n\
   | Ring-ding-ding-ding |\n\
   |  -dingeringeding!   |\n\
   |                     |\n\
 =(_______________________)=\n\
';
		makealert("fox-scroll","A scroll","The fox drops a scroll:<br><br><pre>"+scroll+"</pre>",true);
	}
	else if(param=="vs-boss"){
		win=true;
		$(".buttons-"+id).hide();
		$(".enemy-"+id+"-hp").html('1');
		setTimeout(function(){
			makealert("boss-win","Almost!","<marquee direction=\"up\" scrollamount=\"2\" scrolldelay=\"1\" onmouseover=\"this.stop()\" onmouseout=\"this.start();\" behavior=\"slide\">You (almost) killed the guy<br>but he successfully recover 1 hp before dying<br><br><br><br><br><br>But....<br><br><br><br>You have learned something.......<br><br><br><br><br><br><br><br>You can't solve a problem by doing a revenge......<br><br><br><br><br><br><br><br>The best way is to talk to the guy himself and forgive him......<br><br><br><br><br><br><br><br>Since killing won't solve the problem......<br><br><br><br><br><br><br><br>You have talked to him and forgive him<br><br><br><br>Everything is normal now<br><br><br><br>And now he wants you to teleport back to the real world.............<br><br><br><br>But, you finally choose to live in this 'weird' world<br><br><br><br>You have done so many things in this world<br><br><br><br>and you learned to love this world<br><br><br><br>and you don't even want to go back<br><br><br><br><br><br><br><br>Oh, btw he has a chest for you<br><br><br><br><input type='button' onclick='openthechestfromsomeone()' value='Open the chest'><br><br></marquee>",true);
			$(".button-close-window-boss-win").hide();
		},2000);
	}
	else if(param=="vs-rat"){
		closemessage();
		reward=enemyhealthpoint2(false,0);
		goldbar+=reward;
		makealert("win-vs-rat","The rat died","You killed the rat, and your boss gave you "+reward+" gold bars!<br><br><input type='button' value=\"Kill more rats!\" onclick='battlevsrats()'>",true);
	}
	
	if(param!="vs-rat"){
		reward=enemyhealthpoint2(false,0);
		goldbar+=reward;
	}
	
}

/* DIGGING SYSTEM */

function dig(countdown,cheat) {
	if(items[1].owned>0 || cheat) {
		if(digstep==1 && shovelbroken==0 && !cheat) {
			shovelbroken++;
			items[1].owned--;
			makealert("shovel-broken","Shovel is broken :(","Oh snap, the shovel is broken",true);
			return;
		}
		if(digstep==4 && shovelbroken==1 && !cheat) {
			shovelbroken++;
			items[1].owned--;
			makealert("shovel-broken","Shovel is broken :(","Oh snap, the shovel is broken (again!)",true);
			return;
		}
		if(countdown) {
			if(digcountdown==999999999) {
				digcountdown=30;
				closemessage();
				dig(true,false);
				digabcd=setInterval(function(){digcountdown--;},60000);
			}
			else {
				makealert("dig-countdown","Digging","You are currently digging<br>Time left: <span class='digcd'>"+digcountdown+"</span> 	minute(s) remaining",true);
			}
			return;
		}
		if(digstep==0) {
			digstep++;
			$(".digging").removeClass("hidden");
			$(".small-hole").css("left","790px");
			if(!cheat) { closemessage(); }
		}
		else if(digstep==1) {
			digstep++;
			$(".dig-get-chest").removeClass("hidden");
			$(".small-hole").css("left","1000px");
			if(!cheat) { closemessage(); }
		}
		else if(digstep==2) {
			digstep++;
			$(".dig-pizzas").removeClass("hidden");
			$(".small-hole").css("left","1200px");
			if(!cheat) { closemessage(); }
		}
		else if(digstep==3) {
			digstep++;
			$(".dig-laptop").removeClass("hidden");
			$(".small-hole").css("left","1500px");
			$(".small-hole").css("width","50px");
			if(!cheat) { closemessage(); }
		}
		else if(digstep==4) {
			digstep++;
			$(".dig-sign").removeClass("hidden");
			$(".small-hole").css("left","1700px");
			$(".small-hole").css("width","50px");
			$(".small-hole").css("cursor","default");
			$(".small-hole").css("title","");
			if(!cheat) { closemessage(); }
		}
	}
	else {
		closemessage();
		makealert("no-shovel","No shovel?","It seems that you have no shovel, please buy a shovel to dig",true);
	}
}

/* POTIONS MAKING SYSTEM */

function updateitemlist() {
	$("#itemlist").html('');
	current=$("#itemlist").html();
	$("#itemlist").html(current+'<option value="goldbar">Gold bar ['+goldbar+']</option>');
	current=$("#itemlist").html();
	$("#itemlist").html(current+'<option value="ironbar">Iron bar ['+ironbar+']</option>');
	for(i=0;i<items.length;i++) {
		current=$("#itemlist").html();
		item=items[i];
		valid=true;
		for(j=0;j<swords.length;j++) {
			sword=swords[j];
			if(sword.name==item.name) {
				valid=false;
			}
		}
		if(item.owned!=0 && valid) {
			$("#itemlist").html(current+'<option value="'+i+'">'+item.name+' ['+item.owned+']</option>');
		}
	}
	//setTimeout(function(){updateitemlist();},100);
}
function thecauldron(act,id,quantity) {
	if(act=="make") {
		cauldron=[];
	}
	else if(act=="add") {
		cauldron.push({"id":id,"quantity":quantity});
	}
	else if(act=="show") {
		$("#goingtobemixed").html('');
		for(i=0;i<cauldron.length;i++) {
			thehtml=$("#goingtobemixed").html();
			now=cauldron[i];
			if(now.id=="goldbar") {
				$("#goingtobemixed").html(thehtml+"<br>"+now.quantity+" gold bar(s)");
			}
			else if(now.id=="ironbar") {
				$("#goingtobemixed").html(thehtml+"<br>"+now.quantity+" iron bar(s)");
			}
			else {
				$("#goingtobemixed").html(thehtml+"<br>"+now.quantity+" "+items[now.id].name+"(s)");
			}
		}
	}
	else if(act=="return") {
		return cauldron;
	}
}
function putitem() {
	quantity=$("#quantity").val();
	theitem=$("#itemlist").val();
	if(!isNaN(parseFloat(quantity)) && parseFloat(quantity) != "") {
		quantity=Math.abs(Math.round(parseFloat(quantity)));
		if(theitem=="goldbar") {
			if(quantity>goldbar) {
				quantity=goldbar;
			}
			goldbar-=quantity;
		}
		else if(theitem=="ironbar") {
			if(quantity>ironbar) {
				quantity=ironbar;
			}
			ironbar-=quantity;
		}
		else {
			item=items[theitem];
			if(quantity>item.owned) {
				quantity=item.owned;
			}
			item.owned-=quantity;
		}
		thecauldron("add",theitem,quantity);
		thecauldron("show",0,0);
		updateitemlist();
	}
}
function mixitems() {
	cldr=thecauldron("return",0,0);
	if(cldr[0]!=null && cldr[1]!=null && cldr[0].id==7 && cldr[0].quantity % 1 == 0 && cldr[1].id=="goldbar" && cldr[1].quantity % 100 == 0) {
		if((cldr[1].quantity/100) == (cldr[0].quantity/1)) {
			alert('You made '+(cldr[1].quantity/100)+' empty potion(s)!');
			items[11].owned+=cldr[1].quantity/100;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id==11 && cldr[0].quantity % 1 ==0 && cldr[1].id==7 && cldr[1].quantity % 1 ==0 && cldr[2].id=="ironbar" && cldr[2].quantity % 100 == 0) {
		if((cldr[2].quantity/100) == (cldr[0].quantity/1) && (cldr[0].quantity/1) == (cldr[1].quantity/1)) {
			alert('You made '+cldr[2].quantity/100+' poison potion(s)!');
			items[12].owned+=cldr[2].quantity/100;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[0].id==12 && cldr[0].quantity%1==0 && cldr[1].id=="goldbar" && cldr[1].quantity%200==0) {
		if(cldr[0].quantity/1 == cldr[1].quantity/200) {
			alert('You made '+cldr[1].quantity/200+' confusion potion(s)!');
			items[13].owned+=cldr[1].quantity/200;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[0].id==11 && cldr[0].quantity%1==0 && cldr[1].id=="ironbar" && cldr[1].quantity%500==0) {
		if(cldr[1].quantity/500 == cldr[0].quantity/1) {
			alert('You made '+cldr[1].quantity/500+' invisibility potion(s)!');
			items[14].owned+=cldr[1].quantity/500;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id==11 && cldr[0].quantity%1==0 && cldr[1].id==19 && cldr[1].quantity%20==0 && cldr[2].id=="goldbar" && cldr[2].quantity%2000==0) {
		if(cldr[2].quantity/2000 == cldr[1].quantity/20 && cldr[1].quantity/20 == cldr[0].quantity/1) {
			alert('You made '+cldr[2].quantity/2000+' instant countdown potion(s)!');
			items[15].owned+=cldr[2].quantity/2000;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[3]!=null && cldr[4]!=null && cldr[5]!=null && cldr[6]!=null && cldr[7]!=null && cldr[8]!=null && cldr[0].id==11 && cldr[0].quantity==1 && cldr[1].id==12 && cldr[1].quantity==1 && cldr[2].id==13 && cldr[2].quantity==1 && cldr[3].id==14 && cldr[3].quantity==1 && cldr[4].id==15 && cldr[4].quantity==1 && cldr[5].id==16 && cldr[5].quantity==1 && cldr[6].id==17 && cldr[6].quantity==1 && cldr[7].id=="goldbar" && cldr[7].quantity==100000 && cldr[8].id=="ironbar" && cldr[8].quantity==100000) {
		alert('You made a X potion :o');
		items[18].owned++;
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id==11 && cldr[0].quantity%1==0 && cldr[1].id==12 && cldr[1].quantity%1==0 && cldr[2].id==13 && cldr[2].quantity%1==0) {
		if(cldr[0].quantity/1 == cldr[1].quantity/1 && cldr[1].quantity/1 == cldr[2].quantity/1) {
			alert('You made '+cldr[2].quantity/1+' suicide potion(s)!');
			items[16].owned+=cldr[2].quantity/1;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[0].id==11 && cldr[0].quantity%1==0 && cldr[1].id==19 && cldr[1].quantity%500==0) {
		if(cldr[1].quantity/500 == cldr[0].quantity/1) {
			alert('You made '+cldr[1].quantity/500+' cookie potion(s)!');
			items[17].owned+=cldr[1].quantity/500;
		}
		else {
			alert('To make multiple potions, please make sure to multiply ALL ingredients needed');
		}
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id=="goldbar" && cldr[0].quantity==1 && cldr[1].id=="ironbar" && cldr[1].quantity==1 && cldr[2].id==7 && cldr[2].quantity==1) {
		alert('You made a secret potion!');
		
		/*
			This potion is made specially for you
			Yeah, you, the one who is reading this text
		*/
		
		items[20].owned++;
	}
	else if(cldr[0]!=null && cldr[1]!=null && cldr[2]!=null && cldr[0].id==10 && cldr[0].quantity==1 && cldr[1].id==18 && cldr[1].quantity==1 && cldr[2].id=="ironbar" && cldr[2].quantity==1000) {
		if(items[25].owned==0) {
			alert('You made a magical iron melter!\nBut you need a place to put it, hmmm....');
			items[25].owned+=1;
		}
		else {
			alert('You can\'t make more than one magical iron multiplier');
		}
	}
	else if(cldr[0]!=null && cldr[0].id=="ironbar" && cldr[0].quantity%10==0) {
		alert('You made '+cldr[0].quantity/10+' shuriken(s)!');
		items[26].owned+=cldr[0].quantity/10;
	}
	else {
		alert('You made nothing, please make sure you put the items in order!');
	}
	thecauldron("make",0,0);
	thecauldron("show",0,0);
	updateitemlist();
}

function makebosshappy() {
	closemessage();
	makealert("how-to-make-boss-happy","Make your boss happier","To make him happier and get some bonus gold bars, you can do these things:<br><br><input type='button' value='Kill some rats that sometimes enter the factory at night' onclick='killrats()'><br><input type='button' value='Help him ciphering codes' onclick='ciphercode()'>",true);
}
function killrats() {
	if(items[2].owned==0) {
		closemessage();
		makealert("no-weapon","No weapon","Oh snap, it seems that you don't have any weapon therefore you can't kill rats",true);
	}
	else {
		closemessage();
		makealert("kill-rats","Kill some rats","For you, searching the rats is not a big deal, the problem is the stronger you are, the rats are stronger too! :o<br><br><input type='button' value=\"I'm ready!\" onclick='battlevsrats()'>",true);
	}
}
function ciphercode() {

	closemessage();
	
	if(cipherstep==0) {
		codetocipher="13-1-19-20-5-18 2-18-1-14-3-8";
	}
	else if(cipherstep==1) {
		codetocipher="Lzwjw ak s ljwskmjw zavvwf kgewozwjw, al ak dguslwv sl s kwujwl hdsuw af lzw Hsuaxau Guwsf";
	}
	else if(cipherstep==2) {
		codetocipher="Om s ept;f gi;; pg n;pvld";
	}
	else if(cipherstep==3) {
		codetocipher="VGhlIHBsYW50IGlzIGZhbW91cyBiZWNhdXNlIG9mIHR<br>oZSBhYmlsaXR5IHRvIGN1cmUgc29tZSBkaXNlYXNlcw==";
	}
	else if(cipherstep==4) {
		codetocipher="towiiag g se&nbsp;&nbsp;&nbsp;rir,oaoan&nbsp;&nbsp;&nbsp;ft ofo srtod tddyi ot mdy lugelelmwon foemsthiuaa ttclntclga&nbsp;&nbsp;bhhs (apparently for around 2 years there was a mistake in the code, it has been fixed, sorry)";
	}

	if(cipherstep<5) {
		makealert("help-ciphering","Cipher some codes","Your boss loves ciphering codes, but he is busy. If you can help him, he promise to give you bonus gold bars as a reward.<br><br>Code #"+(cipherstep+1)+":<br>"+codetocipher+"<br><input type='text' id='cipherthecodeanswer'><br><br><input type='button' value='Submit' onclick='checkchipher()'>",true);
	}
	else {
		makealert("no-more-codes","No more codes","Sorry, there are no more codes to cipher",true);
	}
}
function battlevsrats() {
	if(items[2].owned!=0) {
		powerhp();
		hpdivide=Math.ceil(hp/4.5);
		battle=makebattle(Math.round(Math.random()*100),"A Rat",hp-hpdivide,hp-hpdivide,"Their body",power-Math.ceil(power/2.5),"An annoying rat",11,power,hp,hp,currentsword,false,"vs-rat");
		html="<div class=\"alert alert-battle-rats\"><b>Rat!</b><br>Kill it!!<br><br>"+battle.html+"</div>";
		$("#otheralerts").append(html);
		battle.init();
		closemessage();
		$(".alert-battle-rats").fadeIn("fast");
	}
}
function checkchipher() {

	/*
	
		Don't cheat please!!!
		PLEASE!!!
		
	*/

	if(cipherstep==0) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="master branch") {
			cipherstep++;
			goldbar+=200;
			closemessage();
			alert("Correct! But since this is an easy one, you 'only' get 200 gold bars"); 
		}
		else {
			alert('Wrong! Hint: ABC, Its easy as 123!');
		}
	}
	else if(cipherstep==1) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="there is a treasure hidden somewhere, it is located at a secret place in the pacific ocean") {
			cipherstep++;
			goldbar+=1000;
			closemessage();
			alert("Correct! You get 1000 gold bars!"); 
		}
		else {
			alert('Wrong! Hint: The Romans would be furious with you.');
		}
	}
	else if(cipherstep==2) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="in a world full of blocks") {
			cipherstep++;
			goldbar+=2000;
			closemessage();
			alert("Correct! You get 2000 gold bars!"); 
		}
		else {
			alert('Wrong! Hint: You use this to type with!');
		}
	}
	else if(cipherstep==3) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="the plant is famous because of the ability to cure some diseases") {
			cipherstep++;
			goldbar+=2500;
			closemessage();
			alert("Correct! You get 2500 gold bars!"); 
		}
		else {
			alert('Wrong! Hint: (8*4) - 16 + ((24/2) *4)');
		}
	}
	else if(cipherstep==4) {
		if($("#cipherthecodeanswer").val().toLowerCase()=="the gold factory was built long time ago, and it is the most famous gold factory in the world") {
			cipherstep++;
			goldbar+=7500;
			closemessage();
			alert("Correct! Because this one is a hard one, you get 7500 gold bars!"); 
		}
		else {
			alert('Wrong! Hint: Feel on the rails and on the fence? Combine em and keep going!');
		}
	}
}
