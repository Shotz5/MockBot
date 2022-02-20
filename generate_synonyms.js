const emoji_json = require('./emojis.json')

cleaned_emoji_json = {}
for (emoji_key in emoji_json.emojis) {
    dirty_emoji_string = emoji_json.emojis[emoji_key]
    cleaned_emoji_string = emoji_json.emojis[emoji_key].substring(1, emoji_json.emojis[emoji_key].length - 1)

    // synons = "https://dictionaryapi.com/api/v3/references/thesaurus/json/" + cleaned_emoji_string + "?key=585adaec-5dfb-45f6-ae7e-c8b1e7c127f6"
    synons = ["uno", "dos", "tsdkljf"]
    
    for (syn in synons) {
        cleaned_emoji_json[synons[syn]] = {
            "markup": dirty_emoji_string,
            "emoji": emoji_key,
            "clean_string": cleaned_emoji_string
        }
    }
}

console.log(cleaned_emoji_json)