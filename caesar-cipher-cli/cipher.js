module.exports = (str, shift) => {
    let arr = str.split('');
    return arr.map(letter => {
        let text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let textStr = text.split('');
        let upperCaseLetter = letter.toUpperCase();
        let index = textStr.indexOf(upperCaseLetter);
        if (index < 0) {
            return letter;
        } else {
            let upperLetter = letter == upperCaseLetter; 
            let indexShift = (index + shift) % textStr.length;
            if (indexShift < 0) {
                indexShift = indexShift + textStr.length;
            }
            let capitalLetter = textStr[indexShift];
            if (upperLetter) {
                return capitalLetter;
            } else {
                return capitalLetter.toLowerCase();
            }
        }
    }).join('');
};

// console.log(caesar('ABdexYZ', 3));
// console.log('ABdexYZ');
