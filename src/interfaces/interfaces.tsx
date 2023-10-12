// export interface talksList {
//   tal: talk[];
// }

export interface talk {
  id?: number;
  title: string;
  speaker: string;
  langauge: string;
  meetingLink: string;
  startTime: string;
  endTime: string;
  description: string;
  targetAudience: string;
  room: string;
}

export interface speaker {
  id?: number;
  speaker: string;
  email: string;
  bio: string;
  talks?: number[];
}

export interface Attendee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  // talks: number[];
  company: string;
  telephone?: string;
  type: string;
}
