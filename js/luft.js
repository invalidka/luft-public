/*
	Luft JS
*/

Luft = new Object();
Luft.callback_url = '/check_token'; /* default, you need to change this to your backend endpoint that checks tokens. */

$(function() {
	var this_host = window.location.host;
	var date = new Date();
	var time = date.getTime();
	var signup_token = time+luft_rand(115);
	var signin_token = time+luft_rand(115);

	$( "#luft-signup-btn" ).bind( "click", function() {
		window.open('http://local.luft.im/auth/signup/'+this_host+'/'+signup_token,'Sign Up with LUFT','left=100,top=100,width=600,height=672',false);
		function luft_check_signup(){
			$.post( Luft.callback_url, { token: signup_token }, function( data ) {
				console.log(data);
				if(data.status){
					/* place success signup code here! */
					$("#username").html('Thanks <b class="guest-name">'+data.name+'</b>.You\'re all registered. Now try signing in!');

					console.log('SUCCESS SIGNED UP!');
				}else{
					console.log('NOT YET, KEEP ASKING SIGNUP!');
					setTimeout(function() {
					      luft_check_signup();
					}, 500);
				}
			});
		}
		luft_check_signup();
	});

	$( "#luft-signin-btn" ).bind( "click", function() {
		window.open('http://local.luft.im/auth/signin/'+this_host+'/'+signin_token,'Sign In with LUFT','left=100,top=100,width=600,height=642',false);
		function luft_check_signin(){
			$.post( Luft.callback_url, { token: signin_token }, function( data ) {
				console.log(data);
				if(data.status){
					/* place success signin code here! */
					$("#username").html('Hi <b class="guest-name">'+data.name+'</b>. You\'ve been here <b class="guest-name">'+data.login_count+'</b> time(s).');
					$('#logout-btn').show();
					$("#auth-buttons").hide();


					console.log('SUCCESS LOGGED IN!');
				}else{
					console.log('NOT YET, KEEP ASKING SIGNIN!');
					setTimeout(function() {
					      luft_check_signin();
					}, 500);
				}
			});
		}
		luft_check_signin();
	});
});

function luft_rand(length) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = length;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}	
