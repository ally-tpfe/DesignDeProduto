// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

let _display_name;
let _email_id;
let _personal_number;
let _office_number;
let _user_photo;
let _message;
let _customize_link;

let user_info;

Office.initialize = function(reason)
{
  on_initialization_complete();
}

function on_initialization_complete()
{
	$(document).ready
	(
		function()
		{
      fetch_user_info().then(() => {
        _message=$("#message");
        _customize_link=$("#link");
        create_user_info_assignSignature();
      })
      
		}
	);
}

async function fetch_user_info() {
  _email_id = Office.context.mailbox.userProfile.emailAddress;
  let apiUrl = `https://customize.tpfe.com.br/api/users?email=${_email_id}&apiKey=eba33af7-acac-4207-b4f5-b0ea78be9c2b`;
  try {
      const response = await fetch(apiUrl);
      if (response.ok) {
          user_info = await response.json();
          console.log(user_info);
      } else {
          console.error("Failed to fetch user info");
      }
  } catch (error) {
      console.error("Error while fetching user info:", error);
  }
}



function display_message(msg)
{
  _message.text(msg);
}

function display_link(){
  _customize_link.text("Acessar Customize")
}

function clear_message()
{
  _message.text("");
}

function is_not_valid_text(text)
{
  return text.length <= 0;
}

function is_not_valid_email_address(email_address)
{
  let email_address_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return is_not_valid_text(email_address) || !(email_address_regex.test(email_address));
}

function form_has_valid_data(name, email)
{
  if (is_not_valid_text(name))
  {
    display_message("Please enter a valid name.");
    return false;
  }

  if (is_not_valid_email_address(email))
  {
    display_message("Please enter a valid email address.");
    return false;
  }

  return true;
}

function navigate_to_taskpane_assignsignature()
{
  window.location.href = 'assignsignature.html';
}

function create_user_info()
{

  localStorage.setItem('user_info', JSON.stringify(user_info));
  navigate_to_taskpane_assignsignature();
}

function create_user_info_assignSignature()
{

  localStorage.setItem('user_info', JSON.stringify(user_info));
}


function clear_all_localstorage_data()
{
  localStorage.removeItem('user_info');
  localStorage.removeItem('newMail');
  localStorage.removeItem('reply');
  localStorage.removeItem('forward');
  localStorage.removeItem('override_olk_signature');
}

function clear_roaming_settings()
{
  Office.context.roamingSettings.remove('user_info');
  Office.context.roamingSettings.remove('newMail');
  Office.context.roamingSettings.remove('reply');
  Office.context.roamingSettings.remove('forward');
  Office.context.roamingSettings.remove('override_olk_signature');

  Office.context.roamingSettings.saveAsync
  (
    function (asyncResult)
    {
      console.log("clear_roaming_settings - " + JSON.stringify(asyncResult));

      let message = "All settings reset successfully! This add-in won't insert any signatures. You can close this pane now.";
      if (asyncResult.status === Office.AsyncResultStatus.Failed)
      {
        message = "Failed to reset. Please try again.";
      }

      display_message(message);
    }
  );
}

function reset_all_configuration()
{
  
  clear_all_localstorage_data();
  clear_roaming_settings();
  display_message(`
  As configurações de sua assinatura foram resetadas.
  Reinicie o add-in para recuperar suas informações atuais do Customize
  ou acesse o painel de assinatura (customize.tpfe.com.br) para criar uma nova assinatura.
  `);
  // wait 1 second and then clear the message
  setTimeout(function() {
      clear_message();
  }, 8000);
  setTimeout(function() {
    display_link();
  }, 8000);

}
