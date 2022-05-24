import { user } from "pg/lib/defaults";

const URL = "http://localhost:3000/api/";

export const getHardware = async () => {
  try {
    const response = await fetch(`${URL}/hardwares`);
    const result = await response.json();
    if (result.error) throw result.error;
    return result;
  } catch (error) {
    console.log("uh oh, trouble finding hardwares");
  }
};

export const getHardwareByUser = async (username, token) => {
  try {
    const response = await fetch(`${URL}/users/${username}/hardwares/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(`uh oh, trouble getting the hardwares for ${username} `);
  }
};

export const createHardware = async (
  model,
  hardware,
  description,
  quantity,
  cost,
  token
) => {
  try {
    const response = await fetch(`${URL}/hardwares/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        usersId: user.id,
        hardwareId: hardware.id,
        model: model,
        description: description,
        cost: parseInt(quantity) * parseInt(hardware.cost),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("uh oh, trouble creating new Hardware!", error);
  }
};

export const updateHardware = async (hardware, hardwareId, token) => {
  try {
    const response = await fetch(`${URL}/hardwares/${hardwareId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hardware),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("uh oh, trouble updating hardwares", error);
  }
};

export const deleteHardware = async (token, hardwareId) => {
  try {
    const response = await fetch(`${URL}/hardwares/${hardwareId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("uh oh, trouble deleting hardware!", error);
  }
};

export const getHardwares = async () => {
  try {
    const response = await fetch(`${URL}hardware`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
