const { expect } = require('chai');

const summarize = require('../index.js');

const text = "Alice and Bob are friends. Alice is fun and cuddly. Bob is cute and quirky. Together they go on wonderful adventures in the land of tomorrow. Alice's cuddliness and Bob's cuteness allow them to reach their goals. But before they get to them, they have to go past their mortal enemy — Mr. Boredom. He is ugly and mean. They will surely defeat him. He is no match for their abilities.";

describe('text-summarize', () => {
  it('Should summarize the text and return 10 sentence', async () => {
    const summary = await summarize(text);
    const summarySentence = summary.split('. ');
    expect(summarySentence).to.have.lengthOf(10);
  });
  it('Should summarize the text and return 2 sentence', async () => {
    const summary = await summarize(text, { sentences: 2 });
    const summarySentence = summary.split('. ');
    expect(summarySentence).to.have.lengthOf(2);
  });
  it('Should send empty string when no text passed', async () => {
    const summary = await summarize('');
    expect(summary).to.have.lengthOf(0);
  });
  it('Should translate the summary in bangla language', async () => {
    const translatedSummary = 'এলিস এবং বব বন্ধু। অ্যালিসের কুশ্রীতা এবং বব এর কর্তৃত্ব তাদেরকে তাদের লক্ষ্যে পৌছাতে দেয়।';
    const summary = await summarize(text, { sentences: 2, translate: 'bn' });
    expect(summary).to.equal(translatedSummary);
  });
});
