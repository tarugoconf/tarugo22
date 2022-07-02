const API_KEY = Deno.env.get("API_KEY");
const EVENT_ID = Deno.env.get("EVENT_ID");

if (!API_KEY || !EVENT_ID) {
  throw new Error("API_KEY and EVENT_ID must be set");
}

const day = 24 * 60 * 60 * 1000;
const now = new Date();
const future = new Date(2022, 9, 20);

export const days_left = Math.round(Math.abs((now - future) / day));

const event = await get();

export const url = event.vanity_url;

export const tickets = {};

for (const ticket of event.ticket_classes) {
  const name = ticket.display_name.includes("Taller")
    ? "Taller Práctico"
    : ticket.name;

  if (!tickets[name]) {
    tickets[name] = {
      capacity: 0,
      sold: 0,
    };
  }

  tickets[name].capacity += ticket.quantity_total;
  tickets[name].sold += ticket.quantity_sold;
  tickets[name].remaining = tickets[name].capacity - tickets[name].sold;
  tickets[name].percent =
    Math.round(tickets[name].sold / tickets[name].capacity) * 100;
}

async function get() {
  const url =
    `https://www.eventbriteapi.com/v3/events/${EVENT_ID}/?expand=ticket_classes`;

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
