import { EventName } from '../const/events';

export interface EventTypes {
  [EventName.ApplyFriend]: {
    userid: string;
    from: string;
    reason: string;
  };
}
