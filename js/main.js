import Models from './helper/models.class.js';

var model = new Models();

// window.onload = function() {

//     const loginBtn = document.getElementById('login');
//     const signupBtn = document.getElementById('signup');
//     const loginSubmitBtn = document.querySelector('.login-submit-btn');
//     const signupSubmitBtn = document.querySelector('.signup-submit-btn');

//     loginBtn.addEventListener('click', (e) => {
//         let parent = e.target.parentNode.parentNode;
//         Array.from(e.target.parentNode.parentNode.classList).find((element) => {
//             if(element !== "slide-up") {
//                 parent.classList.add('slide-up')
//             }else{
//                 signupBtn.parentNode.classList.add('slide-up')
//                 parent.classList.remove('slide-up')
//             }
//         });
//     });

//     signupBtn.addEventListener('click', (e) => {
//         let parent = e.target.parentNode;
//         Array.from(e.target.parentNode.classList).find((element) => {
//             if(element !== "slide-up") {
//                 parent.classList.add('slide-up')
//             }else{
//                 loginBtn.parentNode.parentNode.classList.add('slide-up')
//                 parent.classList.remove('slide-up')
//             }
//         });
//     });

//     loginSubmitBtn.addEventListener('click', (e) => {
//         //window.location.href = 'dashboard.html';
//         let name = document.querySelector(".login-input[name='name']").value;
//         let password = document.querySelector(".login-input[name='password']").value;

//         if(name == "" && password == "") {
            
//         }else {
//             alert("All fields are required");
//         }
//     })

//     signupSubmitBtn.addEventListener('click', (e) => {
//         let name = document.querySelector(".signup-input[name='name']").value;
//         let emailAddress = document.querySelector(".signup-input[name='email']").value;
//         let password = document.querySelector(".signup-input[name='password']").value;

//         if(name == "" && emailAddress == "" && password == "") {
//             alert("All fields are required");
//         }else {
//             model.addUser({name:name,email:emailAddress,password:password});
//             window.location.href = 'draw.html'
//         }
//     })


// }

var formAnim = {
	$form: $('#form'),
	animClasses: ['face-up-left', 'face-up-right', 'face-down-left', 'face-down-right', 'form-complete', 'form-error'],
	resetClasses: function() {
		var $form = this.$form;
		
		$.each(this.animClasses, function(k, c) {
			$form.removeClass(c);
		});
	},
	faceDirection: function(d) {
		this.resetClasses();
		
		d = parseInt(d) < this.animClasses.length? d : -1;
		
		if(d >= 0) {
			this.$form.addClass(this.animClasses[d]);
		} 
	}
}

var $input = $('#email, #password'),
		$submit = $('#submit'),
		focused = false,
		completed = false;


$input.focus(function() {
	focused = true;
	
	if(completed) {
		formAnim.faceDirection(1);
	} else {
		formAnim.faceDirection(0);
	}
});

$input.blur(function() {
	formAnim.resetClasses();
});

$input.on('input paste keyup', function() {
	completed = true;
	
	$input.each(function() {
		if(this.value == '') {
			completed = false;
		}
	});
	
	if(completed) {
		formAnim.faceDirection(1);
	} else {
		formAnim.faceDirection(0);
	}
});

$submit.click(function() {
	focused = true;
	formAnim.resetClasses();
	
	if(completed) {
		$submit.css('pointer-events', 'none');
		setTimeout(function() {
			formAnim.faceDirection(4);
			$input.val('');
			completed = false;

			setTimeout(function() {
				$submit.css('pointer-events', '');
				formAnim.resetClasses();
			}, 2000);
		}, 1000);
	} else {
		setTimeout(function() {
			formAnim.faceDirection(5);

			setTimeout(function() {
				formAnim.resetClasses();
			}, 2000);
		}, 1000);
	}
});

$(function() {
	setTimeout(function() {
		if(!focused) {
			$input.eq(0).focus();
		}
	}, 2000);
})


// var express = require("express");
// var bodyParser = require("body-parser");

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:5500/gfg');
// var db = mongoose.connection;
// db.on('error', console.log.bind(console, "connection error"))
// db.once('open', function(callback) {
//     console.log("connection succeded");
// })

// var app = express();

// app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.post('/sign_up', function(req, res) {
//     var email = 
// })
