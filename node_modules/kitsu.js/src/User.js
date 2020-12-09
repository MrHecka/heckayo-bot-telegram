class User {
	constructor(data) {
		this.id = data.id;
		this.name = data.attributes.name;
		this.pastNames = data.attributes.pastNames;
		this.about = data.attributes.about;
		this.bio = data.attributes.bio;
		this.aboutFormatted = data.attributes.aboutFormatted;
		this.location = data.attributes.location;
		this.website = data.attributes.website;
		this.waifuOrHusbando = data.attributes.waifuOrHusbando;
		this.toFollow = data.attributes.toFollow;
		this.followersCount = data.attributes.followersCount;
		this.followingCount = data.attributes.followingCount;
		this.createdAt = data.attributes.createdAt;
		this.updatedAt = data.attributes.updatedAt;
		this.onboarded = data.attributes.onboarded;
		this.lifeSpentOnAnime = data.attributes.lifeSpentOnAnime;
		this.birthday = data.attributes.birthday;
		this.gender = data.attributes.gender;
		this.facebookId = data.attributes.facebookId;
		this.commentsCount = data.attributes.commentsCount;
		this.likesGivenCount = data.attributes.likesGivenCount;
		this.likesReceivedCount = data.attributes.likesReceivedCount;
		this.postsCount = data.attributes.postsCount;
		this.ratingsCount = data.attributes.ratingsCount;
		this.avatar = data.attributes.avatar;
		this.coverImage = data.attributes.coverImage;
	}

	get url() {
		return `https://kitsu.io/users/${this.id}/`;
	}
}

module.exports = User;
