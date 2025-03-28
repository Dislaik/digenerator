import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, ComponentRef, ViewContainerRef, inject } from '@angular/core';
import { CopyMessageComponent } from '../../component/copy-message/copy-message.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('width') width: ElementRef<HTMLInputElement>;
  @ViewChild('height') height: ElementRef<HTMLInputElement>;
  @ViewChild('format') format: ElementRef<HTMLSelectElement>;

  private componentRef!: ComponentRef<CopyMessageComponent>;
  private viewContainerRef = inject(ViewContainerRef);
  copyMessageInstance: any;

  isAvaliable: boolean;
  showTooltip = false;

  public ngOnInit(): void {
    this.isAvaliable = true;
  }

  public ngAfterViewInit() {
    this.height.nativeElement.value = "250";
    this.width.nativeElement.value = "250";

    document.fonts.ready.then(() => {
      this.ngGenerateDummy(Number(this.width.nativeElement.value), Number(this.height.nativeElement.value));
    });
  }

  public ngDownloadDummy() {
    const format = this.format.nativeElement.value;
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    const link = document.createElement('a');

    if (format === "png") {
      link.href = canvas.toDataURL('image/png');
      link.download = width + 'x'+ height +'.png';
    } else {
      link.href = canvas.toDataURL('image/jpg');
      link.download = width + 'x'+ height +'.jpg';
    }

    link.click();
  }

  public ngOnInput(): void {
    const inputWidth = this.width.nativeElement;
    const inputHeight = this.height.nativeElement;

    inputWidth.value = inputWidth.value.replace(/^0+|[^0-9\d]/g, '');
    inputHeight.value = inputHeight.value.replace(/^0+|[^0-9\d]/g, '');

    const width = Number(this.width.nativeElement.value);
    const height = Number(this.height.nativeElement.value);

    if (width < 1 || width > 9999 || height < 1 || height > 9999) {
      this.isAvaliable = false;
      
      return;
    }

    this.isAvaliable = true;
    this.ngGenerateDummy(width, height);
  }

  public ngOnClickCopyDummy(event: MouseEvent): void {
    const image = event.target as HTMLImageElement;
    const x = event.pageX;
    const y = event.pageY - 35;
    this.componentRef = this.viewContainerRef.createComponent(CopyMessageComponent);

    document.body.appendChild(this.componentRef.location.nativeElement);
    this.componentRef.instance.ngShowMessage(x, y);
    this.copyToClipboard(image.currentSrc);
  }

  private copyToClipboard(imageURL: string): void {
    navigator.clipboard.writeText(imageURL);
  }

  private ngGenerateDummy(width: number, height: number) {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    let size: number;

    if (ctx) {
      canvas.width = width;
      canvas.height = height;
      size = Math.min(width, height) / 4;

      if (size >= 20) {
        size = 20;
      }
      
      ctx.fillStyle = '#C8C8C8';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#F1F1F1';
      ctx.font = `${size}px RobotoCondensed`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${width}x${height}`, width / 2, height / 2);
    }
  }
}