export function mock(stringgything: string) {
    let newString = ""
    for (let i = 0; i < stringgything.length; i++) {
        if (i % 2 == 0) {
            newString = newString + stringgything[i].toUpperCase()
        } else {
            newString = newString + stringgything[i]
        }
    }
    return newString
}

export function generateMockSentence(list: string[], connectors: string[]) {
    let sentence_word_length = Math.floor(Math.random() * 15) + 1
    let sentence = ""
    let word_count = 0

    while(word_count < sentence_word_length) {
        let word = list[Math.floor(Math.random() * list.length)]
        if(!word.includes(" ")) {
            if(Math.random() < 0.5 && word_count > 0) {
                sentence += connectors[Math.floor(Math.random() * connectors.length)] + " "
            }
        } else {
            if(Math.random() < 0.5 && word_count > 0) {
                sentence += "and "
            }
        }
        sentence += word.toLowerCase() + (Math.random() < 0.2 && sentence_word_length - word_count > 2 ? ", " : " ")
        word_count++
    }

    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1, sentence.length - 1) + "."
    return sentence
}