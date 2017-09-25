suite('"About" Page Tests', function() {
    test('page should link to contact page', function() {
        assert($('a[href="/contact"]').length);
    });
});