unused_funarg_1: {
    options = { unused: true };
    input: {
        function f(a, b, c, d, e) {
            return a + b;
        }
    }
    expect: {
        function f(a, b) {
            return a + b;
        }
    }
}

unused_funarg_2: {
    options = { unused: true };
    input: {
        function f(a, b, c, d, e) {
            return a + c;
        }
    }
    expect: {
        function f(a, b, c) {
            return a + c;
        }
    }
}

unused_nested_function: {
    options = { unused: true };
    input: {
        function f(x, y) {
            function g() {
                something();
            }
            return x + y;
        }
    };
    expect: {
        function f(x, y) {
            return x + y;
        }
    }
}

unused_circular_references_1: {
    options = { unused: true };
    input: {
        function f(x, y) {
            // circular reference
            function g() {
                return h();
            }
            function h() {
                return g();
            }
            return x + y;
        }
    };
    expect: {
        function f(x, y) {
            return x + y;
        }
    }
}

unused_circular_references_2: {
    options = { unused: true };
    input: {
        function f(x, y) {
            var foo = 1, bar = baz, baz = foo + bar, qwe = moo();
            return x + y;
        }
    };
    expect: {
        function f(x, y) {
            moo();              // keeps side effect
            return x + y;
        }
    }
}

unused_circular_references_3: {
    options = { unused: true };
    input: {
        function f(x, y) {
            var g = function() { return h() };
            var h = function() { return g() };
            return x + y;
        }
    };
    expect: {
        function f(x, y) {
            return x + y;
        }
    }
}

unused_keep_setter_arg: {
    options = { unused: true };
    input: {
        var x = {
            _foo: null,
            set foo(val) {
            },
            get foo() {
                return this._foo;
            }
        }
    }
    expect: {
        var x = {
            _foo: null,
            set foo(val) {
            },
            get foo() {
                return this._foo;
            }
        }
    }
}

unused_var_in_catch: {
    options = { unused: true };
    input: {
        function foo() {
            try {
                foo();
            } catch(ex) {
                var x = 10;
            }
        }
    }
    expect: {
        function foo() {
            try {
                foo();
            } catch(ex) {}
        }
    }
}

used_var_in_catch: {
    options = { unused: true };
    input: {
        function foo() {
            try {
                foo();
            } catch(ex) {
                var x = 10;
            }
            return x;
        }
    }
    expect: {
        function foo() {
            try {
                foo();
            } catch(ex) {
                var x = 10;
            }
            return x;
        }
    }
}
