const numbers = '0123456789';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';	// MBI uses upper-case letters
const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const numberSet = new Set(numbers);
const alphabetSet = new Set(alphabet);

const numericIndex = new Set([0, 3, 6, 9, 10]);
const alphaIndex = new Set([1, 4, 7, 8]);
const alphanumericIndex = new Set([2, 5]);
const hyphenIndex = new Set([3, 6]);

function verify(mbi) {
	const parsedMBI = mbi.split('-').join('');
	
	if (parsedMBI.length != 11) return false;
	
	for (let i = 0; i < 11; i++) {
		let currentCharacter = parsedMBI[i];
		
	    if (numericIndex.has(i)) {
			if (!numberSet.has(currentCharacter)) {
				return false;
			}
		}
		if (alphaIndex.has(i)) {
			if (!alphabetSet.has(currentCharacter)) 
			{
				return false;
			}
		}
		if (alphanumericIndex.has(i)) {
			if (!alphabetSet.has(currentCharacter) && !numberSet.has(currentCharacter)) {
				return false;
			}
		}
	}
	
    return true;
}

function generate() {
	let mbi = '';
	
	for (let i = 0; i < 11; i++) {
		if (alphaIndex.has(i)) {
			mbi += getRandomAlpha();
		}
		if (numericIndex.has(i)) {
			mbi += getRandomNumber();
		}
		if (alphanumericIndex.has(i)) {
			mbi += getRandomAlphaNumeric();
		}
		if (hyphenIndex.has(i)) {
			mbi += '-';
		}
	}
	
	return mbi;
}

function getRandomNumber() {
	return numbers.charAt(Math.floor((Math.random() * numbers.length)));
}

function getRandomAlpha() {
	return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function getRandomAlphaNumeric() {
	return alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
}

module.exports = { verify, generate };