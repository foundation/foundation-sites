issue_269_1: {
	options = {unsafe: true};
	input: {
		f(
			String(x),
			Number(x),
			Boolean(x),

			String(),
			Number(),
			Boolean()
		);
	}
	expect: {
		f(
			x + '', +x, !!x,
			'', 0, false
		);
	}
}

issue_269_dangers: {
	options = {unsafe: true};
	input: {
		f(
			String(x, x),
			Number(x, x),
			Boolean(x, x)
		);
	}
	expect: {
		f(String(x, x), Number(x, x), Boolean(x, x));
	}
}

issue_269_in_scope: {
	options = {unsafe: true};
	input: {
		var String, Number, Boolean;
		f(
			String(x),
			Number(x, x),
			Boolean(x)
		);
	}
	expect: {
		var String, Number, Boolean;
		f(String(x), Number(x, x), Boolean(x));
	}
}

strings_concat: {
	options = {unsafe: true};
	input: {
		f(
			String(x + 'str'),
			String('str' + x),
			String(x + 5)
		);
	}
	expect: {
		f(
			x + 'str',
			'str' + x,
			x + '5'
		);
	}
}