// db.ts
import Dexie, { type EntityTable } from "dexie";

interface Attendance {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  createdAt: string;
}

const db = new Dexie("FriendsDatabase") as Dexie & {
  attendees: EntityTable<
    Attendance,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  attendees:
    "++id, firstname, lastName, email, phone, address, eventId, createdAt",
});

export type { Attendance };
export { db };
