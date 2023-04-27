import { v4 as uuid } from "uuid";

import { LessonRequest } from "./LessonRequest";
import { UUID_V4 } from "../common";

export class LessonItem {
  id: UUID_V4;

  constructor(
    public name: string,
    public paragraph: string,
    public initialRequest: LessonRequest,
    public additionalRequests: LessonRequest[]
  ) {
    this.id = uuid();
    this.additionalRequests = [initialRequest, ...additionalRequests];
  }
}
