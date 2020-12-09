# kitsu.js
> A NodeJS wrapper for interacting with the kitsu.io API.

<div align="center">
	<p>
		<a href="https://www.npmjs.com/package/kitsu.js"><img src="https://img.shields.io/npm/v/kitsu.js.svg?maxAge=3600" alt="NPM version" /></a>
		<a href="https://www.npmjs.com/package/kitsu.js"><img src="https://img.shields.io/npm/dt/kitsu.js.svg?maxAge=3600" alt="NPM downloads" /></a>
		<a href="https://david-dm.org/iCrawl/kitsu.js"><img src="https://david-dm.org/iCrawl/kitsu.js/status.svg?maxAge=3600" alt="Dependencies" /></a>
	</p>
	<p>
		<a href="https://nodei.co/npm/kitsu.js/"><img src="https://nodei.co/npm/kitsu.js.png?downloads=true&stars=true" alt="NPM info" /></a>
	</p>
</div>

## Features

- Currently supports only GET requests for Anime, Manga, and Users
- - Anime with search/ID, Manga with search/ID, and Users with ID only

## Install

```bash
npm install --save kitsu.js
```

## Usage

#### Normal usage:

```js
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

kitsu.searchAnime('One Piece')
	.then(result => console.log(result))
	.catch(err => console.error(err));
```

## Docs

#### kitsu.searchAnime(anime, offset)
| Parameter | Type          | Optional | Default | Description |
|-----------|:-------------:|:--------:|:-------:|-------------|
| anime     | string        |          | *none*  | The anime you want to search
| offset    | number        |    X     | 0       | Offset for pagination

#### kitsu.searchManga(manga, offset)
| Parameter | Type          | Optional | Default | Description |
|-----------|:-------------:|:--------:|:-------:|-------------|
| manga     | string        |          | *none*  | The manga you want to search
| offset    | number        |    X     | 0       | Offset for pagination

#### kitsu.getAnime(animeID)
| Parameter | Type          | Optional | Default | Description |
|-----------|:-------------:|:--------:|:-------:|-------------|
| animeID   | string        |          | *none*  | The anime you want to search

#### kitsu.getManga(mangaID)
| Parameter | Type          | Optional | Default | Description |
|-----------|:-------------:|:--------:|:-------:|-------------|
| mangaID   | string        |          | *none*  | The manga you want to search

#### kitsu.getUsers(userID)
| Parameter | Type          | Optional | Default | Description |
|-----------|:-------------:|:--------:|:-------:|-------------|
| userID    | string        |          | *none*  | The user you want to search

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**kitsu.js** © [iCrawl](https://github.com/iCrawl), Released under the [MIT](https://github.com/iCrawl/kitsu.js/blob/master/LICENSE) License.<br>
Authored and maintained by iCrawl.

> GitHub [@iCrawl](https://github.com/iCrawl) · Twitter [@iCrawlToGo](https://twitter.com/iCrawlToGo)
