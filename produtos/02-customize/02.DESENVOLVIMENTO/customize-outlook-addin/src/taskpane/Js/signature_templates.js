// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
function get_template_A_str(user_info) {
  let str = "";

  str += `
  <style>
    *{
      box-sizing: border-box;
      padding:0;
      margin:0;
    }

    td{
      padding:0 5px;
    }

    table {
      border-collapse: collapse;
      padding:0;
      margin:0;
    }

    .user-info h2{
      color: #0067FF;
      font-family: 'Poppins', sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      letter-spacing: 0.84px;
      margin-bottom: 5px;
    }

    .user-info p, a{
      color: #003B75;
      font-family: 'Poppins', sans-serif;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.096px;
      text-decoration: none;
    }

    .slogan{
      color: #0067FF;
      font-family: 'Poppins', sans-serif;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: small;
      letter-spacing: 1.05px;
      margin-top: 10.72px;
    }
    
    
    
  </style>
  <br/>
  <br/>
  <br/>
  <br/>
  <table cellpadding="0" cellspacing="0" border="0" resize="none">
  <tr>
    <td width="154" valign="top">
      <img src="https://raw.githubusercontent.com/ally-tpfe/customize-assets/main/side-a.png" alt="" width="154" height="150">
    </td>
    ${user_info.user_photo !== "null" ? 
    `<td class="avatar"><img style="border-radius:50%;" src="${user_info.user_photo}" alt="" width="120" height="120" /> </td>`
   : ""}
   <td valign="center" width="180" style="line-height: 1;">
   <h2 style="color: #0067FF; font-size: 12px; font-weight: 800; margin-bottom: 1px; font-family: 'Poppins', sans-serif;">${to_uppercase(user_info.name)}</h2>
   <a href="mailto:${user_info.email}" style="color: #003B75; font-size: 11px; text-decoration: none; font-weight: 400; font-family: 'Poppins', sans-serif; margin: 0;">${user_info.email}</a>
   ${user_info.work_phone !== "null" ? `<br><a style="font-family: 'Poppins', sans-serif; margin: 0;" href="tel:${user_info.work_phone}">${user_info.work_phone} ${user_info.work_phone_extension !== "null" ? `ramal - ${user_info.work_phone_extension}` : ""}</a>` : ""}
   ${user_info.personal_phone !== "null" ? `<br><a href="tel:${user_info.personal_phone}" style="margin: 0;">${user_info.personal_phone}</a>` : ""}
   <br><a href="https://www.tpfengenharia.com.br" target="_blank" style="font-family: 'Poppins', sans-serif; text-decoration: none; margin: 0;">www.tpfengenharia.com.br</a>
   <table>
     <td valign="top">
       <a href="https://www.linkedin.com/company/tpfengenharia" target="_blank">
         <img src="https://github.com/ally-tpfe/customize-assets/blob/main/linkedin.png?raw=true" alt="" width="13" height="13">
       </a>
     </td>
     <td>
       <a href="https://www.instagram.com/tpfengenharia" target="_blank">
         <img src="https://github.com/ally-tpfe/customize-assets/blob/main/instagram.png?raw=true" alt="" width="14" height="14">
       </a>
     </td>
   </table>
   <p style="color: #0067FF; font-size: 13px; font-weight: 400; margin-top: 3px;">Building the world, <b>better.</b></p>
 </td>
 
 
    <td width="95" valign="top">
      <img src="https://raw.githubusercontent.com/ally-tpfe/customize-assets/main/side-b.png" alt="" width="95" height="150">
    </td>
  </tr>
</table>
  `;

  return str;
}




function get_template_B_str(user_info)
{
  let str = "";
  if (is_valid_data(user_info.greeting))
  {
    str += user_info.greeting + "<br/>";
  }

  str += "<table>";
  str +=   "<tr>";
  str +=     "<td style='border-right: 1px solid #000000; padding-right: 5px;'><img src='https://officedev.github.io/Office-Add-in-samples/Samples/outlook-set-signature/assets/sample-logo.png' alt='Logo' /></td>";
  str +=     "<td style='padding-left: 5px;'>";
  str +=	   "<strong>" + user_info.name + "</strong>";
  str +=     "<br/>";
  str +=	   user_info.email + "<br/>";
  str +=	   is_valid_data(user_info.phone) ? user_info.phone + "<br/>" : "";
  str +=     "</td>";
  str +=   "</tr>";
  str += "</table>";

  return str;
}

function get_template_C_str(user_info)
{
  let str = "";
  if (is_valid_data(user_info.greeting))
  {
    str += user_info.greeting + "<br/>";
  }

  str += user_info.name;
  
  return str;
}