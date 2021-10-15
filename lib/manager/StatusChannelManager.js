const redis = require('redis');

const _ = require('lodash');

const DEFAULT_PREFIX = 'POMELO:CHANNEL';

class StatusChannelManager
{
	constructor(app, opts)	{
		this.app = app;
		this.opts = opts || {};
		this.prefix = opts.prefix || DEFAULT_PREFIX;
		if (this.opts.auth_pass) {
			this.opts.password = this.opts.auth_pass;
			delete this.opts.auth_pass;
		}
		this.redisClientV4 = null;
	}

	async start() {
		const redisClient = redis.createClient(this.opts);
		redisClient.on('error', err => {
			// throw new Error(`[globalChannel][redis errorEvent]err:${err.stack}`);
			return Promise.reject(`[globalChannel][redis errorEvent]err:${err.stack}`);
		});
		await redisClient.connect();
		this.redisClientV4 = redisClient.v4;
		this.redisClient = redisClient;
	}

	async stop(force = true)	{
		if (this.redisClient) {
			await this.redisClient.quit();
			this.redisClient = null;
			return true;
		}
		return true;
	}

	async clean() {
		const cleanKey = StatusChannelManager.GenCleanKey(this.prefix);
		const result = await this.redisClientV4.keys(cleanKey);
		if (_.isArray(result) && result.length > 0) {
			const cmdArr = [];
			for (const value of result)	{
				cmdArr.push(['del', value]);
			}
			const resultValue = await StatusChannelManager.ExecMultiCommands(this.redisClient, cmdArr);
			return resultValue;
		}
		return [];
	}

	async flushall()	{
		return await this.redisClient.flushAll();
	}

	async add(uid, sid) {
		const genKey = StatusChannelManager.GenKey(this.prefix, uid);
		return await this.redisClientV4.sAdd(genKey, sid);
	}

	async leave(uid, sid) {
		const genKey = StatusChannelManager.GenKey(this.prefix, uid);
		return await this.redisClientV4.sRem(genKey, sid);
	}

	async getSidsByUid(uid) {
		const genKey = StatusChannelManager.GenKey(this.prefix, uid);
		return await this.redisClientV4.sMembers(genKey);
	}

	async getSidsByUidArr(uidArr) {
		const cmdArr = [];
		for (const uid of uidArr)		{
			cmdArr.push(['sMembers', StatusChannelManager.GenKey(this.prefix, uid)]);
		}
		const result = await StatusChannelManager.ExecMultiCommands(this.redisClient, cmdArr);
		return _.zipObject(uidArr, result);
	}

	static async ExecMultiCommands(redisClient, cmdList)	{
		if (!cmdList || _.size(cmdList) <= 0) {
			return null;
		}
		const pipe = redisClient.multi();
		for (const cmd of cmdList)	{
			pipe.addCommand(cmd);
		}
		const resultValue = await pipe.EXEC();
		return resultValue;
	}

	static GenKey(prefix, id, channelName = null) {
		let genKey = '';
		if (channelName == null)
			genKey = `${prefix}:${id}`;
		else
			genKey = `${prefix}:${channelName}:${id}`;
		return genKey;
	}

	static GenCleanKey(prefix)	{
		return `${prefix}*`;
	}
}

module.exports = StatusChannelManager;
