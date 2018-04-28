//print out the test results.......
let printTestResults = function(passing, errors){

    let tdv = document.getElementById('tdv');
    let p = document.createElement('p');
    p.id = 'test1';
    if(passing){
        p.innerHTML = "All Tests Passed";
    }
    else{

        p.innerHTML = "Failed " + errors.length + " tests";
        let ul = document.createElement('ul');
        p.appendChild(ul);
        let li;
        for(let t=0;t<errors.length;t++){
            console.log(errors[t])
            li = document.createElement('li');
            li.innerHTML = errors[t];
            ul.appendChild(li);
        }
    }

    tdv.appendChild(p);

}
