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
      line-height: normal;
      letter-spacing: 1.05px;
      margin-top: 10.72px;
    }

    
  </style>
    <table>
      <tr>
        <td>
          <img src='https://raw.githubusercontent.com/ally-tpfe/customize-assets/main/side-a.png' alt='' width='154' height='150' />
        </td>
        ${user_info.user_photo ? 
          `<td class="avatar"><img style="border-radius:50%;" src="${user_info.user_photo}" alt="" width="120" height="120" /> </td>`
         : ""}
        <td ></td>
    <td></td>
        <td class="user-info">
          <h2 style="font-family: 'BRSonoma-Black', Helvetica;">${to_uppercase(user_info.name)}</h2>
          <div style="display:flex;flex-direction:column;line-height:1.5">
          <a href="mailto:${user_info.email}">${user_info.email}</a>
            ${user_info.work_phone !== "null" ? `<a href="tel:${user_info.work_phone}">${user_info.work_phone}  ${user_info.work_phone_extension !== "null" ? `ramal - ${user_info.work_phone_extension}` : ""}</a>` : ""}
            ${user_info.personal_phone !== "null" ? `<a href="tel:${user_info.personal_phone}">${user_info.personal_phone}</a>` : ""} 
            <a href="https://www.tpfengenharia.com">www.tpfengenharia.com.br</a>
            <div style="display:flex;gap:1rem">
              <a href="https://www.linkedin.com/company/tpfengenharia">
                <img src='https://github.com/ally-tpfe/customize-assets/blob/main/linkedin.png?raw=true' alt='' width='13' height='13' />
                ‎
                ‎ 
                ‎ 
              </a>  
              <a  href="https://www.instagram.com/tpfengenharia">
                <img src='https://github.com/ally-tpfe/customize-assets/blob/main/instagram.png?raw=true' alt='' width='14' height='14' />
              </a>
            </div>
            <p class="slogan">Building the world, <b>better</b></p>
          </div>
            </td>
        <td>
          <img src='https://raw.githubusercontent.com/ally-tpfe/customize-assets/main/side-b.png' alt='' width='95' height='150' />
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