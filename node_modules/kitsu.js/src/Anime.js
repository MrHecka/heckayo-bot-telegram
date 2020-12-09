class Anime {
	constructor(data) {
		this.id = data.id;
		this.type = data.type;
		this.slug = data.attributes.slug;
		this.synopsis = data.attributes.synopsis;
		this.titles = {
			english: data.attributes.titles.en,
			romaji: data.attributes.titles.en_jp,
			japanese: data.attributes.titles.ja_jp,
			canonical: data.attributes.canonicalTitle,
			abbreviated: data.attributes.abbreviatedTitles
		};
		this.averageRating = data.attributes.averageRating;
		this.ratingFrequencies = data.attributes.ratingFrequencies;
		this.userCount = data.attributes.userCount;
		this.favoritesCount = data.attributes.favoritesCount;
		this.startDate = data.attributes.startDate;
		this.endDate = data.attributes.endDate;
		this.popularityRank = data.attributes.popularityRank;
		this.ratingRank = data.attributes.ratingRank;
		this.ageRating = data.attributes.ageRating;
		this.ageRatingGuide = data.attributes.ageRatingGuide;
		this.subType = data.attributes.subtype;
		this.posterImage = data.attributes.posterImage;
		this.coverImage = data.attributes.coverImage;
		this.episodeCount = data.attributes.episodeCount;
		this.episodeLength = data.attributes.episodeLength;
		this.youtubeVideoId = data.attributes.youtubeVideoId;
		this.showType = data.attributes.showType;
		this.nsfw = data.attributes.nsfw;
	}

	get url() {
		return `https://kitsu.io/anime/${this.id}/`;
	}

	get youtubeURL() {
		return this.youtubeVideoId ? `https://www.youtube.com/watch?v=${this.youtubeVideoId}` : null;
	}
}

module.exports = Anime;
