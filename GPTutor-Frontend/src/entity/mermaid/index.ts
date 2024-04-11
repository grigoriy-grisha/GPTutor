class Mermaid {
  currentMermaidCode = "";

  setMermaidCode(mermaidCode: string) {
    this.currentMermaidCode = mermaidCode;
  }

  getMermaidCode() {
    return this.currentMermaidCode;
  }
}

export const mermaid = new Mermaid();
