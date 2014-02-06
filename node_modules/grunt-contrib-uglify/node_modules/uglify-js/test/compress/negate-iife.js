negate_iife_1: {
    options = {
        negate_iife: true
    };
    input: {
        (function(){ stuff() })();
    }
    expect: {
        !function(){ stuff() }();
    }
}

negate_iife_2: {
    options = {
        negate_iife: true
    };
    input: {
        (function(){ return {} })().x = 10; // should not transform this one
    }
    expect: {
        (function(){ return {} })().x = 10;
    }
}

negate_iife_3: {
    options = {
        negate_iife: true,
    };
    input: {
        (function(){ return true })() ? console.log(true) : console.log(false);
    }
    expect: {
        !function(){ return true }() ? console.log(false) : console.log(true);
    }
}

negate_iife_3: {
    options = {
        negate_iife: true,
        sequences: true
    };
    input: {
        (function(){ return true })() ? console.log(true) : console.log(false);
        (function(){
            console.log("something");
        })();
    }
    expect: {
        !function(){ return true }() ? console.log(false) : console.log(true), function(){
            console.log("something");
        }();
    }
}

negate_iife_4: {
    options = {
        negate_iife: true,
        sequences: true,
        conditionals: true,
    };
    input: {
        if ((function(){ return true })()) {
            console.log(true);
        } else {
            console.log(false);
        }
        (function(){
            console.log("something");
        })();
    }
    expect: {
        !function(){ return true }() ? console.log(false) : console.log(true), function(){
            console.log("something");
        }();
    }
}
