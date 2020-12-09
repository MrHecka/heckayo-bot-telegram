const fetch = require('node-fetch');

const { version } = require('../package.json');
const Anime = require('./Anime');
const Manga = require('./Manga');
const User = require('./User');

class Kitsu {
	constructor() {
		this._userAgent = `kitsu.js, a npm module for the kitsu.io API. v${version} (https://github.com/iCrawl/kitsu.js)`;
		this._options = {
			headers: {
				'User-Agent': this._userAgent,
				Accept: 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json'
			}
		};
	}

	searchAnime(search, offset = 0) {
		return new Promise((resolve, reject) => {
			const searchTerm = encodeURIComponent(search);
			return fetch(`https://kitsu.io/api/edge/anime?filter[text]="${searchTerm}"&page[offset]=${offset}`, this._options)
				.then(res => res.json())
				.then(json => resolve(json.data.map(moreData => new Anime(moreData))))
				.catch(err => reject(new Error(`Couldn't fetch the api: ${err}`)));
		});
	}

	getAnime(id) {
		return new Promise((resolve, reject) =>
			fetch(`https://kitsu.io/api/edge/anime/${id}`, this._options)
				.then(res => res.json())
				.then(json => resolve(new Anime(json.data)))
				.catch(err => reject(new Error(`Couldn't fetch the api: ${err}`)))
		);
	}

	searchManga(search, offset = 0) {
		return new Promise((resolve, reject) => {
			const searchTerm = encodeURIComponent(search);
			return fetch(`https://kitsu.io/api/edge/manga?filter[text]="${searchTerm}"&page[offset]=${offset}`, this._options)
				.then(res => res.json())
				.then(json => resolve(json.data.map(moreData => new Manga(moreData))))
				.catch(err => reject(new Error(`Couldn't fetch the api: ${err}`)));
		});
	}

	getManga(id) {
		return new Promise((resolve, reject) =>
			fetch(`https://kitsu.io/api/edge/manga/${id}`, this._options)
				.then(res => res.json())
				.then(json => resolve(new Manga(json.data)))
				.catch(err => reject(new Error(`Couldn't fetch the api: ${err}`)))
		);
	}

	getUser(id) {
		return new Promise((resolve, reject) =>
			fetch(`https://kitsu.io/api/edge/users/${id}`, this._options)
				.then(res => res.json())
				.then(json => resolve(new User(json.data)))
				.catch(err => reject(new Error(`Couldn't fetch the api: ${err}`)))
		);
	}
}

module.exports = Kitsu;
