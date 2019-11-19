import {
  Directive,
  OnInit,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appDnD]'
})
export class DndDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @Output() onFileDropped = new EventEmitter<any>();

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'draggable-space');
  }

  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.renderer.addClass(this.elementRef.nativeElement, 'element-over-space');
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.renderer.removeClass(this.elementRef.nativeElement, 'element-over-space');
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.renderer.removeClass(this.elementRef.nativeElement, 'element-over-space');
    let files = e.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }

}
