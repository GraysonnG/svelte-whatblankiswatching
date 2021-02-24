export class Tilt {
  private element: HTMLElement;
  private amount: number;
  private animationFrame: number;

  constructor(element: HTMLElement, amount: number) {
    this.element = element;
    this.amount = amount;
  }

  animate = (e: { x: number; y: number }) => {
    if (this.animationFrame !== null) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(() => this.update(e));
  };

  private update = (e: { x: number; y: number }) => {
    const rect = this.element.getBoundingClientRect();
    const cY = rect.top + (rect.bottom - rect.top) / 2;
    const cX = rect.left + (rect.right - rect.left) / 2;
    const norm = Math.max(rect.width, rect.height);
    const normX = ((e.x - cX) * 2) / norm;
    const normY = ((e.y - cY) * 2) / norm;
    let normal = {
      x: (normX * -this.amount).toFixed(3),
      y: (normY * this.amount).toFixed(3),
    };
    if (rect.width / document.body.clientWidth > 0.75) {
      normal.x = `0`;
      normal.y = `0`;
    }

    this.element.setAttribute(
      "style",
      `
      transform: perspective(1000px) 
        rotateX(${normal.y}deg) 
        rotateY(${normal.x}deg) 
        scale3d(1, 1, 1);
    `
    );
    this.animationFrame = null;
  };

  reset = () => {
    if (this.animationFrame !== null) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(() => {
      this.element.setAttribute(
        "style",
        `
        transform: perspective(1000px) 
          rotateX(0deg) 
          rotateY(0deg) 
          scale3d(1, 1, 1);
      `
      );
    });
  };
}
