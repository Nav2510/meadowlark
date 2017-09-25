suite('"About" Page Tests', function() {
<<<<<<< HEAD
    test('page should link to contact page', function() {
        assert($('a[href="/contact"]').length);
    });
=======
	test('page should contain link to contact page', function() {
		assert($('a[href = "/contact"]').length);
	});
>>>>>>> origin/qa_testing_wks
});