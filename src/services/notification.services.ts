import { ref, update } from "@firebase/database";
import moment from "moment";

import { db } from "../config/firebase-config";

export const addNotification = (handle: string, content: string) => {
  update(ref(db, `users/${handle}/notifications`), {
    [moment().unix()]: content,
  });
};

export const removeNotification = (
  handle: string,
  notificationTimestamp: string
) => {
  update(ref(db, `users/${handle}/notifications`), {
    [notificationTimestamp]: null,
  });
};
