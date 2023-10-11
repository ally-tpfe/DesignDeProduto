// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
function get_template_A_str(user_info) {
  let str = "";

  str += `
    <style>
      table {
        width: 400px;
        height: 100px;
        border-collapse: collapse;
      }
      
      th, td {
        max-width: 550px;
        background: white;
      }

      img {
        width: 100px;
        height: 100px;
      }

      .user-info {
        display: flex;
        min-height: 400px;
        min-width: 400px;
        flex-direction: column;
        gap:2px;
      }

      .user-info div {
        width: 300px;
      }

      .user-info h2 {
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 1px;
        color: #0067ff;
        padding: 0;
        margin:0;
      }

      .user-info p {
        font-family: 'Poppins', sans-serif;
        font-size: 10px;
        color: #003B75;
        margin: 1px 0; /* Add margin for spacing between paragraphs */
        padding: 0;
        white-space: nowrap;
        letter-spacing: 0.5px;
      }

      .user-info a {
        color: #003B75;
        text-decoration: none;
        font-family: 'Poppins', sans-serif;
        font-size: 10px;
      }

      .user-info span {
        color: #0067ff;
        font-family: 'BRSonoma-Black-Regular', Helvetica;
        font-size: 14px;
        letter-spacing: 1.05px;
      }
      .user-photo{
        background-color: white
      }


      
    </style>
    <table>
      <tr>
        <td>
          <img src='https://raw.githubusercontent.com/ally-tpfe/customize-assets/main/side-a.png' alt='' width='154' height='150' />
        </td>
        <td>${user_info.user_photo ? `<img style="border-radius: 10px;" src="${user_info.user_photo}" alt="" width="120" height="120" />` : ""}</td>
        <td></td>
        <td></td>
    <td></td>
    <td></td>
        <td class="user-info">
          <h2 style="font-family: 'BRSonoma-Black', Helvetica;margin-top:5px;">${to_uppercase(user_info.name)}</h2>
          <div>  
          <p>${user_info.email}</p>
            <p>${user_info.work_phone !== "null" ? user_info.work_phone + " - ramal " + user_info.work_phone_extension  : ""}</p>
            <p style="font-size: 10px; color: #003B75; white-space: nowrap;">${user_info.personal_phone !== "null" ? user_info.personal_phone : ""}</p>
            <a style="font-size: 12px" href="https://www.tpfengenharia.com">www.tpfengenharia.com</a>⠀
              <a href="https://www.linkedin.com/company/tpfengenharia">
                <img src='https://github.com/ally-tpfe/customize-assets/blob/main/linkedin.png?raw=true' alt='' width='13' height='13' />
              </a>⠀
              <a  href="https://www.instagram.com/tpfengenharia">
                <img src='https://github.com/ally-tpfe/customize-assets/blob/main/instagram.png?raw=true' alt='' width='14' height='14' />
              </a>
            <p style="font-size: 12px; color: #0067ff; font-family: 'Poppins', sans-serif; white-space: nowrap;margin-top:14px;">Building the world, better</p>
          </div>
            </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
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