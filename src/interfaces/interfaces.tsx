export interface talk {
  id?: number;
  title: string;
  speakerName: string;
  speakerId: number;
  language: string;
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
  mobil?: string;
  linkedIn?: string;
  bio: string;
  talks?: number[];
}

export interface Attendee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  company: string;
  telephone?: string;
  type: string;
}
