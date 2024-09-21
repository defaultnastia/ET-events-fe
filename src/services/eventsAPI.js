import axios from "axios";

const eventsAPIInstance = axios.create({
  baseURL: "https://et-events-be.onrender.com/api/events",
});

export const getAllEvents = async () => {
  const result = await eventsAPIInstance.get("");
  return result.data;
};

export const getEventGuest = async (id) => {
  const result = await eventsAPIInstance.get(`/${id}/guests`);
  return result.data;
};

export const createEventGuest = async (id, data) => {
  const result = await eventsAPIInstance.post(`/${id}/guests`, data);
  return result.data;
};
