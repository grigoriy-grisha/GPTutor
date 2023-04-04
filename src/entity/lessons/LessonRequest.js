export class LessonRequest {
  constructor(text, name) {
    this.text = text;
    this.name = name || text;
    this.isSelected = false;
  }

  select() {
    this.isSelected = true;
  }
}
