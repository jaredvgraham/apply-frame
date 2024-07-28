interface IContactPerson {
  name: string;
  email?: string;
  phone?: string;
}

export interface Job {
  _id: string;
  userId: string;
  companyName: string;
  jobDescription?: string;
  jobTitle: string;
  applied: boolean;
  interview: boolean;
  interviewDate?: Date;
  contactPerson?: IContactPerson;
  salary?: number;
  dateApplied?: Date;
  interest: number;
  offer: boolean;
  offerAmount?: number;

  jobLocation?: string;
  notes?: string[];
}
