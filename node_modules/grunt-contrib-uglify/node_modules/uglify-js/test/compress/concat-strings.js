concat_1: {
    options = {
        evaluate: true
    };
    input: {
        var a = "foo" + "bar" + x() + "moo" + "foo" + y() + "x" + "y" + "z" + q();
        var b = "foo" + 1 + x() + 2 + "boo";
        var c = 1 + x() + 2 + "boo";

        // this CAN'T safely be shortened to 1 + x() + "5boo"
        var d = 1 + x() + 2 + 3 + "boo";

        var e = 1 + x() + 2 + "X" + 3 + "boo";
    }
    expect: {
        var a = "foobar" + x() + "moofoo" + y() + "xyz" + q();
        var b = "foo1" + x() + "2boo";
        var c = 1 + x() + 2 + "boo";
        var d = 1 + x() + 2 + 3 + "boo";
        var e = 1 + x() + 2 + "X3boo";
    }
}
