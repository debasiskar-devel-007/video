import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {
  public tableName: any = '';
  public Tokenval: any = '';
  public searchEndpoint: any = '';
  public deleteEndpointUrl: any = '';
  public addvideoUrl: any = '';
  public addupdate: any = '';
  public serverUrlData: any = '';
  public editUrl:any='';
  @Input()         //all video data via resolve call from app
  set videoData(val: any) {
    this.VideoDataListing = (val) || '<no name set>';
    this.VideoDataListing = val;
  }
  @Input()      //getting server url  from application 
  set ServerUrl(val: any) {
    this.serverUrlData = (val) || '<no name set>';
    this.serverUrlData = val;
    
  }
  @Input()      //getting source name from application 
  set SourceName(val: any) {
    this.tableName = (val) || '<no name set>';
    this.tableName = val;
    console.log("souresh source name",this.tableName);
  }
  @Input()     //getting token via App    
  set Token(val: any) {
    this.Tokenval = (val) || '<no name set>';
    this.Tokenval = val;
    
  }
  @Input()     //getting search endpoint via App    
  set SearchingEndpoint(val: any) {
    this.searchEndpoint = (val) || '<no name set>';
    this.searchEndpoint = val;
   console.log("souresh searching endpoint ",this.searchEndpoint);
  }
  @Input()     //getting delete endpoint via App    
  set DeleteEndpoint(val: any) {
    this.deleteEndpointUrl = (val) || '<no name set>';
    this.deleteEndpointUrl = val;
    
  }
  @Input()     //getting add video page route via App    
  set AddVideoPageRoute(val: any) {
    this.addvideoUrl = (val) || '<no name set>';
    this.addvideoUrl = val;
   
  }
  @Input()
  set AddUpdateEndpoint(val: any) {   //add or update endpoint
    this.addupdate = (val) || '<no name set>';
    this.addupdate = val;
    
  }
   @Input()    //getting edit page route
   set EditRoute(val:any){
      this.editUrl =(val) || '<no name set>'
      this.editUrl =val;
      
   }
  /** lib-listing start here**/
  public VideoDataListing: any = [];
  public VideoDataListing_skip: any = ["_id", "description", "created_at","updated_at","id"];
  public VideoDataListing_modify_header: any = {
    "title": "Title", "priority": "Priority",
    "status": "Status", "videoUrl": "Video Url"
  };
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Title", field: 'title' }],

    };

  /** lib-listing end here**/

  constructor(public activeRoute: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
  }
  addVideoPage() {
    this.router.navigateByUrl('/' + this.addvideoUrl);
  }

}
