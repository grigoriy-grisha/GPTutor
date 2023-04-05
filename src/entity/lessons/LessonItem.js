import { Subject } from "../../utils";

export class LessonItem {
  constructor(name, initialRequest, additionalRequests) {
    this.name = name;
    this.initialRequest = initialRequest;
    this.additionalRequests = additionalRequests;
    this.currentRequest$ = new Subject(null);
  }

  setCurrentRequest(index) {
    this.currentRequest$.next(this.additionalRequests[index]);
  }
}
