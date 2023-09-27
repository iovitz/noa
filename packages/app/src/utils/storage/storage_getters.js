import { storage } from "./storage";

export function getSession() {
	return storage.get("session");
}
