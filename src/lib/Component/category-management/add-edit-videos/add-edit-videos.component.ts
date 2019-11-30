import { Component, OnInit, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApiService } from 'projects/video/src/lib/Service/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'lib-add-edit-videos',
  templateUrl: './add-edit-videos.component.html',
  styleUrls: ['./add-edit-videos.component.css']
})
export class AddEditVideosComponent implements OnInit {
  public buttonText: any = "Submit";
  public headerText: any = "Add Video";
  /**ckeditor start here*/
  public Editor = ClassicEditor;  //for ckeditor
  editorConfig = {
    placeholder: 'Type the content here!',
  };
  public model = {
    editorData: ''
  };
  /**ckeditor end here*/
  videolibAddEditForm: FormGroup;
  public serverUrlData: any;
  public getDataEndpointData: any;
  public addEndpointData: any;
  public videoStatusArr: any = [];
  public listUrl: any;
  public parameter_id: any;
  public VideolistingArray: any = [];
  public editedListData: any = [];
  public spinnerloader: boolean; // for spinner loader


  @Input()          //setting the server url from project
  set serverUrl(serverUrlval: any) {
    this.serverUrlData = (serverUrlval) || '<no name set>';
    this.serverUrlData = serverUrlval;

  }

  @Input()          //setting the getdat endpoint from project
  set getDataEndpoint(endpointUrlval: any) {
    this.getDataEndpointData = (endpointUrlval) || '<no name set>';
    this.getDataEndpointData = endpointUrlval;

  }
  @Input()          //setting the addendpoint from application
  set addEndpoint(endpointUrlval: any) {
    this.addEndpointData = (endpointUrlval) || '<no name set>';
    this.addEndpointData = endpointUrlval;
  }
  @Input()          //getting the listing url
  set listingUrl(Urlval: any) {
    this.listUrl = (Urlval) || '<no name set>';
    this.listUrl = Urlval;

  }
  @Input()          //getting the listing url
  set dataListViaResolve(val: any) {
    this.VideolistingArray = (val) || '<no name set>';
    this.VideolistingArray = val;
  }
  @Input()          //getting the listing url
  set EditList(val: any) {
    this.editedListData = (val) || '<no name set>';
    this.editedListData = val;

    if (this.activeroute.snapshot.params._id) {
      this.headerText = "Edit Video"
      this.buttonText = "Update";
      this.parameter_id = this.activeroute.snapshot.params._id;
      this.videolibAddEditForm.controls['title'].patchValue(val[0].title);
      this.videolibAddEditForm.controls['priority'].patchValue(val[0].priority);
      this.videolibAddEditForm.controls['status'].patchValue(val[0].status);
      this.videolibAddEditForm.controls['description'].patchValue(val[0].description);
      this.model.editorData = val[0].description;
      this.videolibAddEditForm.controls['parent_id'].patchValue(val[0].parent_id);

    }
  }
  constructor(public fb: FormBuilder, public activeroute: ActivatedRoute,
    public _http: HttpClient, public router: Router, public apiService: ApiService) {
    /**formgroup start here**/
    this.videolibAddEditForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: [true,],
      parent_id: ['']
    })
    /**formgroup end here**/
  }

  ngOnInit() {
    /**Observable start here**/
    this.apiService.clearServerUrl();
    setTimeout(() => {
      this.apiService.setServerUrl(this.serverUrlData);
    }, 50);
    this.apiService.cleargetdataEndpoint();
    setTimeout(() => {
      this.apiService.setgetdataEndpoint(this.getDataEndpointData);
    }, 50);
    this.apiService.clearaddEndpoint();
    setTimeout(() => {
      this.apiService.setaddEndpoint(this.addEndpointData);
    }, 50);
    /**Observable end here**/
  }
  /**for validation purpose**/
  inputUntouch(form: any, val: any) {

    form.controls[val].markAsUntouched();
  }
  /**for validation purpose**/
  /**form submission start here**/
  videoAddEditFormSubmit() {

    this.videolibAddEditForm.patchValue({
      description: this.model.editorData
    });
    let x: any;
    for (x in this.videolibAddEditForm.controls) {
      this.videolibAddEditForm.controls[x].markAsTouched();
    }
    if (this.videolibAddEditForm.valid) {
      if (this.videolibAddEditForm.value.status)
        this.videolibAddEditForm.value.status = parseInt("1");
      else
        this.videolibAddEditForm.value.status = parseInt("0");
      var data: any;
      if (this.activeroute.snapshot.params._id) {
        data = {
          "source": "video_category",
          'data': {
            "id": this.parameter_id,
            "title": this.videolibAddEditForm.value.title,
            "description": this.videolibAddEditForm.value.description,
            "priority": this.videolibAddEditForm.value.priority,
            "status": this.videolibAddEditForm.value.status,
            "parent_id": this.videolibAddEditForm.value.parent_id
          },
          "sourceobj": ["parent_id"]
        }
      } else {
        data = {
          "source": "video_category",
          'data': {
            "title": this.videolibAddEditForm.value.title,
            "description": this.videolibAddEditForm.value.description,
            "priority": this.videolibAddEditForm.value.priority,
            "status": this.videolibAddEditForm.value.status,
            "parent_id": this.videolibAddEditForm.value.parent_id
          },
          "sourceobj": ["parent_id"]
        }
      }
      this.spinnerloader = true;
      this.apiService.addData(data).subscribe(resp => {
        let result: any;
        result = resp;
        this.videoStatusArr = result.status;
        this.spinnerloader = false;
        this.resetVideoCategoryForm();
        setTimeout(() => {
          this.router.navigateByUrl('/' + this.listUrl);
        }, 100)

      })
    }



  }
  /**form submission end here**/

  resetVideoCategoryForm() {
    this.videolibAddEditForm.reset();

  }

}
