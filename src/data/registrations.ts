export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: {
    ar: string;
    en: string;
  };
  fullName: string;
  email: string;
  phone: string;
  wilaya: string;
  age: number;
  educationProfession: string;
  motivation: string;
  registrationDate: string;
  status: "pending" | "confirmed" | "rejected" | "attended";
}

export const initialRegistrations: EventRegistration[] = [];
