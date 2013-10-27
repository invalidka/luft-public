<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller {

	public function index()
	{
		echo 'No direct access.';
	}

	public function signout()
	{
		$this->session->sess_destroy();
		redirect('/');
	}

	/* check pending tokens */
	public function check_token() {
		/* find existing token */
		$token = Token::find('first', array('conditions' => array('id = ?',$this->input->post('token'))));
		if($token){
			/* lookup site user by luft_id */
			$user = SiteUser::find('first', array('conditions' => array('luft_id = ?',$token->user_id)));
			if($token->action == 'signin'){
				/* do things at signin, in this case set user in session and increment login count */
				$user->login_count = $user->login_count + 1;
				$user->save();

				$this->session->set_userdata('user',$user->name);
				$this->session->set_userdata('login_count',$user->login_count);
			}else if($token->action == 'singup'){
				/* do things at signup, nothing in this case */
			}

			/* let the front end know that the user correctly logged in or signed up */
			$response = array('status' => 1, 'name' => $user->name, 'action' => $token->action, 'login_count' => $user->login_count);
			
			/* clean up token */
			$token->delete();
		}else{
			/* something went wrong */
			$response = array('status' => 0);
		}

		/* send response to front end */
		$this->output->set_content_type('application/json')->set_output(json_encode($response));
	}

	/* callback to be used by luft, set at Luft.callback_url from javascript */
	public function luft_callback()	{
		/* these parameters will be posted by luft */
		$token = $this->input->post('token');
		$action = $this->input->post('action');
		$user_id = $this->input->post('user_id');
		$name = $this->input->post('name');

		/* keep track of the authorization in a token construct */
		$new_token = Token::create(array(
			'id' => $token,
			'action' => $action,
			'user_id' => $user_id));

		/* create user on our site if new user registered through luft */
		if($new_token->action == 'signup'){
			$new_user = SiteUser::create(array(
				'name' => $name,
				'luft_id' => $user_id
				));
		}

		/* send acknowledgement to luft */
		if($new_token){
			echo json_encode(array('status' => 1));
			return;
		}

		/* send failure message to luft */
		echo json_encode(array('status' => 0));
		return;
	}
}
