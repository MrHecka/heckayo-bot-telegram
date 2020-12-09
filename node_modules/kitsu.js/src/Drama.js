class Drama {
	constructor(id, data) {
		this.id = data.id;
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
		this.startDate = data.attributes.startDate;
		this.endDate = data.attributes.endDate;
		this.posterImage = data.attributes.posterImage;
		this.coverImage = data.attributes.coverImage;
		this.dramaType = data.attributes.dramaType;
	}

	get url() {
		return `https://kitsu.io/drama/${this.id}/`;
	}
}

module.exports = Drama;
