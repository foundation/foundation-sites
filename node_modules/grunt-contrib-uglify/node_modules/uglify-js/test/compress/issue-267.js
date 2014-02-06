issue_267: {
    options = { comparisons: true };
    input: {
        x = a % b / b * c * 2;
        x = a % b * 2
    }
    expect: {
        x = a % b / b * c * 2;
        x = a % b * 2;
    }
}
