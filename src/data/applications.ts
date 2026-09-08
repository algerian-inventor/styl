export interface MembershipApplication {
  id: string;
  fullName: string;
  dob: string;
  wilaya: string;
  municipality: string;
  email: string;
  phone: string;
  educationProfession: string;
  scientificInterests: string[];
  skills: string;
  motivation: string;
  portfolio?: string;
  submissionDate: string;
  status: "pending" | "underReview" | "accepted" | "rejected";
}

export const initialApplications: MembershipApplication[] = [];
