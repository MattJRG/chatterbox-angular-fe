import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './app-file-upload.component.html',
  styleUrls: ['./app-file-upload.component.scss']
})

export class FileUploadComponent {

  @Input() progress;

  private file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }
}
