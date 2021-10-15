/**
 * Created by frank on 16-11-4.
 */

module.exports.redisChannel =
{
    family      : 4,           // 4 (IPv4) or 6 (IPv6)
    password : 'GameMirror',
    options     : {},
    url        : 'redis://192.168.31.91:6801',
    legacyMode: true,
    db          : 5      // optinal, from 0 to 15 with default redis configure
};
