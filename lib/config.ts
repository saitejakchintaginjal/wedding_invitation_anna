// Edit this file to personalise the invitation.
export const wedding = {
  groom: "Zayn",
  bride: "Nora",
  groomParents: "Mr. & Mrs. Ahmed",
  brideParents: "Mr. & Mrs. Hassan",
  // ISO local time of the ceremony
  date: "2026-11-30T16:00:00",
  dateLabel: "November 30, 2026",
  venue: "Grand Palace Hall",
  address: "123 Rosewood Avenue, Garden District, New York, NY 10001",
  mapsQuery: "Grand Palace Hall, 123 Rosewood Avenue, New York, NY 10001",
};

export const photos = [
  "/photos/1.svg",
  "/photos/2.svg",
  "/photos/3.svg",
  "/photos/4.svg",
]; // replace with your engagement photos (jpg/png/webp)

export const timeline = [
  { time: "3:30 PM", title: "Guest Arrival", text: "Welcome drinks in the courtyard.", icon: "arrival" },
  { time: "4:00 PM", title: "Wedding Ceremony", text: "Exchange of vows beneath the fountain.", icon: "rings" },
  { time: "6:30 PM", title: "Reception", text: "Dinner, toasts and dancing under the stars.", icon: "glass" },
] as const;

export const preEvents = [
  { name: "Mahendi", date: "November 27, 2026", time: "5:00 PM", place: "The Rose Terrace, Garden District" },
  { name: "Haldi", date: "November 28, 2026", time: "10:00 AM", place: "Bride's Family Residence" },
];
