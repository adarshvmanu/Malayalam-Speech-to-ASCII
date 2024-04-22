let maplist = ["MLB-Ambili", "ML-Anjali", "ML-Aathira", "MLB-Ambili", "ML-Aswathi", "MLW-TTMalavika", "MLB-Ambili", "MLB-Ambili", "MLB-Ambili", "MLB-Indulekha", "MLW-TTKarthika", "ML-TTRavivarma", "MLB-TTRevathi", "ML-TTSarada", "ML-Aswathi", "ML-TTJyotsna", "ML-Surya", "MLW-TTAshtamudi", "ML-Mayoori", "ML-TTMayoori", "ML-Ravivarma", "MLB-TTAmbili"];

let mala_dict = ['\u0D00', '\u0D01', '\u0D02', '\u0D03', '\u0D04', '\u0D05', '\u0D06', '\u0D07', '\u0D08', '\u0D09', '\u0D0A', '\u0D0B', '\u0D0C', '\u0D0D', '\u0D0E', '\u0D0F', '\u0D10', '\u0D11', '\u0D12', '\u0D13', '\u0D14', '\u0D15', '\u0D16', '\u0D17', '\u0D18', '\u0D19', '\u0D1A', '\u0D1B', '\u0D1C', '\u0D1D', '\u0D1E', '\u0D1F', '\u0D20', '\u0D21', '\u0D22', '\u0D23', '\u0D24', '\u0D25', '\u0D26', '\u0D27', '\u0D28', '\u0D29', '\u0D2A', '\u0D2B', '\u0D2C', '\u0D2D', '\u0D2E', '\u0D2F', '\u0D30', '\u0D31', '\u0D32', '\u0D33', '\u0D34', '\u0D35', '\u0D36', '\u0D37', '\u0D38', '\u0D39', '\u0D3A', '\u0D3B', '\u0D3C', '\u0D3D', '\u0D3E', '\u0D3F', '\u0D40', '\u0D41', '\u0D42', '\u0D43', '\u0D44', '\u0D45', '\u0D46', '\u0D47', '\u0D48', '\u0D49', '\u0D4A', '\u0D4B', '\u0D4C', '\u0D4D', '\u0D4E', '\u0D4F', '\u0D50', '\u0D51', '\u0D52', '\u0D53', '\u0D54', '\u0D55', '\u0D56', '\u0D57', '\u0D58', '\u0D59', '\u0D5A', '\u0D5B', '\u0D5C', '\u0D5D', '\u0D5E', '\u0D5F', '\u0D60', '\u0D61', '\u0D62', '\u0D63', '\u0D64', '\u0D65', '\u0D66', '\u0D67', '\u0D68', '\u0D69', '\u0D6A', '\u0D6B', '\u0D6C', '\u0D6D', '\u0D6E', '\u0D6F', '\u0D70', '\u0D71', '\u0D72', '\u0D73', '\u0D74', '\u0D75', '\u0D76', '\u0D77', '\u0D78', '\u0D79', '\u0D7A', '\u0D7B', '\u0D7C', '\u0D7D', '\u0D7E', '\u0D7F'];

async function convert(text, font_name) {
    try {
        const mapping = font_name.split("-").pop();
        const response = await fetch(`map/${mapping}.map`);
        const mapread = await response.text();
        let mapcontents_0 = [];
        const two_in_one = ['ഈ', 'ഊ', 'ഐ', 'ഓ', 'ഔ', 'ൈ', 'ൊ', 'ോ', 'ൌ'];

        two_in_one.forEach(a => {
            if (!mapcontents_0.includes(a)) {
                switch (a) {
                    case 'ഈ':
                        text = text.replace('ഈ', 'ഇൗ');
                        break;
                    case 'ഊ':
                        text = text.replace('ഊ', 'ഉൗ');
                        break;
                    case 'ഐ':
                        text = text.replace('ഐ', 'എെ');
                        break;
                    case 'ഓ':
                        text = text.replace('ഓ', 'ഒാ');
                        break;
                    case 'ഔ':
                        text = text.replace('ഔ', 'ഒൗ');
                        break;
                    case 'ൈ':
                        text = text.replace('ൈ', 'െെ');
                        break;
                    case 'ൊ':
                        text = text.replace('ൊ', 'െഊ');
                        break;
                    case 'ോ':
                        text = text.replace('ോ', 'ോ');
                        break;
                    case 'ൌ':
                        text = text.replace('ൌ', 'ൌ');
                        break;
                    default:
                        break;
                }
            }
        });

        let array = [];
        let skip = false;
        for (let k = 0; k < text.length; k++) {
            if (!skip) {
                if (text[k] === 'െ' || text[k] === 'േ') {
                    let ind = 1;
                    let place_true = true;
                    let num = 2;
                    while (place_true) {
                        if (array.length > 2 && array[array.length - num] === '്') {
                            ind += 2;
                        } else if (array.slice(-num - 1, -1).join('') === '്ര') {
                            ind += 1;
                        } else {
                            place_true = false;
                        }
                        num += 2;
                    }
                    array.splice(-ind, 0, text[k]);
                } else if (text.slice(k, k + 2) === '്ര') {
                    let ind = 1;
                    let place_true = true;
                    let num = 2;
                    while (place_true) {
                        if (array.length > 2 && array[array.length - num] === '്') {
                            ind += 2;
                        } else {
                            place_true = false;
                        }
                        num += 1;
                    }
                    skip = true;
                    array.splice(-ind, 0, text.slice(k, k + 2));
                } else {
                    array.push(text[k]);
                }
            } else {
                skip = false;
            }
        }
        text = array.join('');

        mapread.split('\n').forEach(line => {
            let [charCode, charValue] = line.split('=');
            mapcontents_0.push(charValue);
            if (charValue.length >= 5) {
                text = text.replace(charValue, String.fromCharCode(parseInt(charCode)));
            }
        });

        for (let j = 0; j < mapread.length - 1; j++) {
            const [charCode, charValue] = mapread[j].split('=');
            mapcontents_0.push(charValue);
            if (charValue.length >= 4) {
                text = text.replace(charValue, String.fromCharCode(parseInt(charCode)));
            }
        }

        for (let j = 0; j < mapread.length - 1; j++) {
            const [charCode, charValue] = mapread[j].split('=');
            mapcontents_0.push(charValue);
            if (charValue.length >= 3) {
                text = text.replace(charValue, String.fromCharCode(parseInt(charCode)));
            }
        }

        for (let j = 0; j < mapread.length - 1; j++) {
            const [charCode, charValue] = mapread[j].split('=');
            mapcontents_0.push(charValue);
            if (charValue.length >= 2) {
                text = text.replace(charValue, String.fromCharCode(parseInt(charCode)));
            }
        }

        return [text, mapping];
    } catch (error) {
        return ["Error Occurred. Please report this.", "Anja"];
    }
}

// Example usage:
const text = "Your text here";
const fontName = "ML-TTAmbili Italic";
convert(text, fontName)
    .then(convertedText => {
        console.log(convertedText);
    })
    .catch(error => {
        console.error(error);
    });