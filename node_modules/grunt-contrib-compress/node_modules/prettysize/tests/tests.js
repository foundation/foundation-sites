var vows = require('vows'),
    assert = require('assert'),
    pretty = require('../index');

var tests = {
    'loading': {
        topic: function() {
            return pretty;
        },
        'should export a function': function(topic) {
            assert.isFunction(topic);
        }
    },
    'bytes': {
        topic: function() {
            return pretty(12);
        },
        'should print bytes': function(topic) {
            assert.equal(topic, '12 Bytes');
        }
    },
    'bytes with no space': {
        topic: function() {
            return pretty(12, true);
        },
        'should print bytes': function(topic) {
            assert.equal(topic, '12Bytes');
        }
    },
    'bytes with no space and one char': {
        topic: function() {
            return pretty(12, true, true);
        },
        'should print bytes': function(topic) {
            assert.equal(topic, '12B');
        }
    },
    'bytes with space and one char': {
        topic: function() {
            return pretty(12, false, true);
        },
        'should print bytes': function(topic) {
            assert.equal(topic, '12 B');
        }
    },
    'kilobytes': {
        topic: function() {
            return pretty(123456);
        },
        'should print kilobytes': function(topic) {
            assert.equal(topic, '120.6 kB');
        },
        'exact': {
            topic: function() {
                return pretty(1024);
            },
            'should be exactly 1 kB': function(topic) {
                assert.equal(topic, '1 kB');
            }
        }
    },
    'megs': {
        topic: function() {
            return pretty(123456789);
        },
        'should print megabytes': function(topic) {
            assert.equal(topic, '117.7 MB');
        },
        'exact': {
            topic: function() {
                return pretty(1024 * 1024);
            },
            'should be exactly 1 MB': function(topic) {
                assert.equal(topic, '1 MB');
            }
        }
    },
    'gigs': {
        topic: function() {
            return pretty(12345678901);
        },
        'should print gigabytes': function(topic) {
            assert.equal(topic, '11.5 GB');
        },
        'exact': {
            topic: function() {
                return pretty(1024 * 1024 * 1024);
            },
            'should be exactly 1 GB': function(topic) {
                assert.equal(topic, '1 GB');
            }
        }
    },
    'teras': {
        topic: function() {
            return pretty(1234567890123);
        },
        'should print terabytes': function(topic) {
            assert.equal(topic, '1.1 TB');
        },
        'exact': {
            topic: function() {
                return pretty(1024 * 1024 * 1024 * 1024);
            },
            'should be exactly 1 TB': function(topic) {
                assert.equal(topic, '1 TB');
            }
        }
    },
    'petas': {
        topic: function() {
            return pretty(1234567890123456);
        },
        'should print petaabytes': function(topic) {
            assert.equal(topic, '1.1 PB');
        },
        'exact': {
            topic: function() {
                return pretty(1024 * 1024 * 1024 * 1024 * 1024);
            },
            'should be exactly 1 PB': function(topic) {
                assert.equal(topic, '1 PB');
            }
        }
    },
    'exabyte': {
        topic: function() {
            return pretty(1234567890123456789);
        },
        'should print exabytes': function(topic) {
            assert.equal(topic, '1.1 EB');
        },
        'exact': {
            topic: function() {
                return pretty(1024 * 1024 * 1024 * 1024 * 1024 * 1024);
            },
            'should be exactly 1 EB': function(topic) {
                assert.equal(topic, '1 EB');
            }
        }
    },
    'zero bytes': {
        topic: function() {
            return pretty(0);
        },
        'should print bytes': function(topic) {
          console.log("----", topic)
            assert.equal(topic, '0 Bytes');
        }
    },
    'zero bytes with no space': {
        topic: function() {
            return pretty(0, true);
        },
        'should print bytes': function(topic) {
            assert.equal(topic, '0Bytes');
        }
    },
    'zero bytes with no space and one char': {
        topic: function() {
            return pretty(0, true, true);
        },
        'should print bytes': function(topic) {
            assert.equal(topic, '0B');
        }
    },
    'zero bytes with space and one char': {
        topic: function() {
            return pretty(0, false, true);
        },
        'should print bytes': function(topic) {
            assert.equal(topic, '0 B');
        }
    },
};

vows.describe('prettysize').addBatch(tests).export(module);
