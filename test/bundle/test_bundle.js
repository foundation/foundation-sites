describe('Foundation bundle', () => {
    it('can be imported via AMD', done => {
        require(['../../_build/assets/js/foundation'], foundation => {
            foundation.Foundation.should.be.an('object');
            done();
        }, err => {
            if (err) throw err;
        });
    });
});
