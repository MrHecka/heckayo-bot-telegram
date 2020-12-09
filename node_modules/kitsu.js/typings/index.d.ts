declare module 'kitsu.js' {
	export class Anime {
		public id: string;
		public type: string;
		public slug: string;
		public synopsis: string;
		public titles: {
			english: string;
			romaji: string;
			japanese: string;
			canonical: string;
			abbreviated: string[];
		};
		public averageRating: string;
		public ratingFrequencies: object;
		public userCount: string;
		public favoritesCount: string;
		public startDate: string;
		public endDate: string;
		public popularityRank: string;
		public ratingRank: string;
		public ageRating: string;
		public ageRatingGuide: string;
		public subType: string;
		public posterImage: object;
		public coverImage: object;
		public episodeCount: string
		public episodeLength: string;
		public youtubeVideoId: string;
		public showType: string;
		public nsfw: string;

		public readonly url: string;
		public readonly youtubeURL: string;
	}

	export class Manga {
		public id: string;
		public type: string;
		public slug: string;
		public synopsis: string;
		public titles: {
			english: string;
			romaji: string;
			canonical: string;
			abbreviated: string[];
		};
		public averageRating: string;
		public ratingFrequencies: object;
		public userCount: string;
		public favoritesCount: string;
		public startDate: string;
		public endDate: string;
		public popularityRank: string;
		public ratingRank: string;
		public ageRating: string;
		public ageRatingGuide: string;
		public subType: string;
		public posterImage: object;
		public coverImage: object;
		public chapterCount: string;
		public volumeCount: string;
		public serialization: string;
		public mangaType: string;

		public readonly url: string;
	}

	export class Drama {
		public id: string;
		public slug: string;
		public synopsis: string;
		public titles: {
			english: string;
			romaji: string;
			canonical: string;
			abbreviated: string[];
		};
		public averageRating: string;
		public ratingFrequencies: object;
		public startDate: string;
		public endDate: string;
		public posterImage: object;
		public coverImage: object;
		public dramaType: string;

		public readonly url: string;
	}

	export class User {
		public id: string;
		public name: string;
		public pastNames: string[];
		public about: string;
		public bio: string;
		public aboutFormatted: string;
		public location: string;
		public website: string;
		public waifuOrHusbando: string;
		public toFollow: string;
		public followersCount: string;
		public followingCount: string;
		public createdAt: string;
		public updatedAt: string;
		public onboarded: string;
		public lifeSpentOnAnime: string;
		public birthday: string;
		public gender: string;
		public facebookId: string;
		public commentsCount: string;
		public likesGivenCount: string;
		public likesReceivedCount: string;
		public postsCount: string;
		public ratingsCount: string;
		public avatar: object;
		public coverImage: object;

		public readonly url: string;
	}

	export class Kitsu {
		private _userAgent: string;
		private _options: {
			headers: {
				'User-Agent': string;
				Accept: string;
				'Content-Type': string;
			}
		};

		public searchAnime(search: string, offset: number): Promise<Anime[]>;
		public getAnime(id: string): Promise<Anime>;
		public searchManga(search: string, offset: number): Promise<Manga[]>;
		public getManga(id: string): Promise<Manga>;
		public getUser(id: string): Promise<User>;
	}
}
