import axios from "axios";

const eventsAPIInstance = axios.create({
  baseURL: "https://et-events-be.onrender.com/api",
});

export const getAllEvents = async ({ page, limit }) => {
  const result = await eventsAPIInstance.get(
    `/events?page=${page}&limit=${limit}`
  );
  return result.data;
};

export const getEventGuests = async ({ eventId, page, limit }) => {
  const result = await eventsAPIInstance.get(
    `/events/${eventId}/guests?page=${page}&limit=${limit}`
  );
  return result.data;
};

export const createEventGuest = async (id, data) => {
  const result = await eventsAPIInstance.post(`/${id}/guests`, data);
  return result.data;
};
