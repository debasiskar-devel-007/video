import { Component, OnInit , Input} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
@Component({
  selector: 'lib-youtube-viewer',
  templateUrl: './youtube-viewer.component.html',
  styleUrls: ['./youtube-viewer.component.css']
})
export class YoutubeViewerComponent implements OnInit {
  id:any;

  @Input()          
  set videoid(id: any) {
    this.id = (id) || '<no name set>';
    this.id = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+id);
  }
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
