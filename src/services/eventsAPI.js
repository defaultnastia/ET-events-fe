import axios from "axios";

const eventsAPIInstance = axios.create({
  baseURL: "https://et-events-be-production.up.railway.app/api",
});

export const getAllEvents = async ({ page, limit, sort }) => {
  const result = await eventsAPIInstance.get(
    `/events?page=${page}&limit=${limit}&sort=${sort}`
  );
  return result.data;
};

export const getEventGuests = async ({ eventId, page, limit, query }) => {
  const result = await eventsAPIInstance.get(
    `/events/${eventId}/guests?page=${page}&limit=${limit}&query=${query}`
  );
  return result.data;
};

export const createEventGuest = async (id, data) => {
  const result = await eventsAPIInstance.post(`/events/${id}/guests`, data);
  return result.data;
};
