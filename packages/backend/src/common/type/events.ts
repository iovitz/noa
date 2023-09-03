import { EventName } from '../const/events';

export interface EventTypes {
  [EventName.ApplyFriend]: {
    userid: string;
    fromid: string;
    reason: string;
  };
}
