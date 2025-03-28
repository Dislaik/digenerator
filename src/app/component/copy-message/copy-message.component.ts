import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-copy-message',
  templateUrl: './copy-message.component.html',
  styleUrl: './copy-message.component.css'
})
export class CopyMessageComponent {
  pageX: number;
  pageY: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngShowMessage(x: number, y: number): void {
    this.pageX = x;
    this.pageY = y;
    this.ngDestroy();
  }

  public ngDestroy(): void {
    setTimeout(() => {
      this.renderer.removeChild(document.body, this.el.nativeElement);
    }, 600);
  }
}
