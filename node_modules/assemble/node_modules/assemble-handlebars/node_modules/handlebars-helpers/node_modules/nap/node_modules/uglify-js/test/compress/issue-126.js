concatenate_rhs_strings: {
    options = {
        evaluate: true,
        unsafe: true,
    }
    input: {
        foo(bar() + 123 + "Hello" + "World");
        foo(bar() + (123 + "Hello") + "World");
        foo((bar() + 123) + "Hello" + "World");
        foo(bar() + 123 + "Hello" + "World" + ("Foo" + "Bar"));
        foo("Foo" + "Bar" + bar() + 123 + "Hello" + "World" + ("Foo" + "Bar"));
        foo("Hello" + bar() + 123 + "World");
        foo(bar() + 'Foo' + (10 + parseInt('10')));
    }
    expect: {
        foo(bar() + 123 + "HelloWorld");
        foo(bar() + "123HelloWorld");
        foo((bar() + 123) + "HelloWorld");
        foo(bar() + 123 + "HelloWorldFooBar");
        foo("FooBar" + bar() + "123HelloWorldFooBar");
        foo("Hello" + bar() + "123World");
        foo(bar() + 'Foo' + (10 + parseInt('10')));
    }
}
