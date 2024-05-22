function foo(n){
    if(typeof n === 'object') setTimeout(()=> false)
    console.log(n*n)
    return n *n;
}

foo(1)
foo('10', true)
foo({})