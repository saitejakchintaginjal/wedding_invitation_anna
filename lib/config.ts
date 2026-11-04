// Edit this file to personalise the invitation.
export const wedding = {
  groom: "SaiKiran",
  bride: "Asha",
  groomParents: [
    "Late. Sri Keshav N Chintaginjal",
    "Smt. Krishnaveni K Chintaginjal",
  ], // one entry per line
  brideParents: ["Sri. RamMohan Butta", "Smt. Laxmi Butta"], // one entry per line
  // ISO local time of the wedding muhurtam
  date: "2026-11-26T09:41:00",
  venue: "Shri Venkataramana Temple",
  address: "Shri Kshetra Manjuguni, Sirsi",
  mapsQuery: "Shri Venkataramana Temple, Manjuguni, Sirsi",
};

export const events = [
  {
    name: "Wedding",
    date: "26 November 2026",
    time: "9:41 AM",
    timeLabel: "Muhurtam · 9:41 AM",
    venue: "Shri Venkataramana Temple, Shri Kshetra Manjuguni, Sirsi",
    note: "",
    featured: true,
  },
  {
    name: "Reception",
    date: "28 November 2026",
    time: "12:00 PM",
    timeLabel: "12:00 PM onwards",
    venue: "SSK Function Hall, Chennapet, Hubli",
    note: "",
  },
];

// One map card per venue (the query is what Google Maps searches for)
export const venues = [
  {
    event: "Wedding",
    name: "Shri Venkataramana Temple",
    address: "Shri Kshetra Manjuguni, Sirsi",
    query: "Shri Venkataramana Temple, Manjuguni, Sirsi",
  },
  {
    event: "Reception",
    name: "SSK Function Hall",
    address: "Chennapet, Hubli",
    query: "SSK Function Hall, Chennapet, Hubli",
  },
];

export const photos = [
  {
    src: "/photos/moment-1.jpg",
    caption: "Forehead to forehead",
    pos: "50% 52%",
  },
  { src: "/photos/moment-2.jpg", caption: "Under the palms", pos: "50% 100%" },
]; // add more real photos (jpg/png/webp) in /public/photos
