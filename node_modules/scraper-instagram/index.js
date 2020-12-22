'use strict';

/*
Modules
 */

const
	https = require('https'),
	insta = 'https://www.instagram.com/';

/*
Utils
 */

const querystring = object => Object.keys(object).map(key => `${key}=${object[key]}`).join('&');

/*
Class private methods
 */

const self = {
	get: (path, sessionId, tryParse = true, params) => new Promise((resolve, reject) => {
		params = JSON.stringify({ __a: sessionId ? '1' : undefined, ...params });
		const url = insta + path + ((params !== '{}') ? ('/?' + querystring(JSON.parse(params))) : (tryParse ? '/' : ''));
		https.get(url, {
			headers: {
				cookie: sessionId ? `sessionid=${sessionId}` : ''
			}
		}, res => {
			let body = '';
			res.on('data', chunk => body += chunk);
			res.on('end', () => {
				if(res.statusCode !== 200){
					reject(res.statusCode === 302 && res.headers.location === insta + 'accounts/login/' ? 429 : res.statusCode);
				}
				else if(tryParse){
					try {
						resolve(
							Object.values(sessionId
								? (JSON.parse(body)['graphql'] || JSON.parse(body))
								: Object.values(JSON.parse(body.match(/_sharedData = (.+);/)[1])['entry_data'])[0][0]['graphql'])[0]
						);
					}
					catch(_){
						reject(406);
					}
				}
				else {
					resolve(body);
				}
			});
			res.on('error', reject);
		});
	}),
	search: (query, sessionId) => new Promise((resolve, reject) => self.get('web/search/topsearch', sessionId, false, { context: 'blended', query })
		.then(body => resolve(JSON.parse(body)))
		.catch(reject)),
	postDetails: post => ({
		shortcode: post['node']['shortcode'],
		caption: post['node']['edge_media_to_caption']['edges'].length > 0
			? post['node']['edge_media_to_caption']['edges'][0]['node']['text'] : null,
		comments: post['node']['edge_media_to_comment']['count'],
		likes: post['node']['edge_liked_by']['count'],
		thumbnail: post['node']['display_url']
	})
};

/*
Class public properties & methods
 */

