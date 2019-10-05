// punctuation from https://gist.github.com/davidjrice/9d2af51100e41c6c4b4a

const PUNCTUATION = "" +
"’'" +       // apostrophe
"()[]{}<>" + // brackets
":" +        // colon
"," +        // comma
"‒–—―" +     // dashes
"…" +        // ellipsis
"!" +        // exclamation mark
"." +        // full stop/period
"«»" +       // guillemets
"-‐" +       // hyphen
"?" +        // question mark
"‘’“”" +     // quotation marks
";" +        // semicolon
"/" +        // slash/stroke
"⁄" +        // solidus
"␠" +        // space?   
"·" +        // interpunct
"&" +        // ampersand
"@" +        // at sign
"*" +        // asterisk
"\\" +       // backslash
"•" +        // bullet
"^" +        // caret
"¤¢$€£¥₩₪" + // currency
"†‡" +       // dagger
"°" +        // degree
"¡" +        // inverted exclamation point
"¿" +        // inverted question mark
"¬" +        // negation
"#" +        // number sign (hashtag)
"№" +        // numero sign ()
"%‰‱" +      // percent and related signs
"¶" +        // pilcrow
"′" +        // prime
"§" +        // section sign
"~" +        // tilde/swung dash
"¨" +        // umlaut/diaeresis
"_" +        // underscore/understrike
"|¦" +       // vertical/pipe/broken bar
"⁂" +        // asterism
"☞" +        // index/fist
"∴" +        // therefore sign
"‽" +        // interrobang
"※";          // reference mark

const arrRu = ['я','я','ю','ю','ч','ш','ж','х','ц','а','б','в','г','д','е','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ы'];
const arrEn = ['ja','ya','ju','yu','ch','sh','zh','kh','ts','a','b','v','g','d','e','z','i','j','k','l','m','n','o','p','r','s','t','u','f','h','c','y'];

const toCyrillic = (str) => {
    let result = "";
    let i = 0;
	while (i < str.length) {
        // ignore punctuation, spaces and numbers
        if (PUNCTUATION.includes(str[i]) || str[i] === " " || !isNaN(str[i])) {
            result += str[i];
            i++;
            continue;
        }
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
            result += "?";
            i++;
        } else {
            result += arrRu[charIndex];
            i++;
        }
    };

    return result;
};

export default toCyrillic;