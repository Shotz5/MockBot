const stupidBusinessBuzzwords = [
    "artificial intelligence",
    "business analytics",
    "marketing",
    "ecosystem",
    "synergy",
    "think outside the box",
    "let's step back and think about this",
    "Circle back",
    "Low-hanging fruit",
    "At the end of the day",
    "Cloud based",
    "To not know what you don't know",
    "Big data",
    "Move the needle",
    "Leverage",
    "agile",
    "best practice",
    "digital transformation",
    "deep dive",
    "bandwidth",
    "customer journey",
    "moving forward",
    "going forward",
    "next level",
    "reach out",
    "touch base",
    "wheelhouse",
    "disruptor",
    "alignment",
    "right",
    "bottom line",
    "FYI",
    "KPI",
    "ROI",
    "distruptive",
    "value",
    "ping",
    "lean into",
    "paradigm",
    "learnings",
    "holistic approach",
    "company culture",
    "thought leader",
    "content",
    "growth hacking",
    "buy in",
    "pain point",
    "lane",
    "game-changer",
    "teamwork",
    "Next-gen",
    "Hard stop",
    "Internet of things",
    "IoT",
    "innovative",
    "influencer",
    "customer-centric",
    "all hands on deck",
    "net",
    "put a pin in it",
    "stakeholders",
    "strategic",
    "metrics",
    "machine learning",
    "pivot",
    "on the same page",
    "collaboration",
    "Intelligence",
    "business intelligence",
    "competitive intelligence",
    "automation",
    "blockchain",
    "intuitive",
    "analytics",
    "platform",
    "unpack",
    "table",
    "giving 110%",
    "quick win",
    "onboarding",
    "long story short",
    "full plate",
    "looping back",
    "in the loop",
    "freemium",
    "integration",
    "engagement",
    "actionable",
    "efficiency",
    "hemmoraging",
    "money",
    "socialize",
    "diversity",
    "verticals",
    "bleeding-edge",
    "optimize",
    "scalable",
    "organic",
    "empower",
    "win-win",
    "optics",
    "data-driven",
    "in the weeds",
    "on your radar",
    "ducks in a row",
    "drill down",
    "playing in the space of",
    "fast-paced",
    "mindfullness",
    "as per my last email",
    "ASAP",
    "BID",
    "EOD",
    "ETA",
    "DOA",
    "IMO",
    "month over month",
    "year over year",
    "quarterly",
    "WFH"
]
let connectors = ["of", "to", "for", "with", "by", "from", "about", "in", "on", "at", "into", "onto", "off", "out", "over",
    "under", "up", "down", "around", "through", "that", "this", "these", "those", "it", "its", "a", "an", "the"]
let sentence_word_length = Math.floor(Math.random() * 15) + 1
let sentence = ""
let word_count = 0
while(word_count < sentence_word_length) {
    let word = stupidBusinessBuzzwords[Math.floor(Math.random() * stupidBusinessBuzzwords.length)]
    if(!word.includes(" ")) {
        if(Math.random() < 0.5 && word_count > 0) {
            sentence += connectors[Math.floor(Math.random() * connectors.length)] + " "
        }
    }
    sentence += word.toLowerCase() + (Math.random() < 0.2 && sentence_word_length - word_count > 2 ? ", " : " ")
    word_count++
}
sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1, sentence.length - 1) + "."
console.log(sentence)