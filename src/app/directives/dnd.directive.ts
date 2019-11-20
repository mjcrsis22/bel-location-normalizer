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

  //constructor, get and create private instance of element and renderer
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  //event emitter for listening file drop
  @Output() onFileDropped = new EventEmitter<any>();

  ngOnInit() {
    //add base class on init
    this.renderer.addClass(this.elementRef.nativeElement, 'draggable-space');
  }

  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();

    //add subclass when a file drag over panel
    this.renderer.addClass(this.elementRef.nativeElement, 'element-over-space');
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();

    //remove subclass when a dragged file leave panel
    this.renderer.removeClass(this.elementRef.nativeElement, 'element-over-space');
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(e) {
    e.preventDefault();
    e.stopPropagation();

    //remove subclass when a dragged file is dropped
    this.renderer.removeClass(this.elementRef.nativeElement, 'element-over-space');
    //get dropped file(s)
    let files = e.dataTransfer.files;
    if (files.length > 0) {
      //emmit event
      this.onFileDropped.emit(files);
    }
  }

}
