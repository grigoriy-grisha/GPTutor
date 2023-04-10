import { v4 as uuid } from "uuid";

export class LessonItem {
  constructor(name, paragraph, initialRequest, additionalRequests) {
    this.id = uuid();
    this.name = name;
    this.paragraph = paragraph;
    this.initialRequest = initialRequest;
    this.additionalRequests = additionalRequests;
  }
}
