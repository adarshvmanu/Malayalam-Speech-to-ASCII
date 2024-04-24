function convert(text, fontName) {
    try {
        const mapping = fontName.split("-").pop();
        fetch(`mapfile/${mapping}.map`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch file');
                }
                return response.text();
            })
            .then(data => {
                const mapRead = data.split('\n');
                console.log(mapRead);
            })
            .catch(error => {
                console.error('Error fetching file:', error);
            });
        let newText = text;

        const twoInOne = ['ഈ', 'ഊ', 'ഐ', 'ഓ', 'ഔ', 'ൈ', 'ൊ', 'ോ', 'ൌ'];
        for (const a of twoInOne) {
            if (!mapRead.includes(a)) {
                if (a === 'ഈ') newText = newText.replace('ഈ', 'ഇൗ');
                else if (a === 'ഊ') newText = newText.replace('ഊ', 'ഉൗ');
                else if (a === 'ഐ') newText = newText.replace('ഐ', 'എെ');
                else if (a === 'ഓ') newText = newText.replace('ഓ', 'ഒാ');
                else if (a === 'ഔ') newText = newText.replace('ഔ', 'ഒൗ');
                else if (a === 'ൈ') newText = newText.replace('ൈ', 'െെ');
                else if (a === 'ൊ') newText = newText.replace('ൊ', 'ൊ');
                else if (a === 'ോ') newText = newText.replace('ോ', 'ോ');
                else if (a === 'ൌ') newText = newText.replace('ൌ', 'ൌ');
            }
        }

        let array = [];
        let skip = false;

        for (let k = 0; k < text.length; k++) {
            if (!skip) {
                if (text[k] === 'െ' || text[k] === 'േ') {
                    let ind = 1;
                    let placeTrue = true;
                    let num = 2;
                    while (placeTrue) {
                        if (array.length > 2 && array.slice(-1 * num)[0] === '്') {
                            ind += 2;
                        } else if (array.slice(-1 * (num + 1), -1 * (num - 1)).join('') === '്ര') {
                            ind += 1;
                        } else {
                            placeTrue = false;
                        }
                        num += 2;
                    }
                    array.splice(-1 * ind, 0, text[k]);
                } else if (text.slice(k, k + 2) === '്ര') {
                    let ind = 1;
                    let placeTrue = true;
                    let num = 2;
                    while (placeTrue) {
                        if (array.length > 2 && array.slice(-1 * num)[0] === '്') {
                            ind += 2;
                        } else {
                            placeTrue = false;
                        }
                        num += 1;
                    }
                    skip = true;
                    array.splice(-1 * ind, 0, text.slice(k, k + 2));
                } else {
                    array.push(text[k]);
                }
            } else {
                skip = false;
            }
        }

        newText = array.join('');

        for (let j = 0; j < mapRead.length - 1; j++) {
            const cha = mapRead[j].split('=');
            const key = cha[0];
            const value = cha[1];

            if (value.length >= 5) newText = newText.split(value).join(String.fromCharCode(key));
        }

        for (let j = 0; j < mapRead.length - 1; j++) {
            const cha = mapRead[j].split('=');
            const key = cha[0];
            const value = cha[1];

            if (value.length >= 4) newText = newText.split(value).join(String.fromCharCode(key));
        }

        for (let j = 0; j < mapRead.length - 1; j++) {
            const cha = mapRead[j].split('=');
            const key = cha[0];
            const value = cha[1];

            if (value.length >= 3) newText = newText.split(value).join(String.fromCharCode(key));
        }

        for (let j = 0; j < mapRead.length - 1; j++) {
            const cha = mapRead[j].split('=');
            const key = cha[0];
            const value = cha[1];

            if (value.length >= 2) newText = newText.split(value).join(String.fromCharCode(key));
        }

        for (let j = 0; j < mapRead.length - 1; j++) {
            const cha = mapRead[j].split('=');
            const key = cha[0];
            const value = cha[1];

            if (value !== '') newText = newText.split(value).join(String.fromCharCode(key));
        }

        return newText;
    } catch (error) {
        console.error("Error Occurred:", error);
        return ["Error Occurred. Please report this.", "Mapp"];
    }
}

const unicodeText = "ആണോ മലയാളത്തിൽ ടൈപ്പ് ചെയ്താൽ മതിയോ ഷെയ്യ് കൊള്ളാലോ എങ്കിൽ ഞനും ഇങ്ങനെ ചെയ്യരുന്നു";
const fontName = "ML-Karthika-Normal-3";

const outputText = convert(unicodeText, fontName);
console.log("Output Text:", outputText);