const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.bttn');
// input will be what I pass into the display
let input = '0';
// equation will be what gets stored in the background
let equation = '';

buttons.forEach((x) => {
	x.addEventListener('click', () => {
	operate(x.id);
	});
});

function operate (n){
	ops = ['+', '-', '/', '*'];
	
	if (n == "="){
		var func = function(equation) {
			return (new Function( 'return (' + equation + ')' )());
		}
		input = func(equation);
		equation = input;
		if (input == 'Infinity'){
			input = "nope!"
		}

	} else if (ops.includes(n)) {
		input = n;
		equation += n;
	} else if (n == "clear"){
		input = '0';
		equation = '';
	} else if (ops.includes(input)) {
		input = n;
		equation += n;
	} else if (n == '.') {
		if (!input.toString().includes('.')){
			input += n;
			equation += n;
		}
	}  else {
		if (input === '0' || input === 'nope!'){
			input = n;
			equation = n;
		} else {
			input += n;
			equation += n;
		}
	}
	
	// cases for when display is too long
	 if (input.toString().length > 10){
		var tempArr = input.toString().split('')
		var count = 0;
		
		// can't append more than 10 digits
		if (!input.toString().includes('.')) {
			input = "too long! "	
		} else {
			// need to check they aren't inputting more digits when decimal present
			if (n != '='){
				input = 'too long! '
			} else {
				// rounds digits after decimal to keep display under 10 digits
				for (var z = 0; z < tempArr.length; z++){
					if (tempArr[z] == '.'){
						count = z;
					}
					input = parseFloat(input).toFixed(9 - count);
				}
			}	
		}				
	}
	display.textContent = input;
}