module.exports = class Insta {
	constructor(){
		this.sessionId = undefined;
		this.username = undefined;
		this.storyQueryHash = undefined;
	}
	authBySessionId(sessionId){
		return new Promise((resolve, reject) => self.get('accounts/edit', sessionId)
			.then(body => {
				if(this.sessionId)
					process.emitWarning('Session ID changed');
				this.sessionId = sessionId;
				this.username = body['username'];
				resolve(body);
			})
			.catch(reject));
	}
	getAccountNotifications(){
		return new Promise((resolve, reject) => {
			if(!this.sessionId) return reject(401);
			self.get('accounts/activity', this.sessionId).then(res => {
				resolve(res['activity_feed']['edge_web_activity_feed']['edges'].map(item => item['node']).map(notification => ({
					id: notification['id'],
					timestamp: notification['timestamp'],
					type: ({
						'GraphLikeAggregatedStory' : 'like',
						'GraphMentionStory': 'mention',
						'GraphCommentMediaStory': 'comment',
						'GraphFollowAggregatedStory': 'follow'
					})[notification['__typename']],
					...(notification['media'] ? {
						post: {
							shortcode: notification['media']['shortcode'],
							thumbnail: notification['media']['thumbnail_src']
						}
					} : {}),
					...(notification['user'] ? {
						by: {
							username: notification['user']['username'],
							name: notification['user']['full_name'],
							pic: notification['user']['profile_pic_url']
						}
					} : {}),
					...(notification['__typename'] === 'GraphMentionStory' ? {
						content: notification['text']
					} : {})
				})));
			}).catch(reject);
		});
	}
	getAccountStories(){
		return new Promise((resolve, reject) => {
			if(!this.sessionId) return reject(401);
			self.get('', this.sessionId, false, { __a: undefined }).then(body => {
				self.get('graphql/query', this.sessionId, undefined, {
					query_hash: body.match(/<link rel="preload" href="\/graphql\/query\/\?query_hash=(.+)&amp;/)[1]
				}).then(body => {
					resolve(body['user']['feed_reels_tray']['edge_reels_tray_to_reel']['edges'].map(item => ({
						unread: item['node']['latest_reel_media'] !== item['node']['seen'],
						author: {
							id: item['node']['user']['id'],
							username: item['node']['user']['username'],
							pic: item['node']['user']['profile_pic_url']
						},
						user: {
							requesting: item['node']['user']['requested_by_viewer'],
							following: item['node']['user']['followed_by_viewer']
						}
					})));
				}).catch(reject);
			}).catch(reject);
		});
	}
	getProfile(username = this.username, anonymous = false){
		return new Promise((resolve, reject) => self.get(username, anonymous ? null : this.sessionId)
			.then(profile => {
				const access = !profile['is_private'] || !!profile['followed_by_viewer'] || profile['username'] === this.username;
				resolve({
					id: profile['id'],
					name: profile['full_name'],
					pic: profile['profile_pic_url_hd'],
					bio: profile['biography'],
					private: profile['is_private'],
					access,
					verified: profile['is_verified'],
					website: profile['external_url'],
					followers: profile['edge_followed_by']['count'],
					following: profile['edge_follow']['count'],
					posts: profile['edge_owner_to_timeline_media']['count'],
					lastPosts: access ? profile['edge_owner_to_timeline_media']['edges'].map(post => self.postDetails(post)) : null,
					link: insta + profile['username'],
					...(profile['is_business_account'] ? {
						business: profile['business_category_name']
					} : {}),
					...(this.sessionId ? {
						user: {
							mutualFollowers: profile['edge_mutual_followed_by']['edges'].map(item => item['node']['username']),
							blocking: profile['blocked_by_viewer'],
							blocked: profile['has_blocked_viewer'],
							requesting: profile['requested_by_viewer'],
							requested: profile['has_requested_viewer'],
							following: profile['followed_by_viewer'],
							followed: profile['follows_viewer']
						}
					} : {})
				});
			})
			.catch(err => {
				if(err === 204){
					this.getProfile(username, true)
						.then(profile => resolve(Object.assign(profile, {
							user: { blocked: true }
						})))
						.catch(reject);
				}
				else
					reject(err);
			}));
	}
	_getStoryQueryHash(){
		return new Promise((resolve, reject) => {
			if(this.storyQueryHash) return resolve(this.storyQueryHash);
			self.get('', this.sessionId, false, { __a: undefined }).then(body => {
				self.get(body.match(/\/(static\/bundles\/.+\/Consumer\.js\/.+\.js)/)[1], undefined, false).then(body => {
					this.storyQueryHash = body.match(/50,[a-zA-Z]="([a-zA-Z0-9]{32})",/)[1];
					resolve(this.storyQueryHash);
				}).catch(reject);
			}).catch(reject);
		});
	}
	getProfileStoryById(id){
		return new Promise((resolve, reject) => {
			if(!this.sessionId) return reject(401);
			this._getStoryQueryHash().then(queryHash => self.get('graphql/query', this.sessionId, undefined, {
				query_hash: queryHash,
				variables: JSON.stringify({
					reel_ids: [ id ],
					precomposed_overlay: false
				})
			}).then(data => resolve({
				unread: data['reels_media'][0]['latest_reel_media'] !== data['reels_media'][0]['seen'],
				author: {
					username: data['reels_media'][0]['user']['username'],
					pic: data['reels_media'][0]['user']['profile_pic_url']
				},
				user: {
					requesting: data['reels_media'][0]['user']['requested_by_viewer'],
					following: data['reels_media'][0]['user']['followed_by_viewer']
				},
				items: data['reels_media'][0]['items'].map(item => ({
					url: item['is_video'] ? item['video_resources'][0]['src'] : item['display_url'],
					type: item['is_video'] ? 'video' : 'photo',
					timestamp: item['taken_at_timestamp'],
					expirationTimestamp: item['expiring_at_timestamp']
				}))
			})).catch(reject)).catch(reject);
		});
	}
	getProfileStory(username = this.username){
		return new Promise((resolve, reject) => {
			this.getProfile(username)
				.then(({ id }) =>
					this.getProfileStoryById(id)
						.then(resolve)
						.catch(reject))
				.catch(reject);
		});
	}
	getHashtag(hashtag){
		return new Promise((resolve, reject) => {
			const path = `explore/tags/${hashtag}`;
			self.get(path, this.sessionId)
				.then(hashtag => resolve({
					pic: hashtag['profile_pic_url'],
					posts: hashtag['edge_hashtag_to_media']['count'],
					featuredPosts: hashtag['edge_hashtag_to_top_posts']['edges'].map(post => self.postDetails(post)),
					lastPosts: hashtag['edge_hashtag_to_media']['edges'].map(post => self.postDetails(post)),
					link: insta + path,
					...(this.sessionId ? {
						user: {
							following: hashtag['is_following']
						}
					} : {})
				}))
				.catch(reject);
		});
	}
	getLocation(id){
		return new Promise((resolve, reject) => {
			const path = `explore/locations/${id}`;
			self.get(path)
				.then(location => {
					const address = JSON.parse(location['address_json']);
					resolve({
						pic: location['profile_pic_url'],
						posts: location['edge_location_to_media']['count'],
						address: {
							street: address['street_address'],
							zipCode: address['zip_code'],
							city: address['city_name'],
							latitude: location['lat'],
							longitude: location['lng']
						},
						website: location['website'],
						phone: location['phone'],
						featuredPosts: location['edge_location_to_top_posts']['edges'].map(post => self.postDetails(post)),
						lastPosts: location['edge_location_to_media']['edges'].map(post => self.postDetails(post)),
						link: insta + path
					});
				})
				.catch(reject);
		});
	}
	getPost(shortcode){
		return new Promise((resolve, reject) => {
			const path = `p/${shortcode}`;
			self.get(path, this.sessionId)
				.then(post => {
					const
						caption = post['edge_media_to_caption']['edges'].length > 0
							? post['edge_media_to_caption']['edges'][0]['node']['text'] : null,
						username = post['owner']['username'],
						hashtagsRegex = /(?<=[\s>])#(\d*[A-Za-z_]+\d*)\b(?!;)/g,
						usernamesRegex = /@([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\\.(?!\\.))){0,28}(?:[A-Za-z0-9_]))?)/g;
					resolve({
						author: {
							id: post['owner']['id'],
							username,
							name: post['owner']['full_name'],
							pic: post['owner']['profile_pic_url'],
							verified: post['owner']['is_verified'],
							link: `${ insta }/${ username }`
						},
						location: post['location'] ? {
							id: post['location']['id'],
							name: post['location']['name'],
							city: JSON.parse(post['location']['address_json'])['city_name']
						} : null,
						...(post['__typename'] === 'GraphImage' ? {
							contents: [{
								type: 'photo',
								url: post['display_url']
							}]
						} : {}),
						...(post['__typename'] === 'GraphVideo' ? {
							contents: [{
								type: 'video',
								url: post['video_url'],
								thumbnail: post['display_url'],
								views: post['video_view_count']
							}]
						} : {}),
						...(post['__typename'] === 'GraphSidecar' ? {
							contents: post['edge_sidecar_to_children']['edges']
								.map(content => ({
									type: content['node']['is_video'] ? 'video' : 'photo',
									url: content['node']['is_video'] ? content['node']['video_url'] : content['node']['display_url'],
									...(content['node']['is_video'] ? {
										thumbnail: content['node']['display_url'],
										views: content['node']['video_view_count']
									} : {})
								}))
						} : {}),
						tagged: post['edge_media_to_tagged_user']['edges']
							.map(u => u['node']['user']['username']),
						likes: post['edge_media_preview_like']['count'],
						caption,
						hashtags: caption ? caption.match(hashtagsRegex) : null,
						mentions: caption ? caption.match(usernamesRegex) : null,
						edited: post['caption_is_edited'] || false,
						comments: post['comments_disabled'] ? null : post[`edge_media_preview_comment`]['edges']
							.map(c => ({
								user: c['node']['owner']['username'],
								content: c['node']['text'],
								timestamp: c['node']['created_at'],
								hashtags: c['node']['text'].match(hashtagsRegex),
								mentions: c['node']['text'].match(usernamesRegex),
								likes: c['node']['edge_liked_by']['count']
							})),
						timestamp: post['taken_at_timestamp'],
						link: insta + path
					});
				})
				.catch(reject);
		});
	}
	searchProfile(query){
		return new Promise((resolve, reject) => self.search(query, this.sessionId)
			.then(res => resolve(res['users'].map(item => item['user']).map(profile => ({
				username: profile['username'],
				name: profile['full_name'],
				pic: profile['profile_pic_url'],
				private: profile['is_private'],
				verified: profile['is_verified'],
				followers: profile['follower_count'],
				...(this.sessionId ? {
					user: {
						following: profile['following']
					}
				} : {})
			}))))
			.catch(reject));
	}
	searchHashtag(query){
		return new Promise((resolve, reject) => self.search(query)
			.then(res => resolve(res['hashtags'].map(item => item['hashtag'])
				.map(hashtag => ({ name: hashtag['name'], posts: hashtag['media_count'] }))))
			.catch(reject));
	}
	searchLocation(query){
		return new Promise((resolve, reject) => self.search(query)
			.then(res => resolve(res['places'].map(item => item['place']['location']).map(location => ({
				id: location['pk'],
				name: location['name'],
				address: {
					street: location['address'],
					city: location['city'],
					latitude: location['lat'],
					longitude: location['lng']
				}
			}))))
			.catch(reject));
	}
	subscribeAccountNotifications(callback, {
		interval = 30,
		lastNotificationId
	}){
		let active = true;
		const checkNewNotifications = () => {
			if(!active) return;
			(async () => {
				try {
					const notifications = await this.getAccountNotifications();
					const lastNotificationIndex = notifications.findIndex(notification => notification.id === lastNotificationId);
					if(lastNotificationIndex !== -1){
						for(let i = lastNotificationIndex - 1; i > -1 ; i--){
							callback(notifications[i]);
						}
					}
					lastNotificationId = notifications[0].id;
					setTimeout(checkNewNotifications, interval * 1000);
				}
				catch(err){
					callback(undefined, err);
					checkNewNotifications();
				}
			})();
		};
		checkNewNotifications();
		return {
			unsubscribe: () => {
				active = false;
			}
		};
	}
	subscribeUserPosts(username, callback, {
		interval = 30,
		lastPostShortcode,
		fullPosts = false
	} = {}){
		let active = true;
		const checkNewPosts = () => {
			if(!active) return;
			(async () => {
				try {
					const profile = await this.getProfile(username);
					const lastPostIndex = profile.lastPosts.findIndex(post => post.shortcode === lastPostShortcode);
					if(lastPostIndex !== -1){
						for(let i = lastPostIndex - 1; i > -1 ; i--){
							callback(fullPosts ? (await this.getPost(profile.lastPosts[i].shortcode)) : profile.lastPosts[i]);
						}
					}
					lastPostShortcode = profile.lastPosts[0].shortcode;
					setTimeout(checkNewPosts, interval * 1000);
				}
				catch(err){
					callback(undefined, err);
					checkNewPosts();
				}
			})();
		};
		checkNewPosts();
		return {
			unsubscribe: () => {
				active = false;
			}
		};
	}
	subscribeHashtagPosts(hashtagName, callback, {
		interval = 30,
		lastPostShortcode = undefined,
		fullPosts = false
	} = {}){
		let active = true;
		const checkNewPosts = () => {
			if(!active) return;
			(async () => {
				try {
					const hashtag = await this.getHashtag(hashtagName);
					const lastPostIndex = hashtag.lastPosts.findIndex(post => post.shortcode === lastPostShortcode);
					for(let i = lastPostIndex - 1; i > -1 ; i--){
						callback(fullPosts ? (await this.getPost(hashtag.lastPosts[i].shortcode)) : hashtag.lastPosts[i]);
					}
					lastPostShortcode = hashtag.lastPosts[0].shortcode;
					setTimeout(checkNewPosts, interval * 1000);
				}
				catch(err){
					callback(undefined, err);
					checkNewPosts();
				}
			})();
		};
		checkNewPosts();
		return {
			unsubscribe: () => {
				active = false;
			}
		};
	}
};
