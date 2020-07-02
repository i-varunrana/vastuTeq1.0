
window.onload = function() {

    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');
    const loginSubmitBtn = document.querySelector('.login-submit-btn');
    const signupSubmitBtn = document.querySelector('.signup-submit-btn');

    loginBtn.addEventListener('click', (e) => {
        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if(element !== "slide-up") {
                parent.classList.add('slide-up')
            }else{
                signupBtn.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    });

    signupBtn.addEventListener('click', (e) => {
        let parent = e.target.parentNode;
        Array.from(e.target.parentNode.classList).find((element) => {
            if(element !== "slide-up") {
                parent.classList.add('slide-up')
            }else{
                loginBtn.parentNode.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    });

    loginSubmitBtn.addEventListener('click', (e) => {
        window.location.href = 'dashboard.html'
    })

    signupSubmitBtn.addEventListener('click', (e) => {
        let name = document.querySelector("[name='name']").value;
        let emailAddress = document.querySelector("[name='email']").value;
        let password = document.querySelector("[name='password']").value;

        if(name == "" && emailAddress == "" && password == "") {

        }else {
            alert("All fields are required");
        }

        //console.log(name,emailAddress,password);
    })


}
