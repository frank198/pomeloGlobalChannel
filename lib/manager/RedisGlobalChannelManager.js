const StatusChannelManager = require('./StatusChannelManager');
const _ = require('lodash');

class GlobalChannelManager extends StatusChannelManager
{
	async add(uid, sid, channelName = null) {
		if (_.isEmpty(channelName)) return await super.add(uid, sid);
		if (Array.isArray(channelName)) {
			const cmdArr = [];
			for (const channel of channelName) {
				cmdArr.push(['sAdd', StatusChannelManager.GenKey(this.prefix, sid, channel), uid]);
			}
			return await StatusChannelManager.ExecMultiCommands(this.redisClient, cmdArr);
		}
		const genKey = StatusChannelManager.GenKey(this.prefix, sid, channelName);
		return await this.redisClientV4.sAdd(genKey, uid);
	}

	async destroyChannel(channelName) {
	    const servers = this.app.getServers();
		const cmdArr = [];
		for (const serverId in servers) {
			const server = servers[serverId];
			if (this.app.isFrontend(server)) {
	            cmdArr.push(['del', StatusChannelManager.GenKey(this.prefix, serverId, channelName)]);
			}
		}
		return await StatusChannelManager.ExecMultiCommands(this.redisClient, cmdArr);
	}

	async leave(uid, sid, channelName = null) {
	    if (_.isEmpty(channelName)) return await super.leave(uid, sid);
	    if (Array.isArray(channelName)) {
		    const cmdArr = [];
			for (const channel of channelName) {
				cmdArr.push(['sRem', StatusChannelManager.GenKey(this.prefix, sid, channel), uid]);
			}
		    return await StatusChannelManager.ExecMultiCommands(this.redisClient, cmdArr);
	    }
		const genKey = StatusChannelManager.GenKey(this.prefix, sid, channelName);
	    return await this.redisClientV4.sRem(genKey, uid);
	}

	async getMembersBySid(channelName, sid) {
		const genKey = StatusChannelManager.GenKey(this.prefix, sid, channelName);
		return await this.redisClientV4.sMembers(genKey);
	}

	/**
	 * Get members by channelName and serverType.
	 * 获取指定 channelName 的成员
	 * @param  {String}   serverType frontend server type string
	 * @param  {String}   channelName channel name
	 * @private
	 */
	async getMembersByChannelName(serverType, channelName) {
		let servers = serverType;
		if (typeof serverType == 'string') {
			servers = this.app.getServersByType(serverType);
		}
		if (!servers || servers.length === 0) {
			// no frontend server infos
			return [];
		}
		const serverId = [];
		const cmdArr = [];
		for (const serverObject of servers)	{
			const sid = serverObject.id;
			serverId.push(sid);
			cmdArr.push(['sMembers', StatusChannelManager.GenKey(this.prefix, sid, channelName)]);
		}
		const result = await StatusChannelManager.ExecMultiCommands(this.redisClient, cmdArr);
		return _.zipObject(serverId, result);
	}
}

module.exports = GlobalChannelManager;
