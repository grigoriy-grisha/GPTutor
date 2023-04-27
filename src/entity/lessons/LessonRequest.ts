export class LessonRequest {
  text: string;
  name: string;
  isSelected: boolean;

  constructor(text: string, name: string = "Стартовый вопрос") {
    this.text = text;
    this.name = name || text;
    this.isSelected = false;
  }

  select() {
    this.isSelected = true;
  }
}
