
const arrRu = ['я','я','ю','ю','ч','ш','ж','х','ц','а','б','в','г','д','е','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ы'];
const arrEn = ['ja','ya','ju','yu','ch','sh','zh','kh','ts','a','b','v','g','d','e','z','i','j','k','l','m','n','o','p','r','s','t','u','f','h','c','y'];

const toCyrillic = (str) => {
    let result = "";
    let i = 0;
	while (i < str.length) {
        // check for two char correspondence
        if (i + 1 < str.length) {
            let twoChar = str[i] + str[i+1];
            let twoCharIndex = arrEn.indexOf(twoChar);
            if (twoCharIndex !== -1) {
                result += arrRu[twoCharIndex];
                i += 2;
                continue;
            }
        }
        // one char correspondence
        let charIndex = arrEn.indexOf(str[i]);
        if (charIndex < 0) {
            result += str[i];
            i++;
        } else {
            result += arrRu[charIndex];
            i++;
        }
    };

    return result;
};

export default toCyrillic;