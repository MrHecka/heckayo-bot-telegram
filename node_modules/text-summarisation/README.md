# Summarize Texts
This package can be used to summarize longs texts to custom summarized sentence.

# How to use?

## install the package
### using npm
```
npm install text-summarize
```
### using yarn

```
yarn add text-summarize
```

## Usage

You can just simply call the function and get the summary of the text without passing your target sentence.

```javascript

const summarize = require("text-summarize");

const text = "Alice and Bob are friends. Alice is fun and cuddly. Bob is cute and quirky. Together they go on wonderful adventures in the land of tomorrow. Alice's cuddliness and Bob's cuteness allow them to reach their goals. But before they get to them, they have to go past their mortal enemy — Mr. Boredom. He is ugly and mean. They will surely defeat him. He is no match for their abilities.";

// summarize function returns a Promise
summarize(text).then(data => console.log(data));
// output: Alice and Bob are friends. Alice is fun and cuddly. Bob is cute and quirky. Together they go on wonderful adventures in the land of tomorrow. Alice's cuddliness and Bob's cuteness allow them to reach their goals. But before they get to them, they have to go past their mortal enemy — Mr. Boredom. He is ugly and mean. They will surely defeat him. He is no match for their abilities.

```

You can pass custom target sentence that you want after summarize the text.

```javascript

const summarize = require("text-summarize");

const text = "Alice and Bob are friends. Alice is fun and cuddly. Bob is cute and quirky. Together they go on wonderful adventures in the land of tomorrow. Alice's cuddliness and Bob's cuteness allow them to reach their goals. But before they get to them, they have to go past their mortal enemy — Mr. Boredom. He is ugly and mean. They will surely defeat him. He is no match for their abilities.";

// summarize function returns a Promise
summarize(text, { sentences: 2 }).then(data => console.log(data));
// output: Alice and Bob are friends. Alice's cuddliness and Bob's cuteness allow them to reach their goals.

```
You can pass language to translate the summarized text.

```javascript

const summarize = require("text-summarize");

const text = "Alice and Bob are friends. Alice is fun and cuddly. Bob is cute and quirky. Together they go on wonderful adventures in the land of tomorrow. Alice's cuddliness and Bob's cuteness allow them to reach their goals. But before they get to them, they have to go past their mortal enemy — Mr. Boredom. He is ugly and mean. They will surely defeat him. He is no match for their abilities.";

// summarize function returns a Promise
summarize(text, { sentences: 2, translate: 'bn' }).then(data => console.log(data));
// output: এলিস এবং বব বন্ধু। অ্যালিসের কুশ্রীতা এবং বব এর কর্তৃত্ব তাদেরকে তাদের লক্ষ্যে পৌছাতে দেয়।

```

The options can be

```javascript

const options = {
  sentences: 2, // return specific lines of summary
  translate: 'bn' // translate the summary into the target language
}
summarize(text, options).then(data => console.log(data));

```
### Defaults
- `sentence` is set to `10`.