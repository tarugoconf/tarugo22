const API_KEY = Deno.env.get("API_KEY");
const EVENT_ID = Deno.env.get("EVENT_ID");

const invitationTypes = ["INVITACION", "VIP"];

const day = 24 * 60 * 60 * 1000;
const now = new Date();
const future = new Date(2022, 9, 20);

export const days_left = Math.round(Math.abs((now - future) / day));

export const metrics = API_KEY ? await getData() : {
  tickets: 333,
  invitations: 10,
  by_type: {
    "Early Tarug@": 600
  },
};

async function getData() {
  const data = {
    by_type: {},
    tickets: 0,
    invitations: 0,
  };
  
  await loadData(data, 1);

  return data;
}

async function loadData(data, page) {
  const result = await get(`/events/${EVENT_ID}/attendees/`, page);

  result.attendees.forEach((user) => {
    const type = user.ticket_class_name;

    if (user.cancelled) {
      return;
    }

    if (invitationTypes.includes(type)) {
      ++data.invitations
      return;
    }

    ++data.tickets;

    if (type in data.by_type) {
      ++data.by_type[type];
    } else {
      data.by_type[type] = 1;
    }
  })

  if (result.pagination.has_more_items) {
    await loadData(data, page + 1);
  }
}

async function get(path, page) {
  const url = `https://www.eventbriteapi.com/v3${path}?page=${page}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
    },
  });

  const result = await response.json();

  if (result.error) {
    console.error(result);
    Deno.exit(1);
  }

  return result;
}
