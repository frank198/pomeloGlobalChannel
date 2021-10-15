/**
 * Created by frank on 16-11-3.
 */

const _ = require('lodash');
const config = require('./config/redisConfig').redisChannel;
const RedisManager = require('../lib/manager/RedisGlobalChannelManager');

const redisManager = new RedisManager(null, config);

const serverType = 'connector';
const serverId = ['connector_1', 'connector_2', 'connector_3'];
const serverData = [{id: 'connector_1'}, {id: 'connector_2'}, {id: 'connector_3'}];
const channelName = 'channelName';

describe('channelName', () => {
	before( done => {
		redisManager.start()
			.then(result =>
			{
				return redisManager.clean()
			})
			.catch(error =>{
				console.error(error);
			})
			.finally(done);

	});

	after( done => {
		redisManager.stop().finally(done);
	});

	it('addTest', done => {
		const coArr = [];
		for (let i = 0; i < 10; i++) {
			coArr.push(redisManager.add(`uuid_${i}`, _.sample(serverId), channelName));
		}
		Promise.all(coArr)
			.then(result =>{
				console.info(result);
			})
			.catch(error =>{
				console.error(error);
			})
			.finally(done);
	});

	it('getMembersBySid', done => {
		redisManager.getMembersBySid(channelName, _.sample(serverId))
			.then(result =>{
				console.info(result);
			}).finally(done);
	});

	it('leave',  done =>	{
		const coArr = [];
		for (const id of serverId) {
			coArr.push(redisManager.leave('uuid_1', id, channelName));
		}
		Promise.all(coArr).then(result =>{
			console.info(result);
		}).finally(done);
	});

	it('getMembersByChannel',  done => {
		redisManager.getMembersByChannelName(serverData, channelName)
		.then(result =>{
			console.info(result);
		}).finally(done);
	});
});

describe('global service ', () => {
	before( done =>	{
		redisManager.start()
			.then(result =>
			{
				return redisManager.clean()
			})
			.catch(error =>{
				console.error(error);
			})
			.finally(done);
	});

	after( done =>	{
		redisManager.stop().finally(done);
	});

	it('add', done =>	{
		const coArr = [];
		for (let i = 0; i < 10; i++) {
			coArr.push(redisManager.add(`uuid_${i % 3}`, _.sample(serverId)));
		}
		Promise.all(coArr)
			.then(result =>{
				console.info(result);
			})
			.catch(error =>{
				console.error(error);
			})
			.finally(done);
	});

	it('getSidsByUid',  done =>	{
		redisManager.getSidsByUid('uuid_1')
			.then(result =>{
				console.info(result);
			})
			.catch(error =>{
				console.error(error);
			})
			.finally(done);
	});

	it('getSidsByUidArr',  done =>	{
		redisManager.getSidsByUidArr(['uuid_1', 'uuid_2', 'uuid_0'])
			.then(result =>{
				console.info(result);
			})
			.catch(error =>{
				console.error(error);
			})
			.finally(done);

	});

	it('leave',  done =>	{
		const coArr = [];
		for (const id of serverId) {
			coArr.push(redisManager.leave('uuid_1', id));
		}
		Promise.all(coArr)
			.then(result =>{
				console.info(result);
			})
			.catch(error =>{
				console.error(error);
			})
			.finally(done);
	});

	it('flushall', done =>{
		redisManager.flushall()
			.then(result =>{
				console.info(result);
			})
			.catch(error =>{
				console.error(error);
			})
			.finally(done);;
	});

	it('getSidsByUidArr', done =>	{
		redisManager.getSidsByUidArr(['uuid_1', 'uuid_2', 'uuid_0'])
			.then(result =>{
				console.info(result);
			})
			.catch(error =>{
				console.error(error);
			})
			.finally(done);;
	});
});
