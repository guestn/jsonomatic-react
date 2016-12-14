var moment = require('moment');
var traverse = require('traverse');
var AY = require('../modules/arrays');

exports.process = function(req, res) {
		
		/* pull in the form data */
		var jsonInput = req.body.output;
		
		var repeats = req.body.repeats;	

	  var Jobj = JSON.parse(jsonInput); 
	    
	   /* initialise the random arrays: */
	    
	  var firstname = AY.firstname;
		var lastname = AY.lastname;
		var company = AY.company;
		var lorem = AY.lorem;
		
		var randomArray = { firstname: firstname, lastname: lastname, company: company };
			
		var finaloutput = [];
		
		for(var n=0; n < repeats; n++) {
			var randSelect = {};
			//set up array of random selections for each iteration:
			for(var item in randomArray){
				randSelect[item] = Math.floor((Math.random() * randomArray[item].length));
			};
			
			var fname="", lname = "", email ="", l = "", odate = "", phone="", phone2 = "";
			var o = JSON.parse(jsonInput);
					console.dir('o:'+o);

			var j = {};
			Jobj = JSON.parse(jsonInput);
			console.log(Jobj);
			
			
			
		/* Utility functions to run on JSON input */	
			
			//function to parse INT string and produce random integer
			function INT(lo, hi) {
				lo = parseInt(lo);
				hi = parseInt(hi);
				
				return l = Math.round((Math.random()*(hi-lo)+lo));
			};
			
			//function to create random integer
			function createText(wordsCount) {
				w = parseInt(wordsCount.substring(7, 29));
	
				var txt="";
				for(var i = 0; i < w; i++) {
					var r = Math.floor(Math.random() * lorem.length);
					txt += lorem[r]+' ';
				};
				return txt;
			};
			
			var fname, lname, cmpny;

			
			function FIRSTNAME() {
				return fname = randomArray.firstname[randSelect.firstname]
			};
	
			function LASTNAME() {
				return lname = randomArray.lastname[randSelect.lastname];
			}
	
			function COMPANY() {
				return cmpny = randomArray.company[randSelect.company];
			}
			
			fname = FIRSTNAME();
			lname = LASTNAME();
			cmpny = COMPANY();
			
			function EMAIL() {
				return email = fname.toLowerCase() + '.' + lname.toLowerCase() + '@' + cpmny.toLowerCase() + '.com';
			}
			
			function DATE(i1,i2) {
				i1 = moment(i1);
				i2 = moment(i2);
				if(isNaN(i1)) { i1 = i2 };
				if(isNaN(i2)) { i2 = i1 };
				//console.log(i1+' '+i2+' '+Math.random() * (i2 - i1));
				date = parseInt((Math.random() * (i2 - i1)) + i1);
				//console.log(date);
				//console.log(moment(i2).format('Do MM YY'));
				odate = moment(date).format('Do MMM YY');
				//console.log(odate);
				return odate;
			}
			
			function PHONE() {
				return phone = Math.floor((Math.random() * (9999999999 - 1000000000)) + 1000000000).toString();
			}
			function PHONE2() {
				return phone2 = '(' + phone.substr(0,3) + ') ' + phone.substr(3,3) + ' ' + phone.substr(6,4);
			}
	
			

		/* Traverse tree function (and execute relevant utility functions) */		
	
			var traverso = function() {
				traverse(o).forEach(function (x) {
					
					// Only run functions at all if they sit between the correct tags <% %> */
					if(/\<%(.*?)%>/.test(x)) {
						
						
						/*start going with the functions for each node of the tree*/
						if(/FIRSTNAME/.test(x)) {
							FIRSTNAME();
						};

						if(/LASTNAME/.test(x)) {
							LASTNAME();
						};

						if(/EMAIL/.test(x)) {
							EMAIL();
						};

						if (/\<%INT(.*?)%\>/.test(x)) {
							u = /\<%(INT.*?)%\>/.exec(x);
							eval(u[1]);
						};
							
						if(/\<%DATE(.*?)%>/.test(x)) {console.log('match')
							p = /\<%(DATE.*?)%>/.exec(x);
							eval(p[1]);					
						};

						if(/PHONE/.test(x)) {
							 PHONE();
						};

						if(/PHONE2/.test(x)) {
							 PHONE2();
						};
						
						/*loop through input objects and replace with the computed fn results*/
						
						var a = x.replace(/<%FIRSTNAME%>/g, fname);
						var b = a.replace(/<%LASTNAME%>/g, lname);
						var c = b.replace(/<%EMAIL%>/g, email);
						var d = c.replace(/(<%INT(.*?)%>)/g, l);
						var e = d.replace(/(<%DATE(.*?)%>)/g, odate);
						var f = e.replace(/<%PHONE%>/g, phone);
						var g = f.replace(/<%PHONE2%>/g, phone2);

						this.update(g);
						

					}
					
				});
				return o;
			}
			
			o = traverso();
			
			var x = o;


			
			finaloutput[n] = x;
			
		};
		

		var output = JSON.stringify(finaloutput);

		res.json(output);

		console.log('finished');

}