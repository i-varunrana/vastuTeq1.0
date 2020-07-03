import Models from './helper/models.class.js';

var model = new Models();

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
        //window.location.href = 'dashboard.html';
        let name = document.querySelector(".login-input[name='name']").value;
        let password = document.querySelector(".login-input[name='password']").value;

        if(name == "" && password == "") {
            
        }else {
            alert("All fields are required");
        }
    })

    signupSubmitBtn.addEventListener('click', (e) => {
        let name = document.querySelector(".signup-input[name='name']").value;
        let emailAddress = document.querySelector(".signup-input[name='email']").value;
        let password = document.querySelector(".signup-input[name='password']").value;

        if(name == "" && emailAddress == "" && password == "") {
            alert("All fields are required");
        }else {
            model.addUser({name:name,email:emailAddress,password:password});
            window.location.href = 'draw.html'
        }
    })


}
