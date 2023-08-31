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
    initialRequest.name = "Стартовый вопрос";
    this.additionalRequests = [initialRequest, ...additionalRequests];
  }
}
