// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

function is_valid_data(str)
{
  return str !== null
	  && str !== undefined
	  && str !== "";
}

function get_cal_offset()
{
  return "<br/><br/>";
}

// convert a string to uppercase
function to_uppercase(str)
{
  return str.toUpperCase();
}