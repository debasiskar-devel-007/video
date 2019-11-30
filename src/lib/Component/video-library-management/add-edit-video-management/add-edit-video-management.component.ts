import { Component, OnInit, Inject, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'projects/video/src/lib/Service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
export interface DialogData {
  message: string;
}
@Component({
  selector: 'lib-add-edit-video-management',
  templateUrl: './add-edit-video-management.component.html',
  styleUrls: ['./add-edit-video-management.component.css']
})

export class AddEditVideoManagementComponent implements OnInit {
  public dialogRef: any;
  public videoManagementForm: any = FormGroup;
  public serverUrlData: any = '';
  public addEndpointData: any = '';
  public ListingRoute: any = '';
  public VideoDataArray: any = [];
  public params_id: any = '';
  public buttonText: any = "Submit";
  public headerText: any = "Add Video Management";
  public spinnerloader: boolean; // for spinner loader

  /**ckeditor start here*/
  public Editor = ClassicEditor;  //for ckeditor
  editorConfig = {
    placeholder: 'Type the content here!',
  };
  public model = {
    editorData: ''
  };
  /**ckeditor end here*/
  public video_prefix: any = "https://www.youtube.com/watch?v=";
  @Input()          //setting the server url from project
  set serverUrl(serverUrlval: any) {
    this.serverUrlData = (serverUrlval) || '<no name set>';
    this.serverUrlData = serverUrlval;
  }
  @Input()          //setting the addendpoint from application
  set addEndpoint(endpointUrlval: any) {
    this.addEndpointData = (endpointUrlval) || '<no name set>';
    this.addEndpointData = endpointUrlval;
  }
  @Input()          //setting the addendpoint from application
  set listPageUrl(val: any) {
    this.ListingRoute = (val) || '<no name set>';
    this.ListingRoute = val;
  }
  @Input()          //getting single video data from application
  set EditVideoData(Videodata: any) {
    this.VideoDataArray = Videodata;
    console.log("single data in ts ", this.VideoDataArray);
    if (this.activeRoute.snapshot.params._id) {
      this.buttonText = "Update";
      this.headerText = "Edit Video Management"
      this.params_id = this.activeRoute.snapshot.params._id;
      this.videoManagementForm.controls['title'].patchValue(Videodata[0].title);
      this.videoManagementForm.controls['description'].patchValue(Videodata[0].description);
      this.model.editorData = Videodata[0].description;
      this.videoManagementForm.controls['videoUrl'].patchValue(Videodata[0].videoUrl);
      this.videoManagementForm.controls['priority'].patchValue(Videodata[0].priority);
      this.videoManagementForm.controls['status'].patchValue(Videodata[0].status);
    }
  }
  constructor(public dialog: MatDialog, public fb: FormBuilder, public apiService: ApiService,
    public activeRoute: ActivatedRoute, public router: Router) {
    this.videoManagementForm = this.fb.group({

      title: ['', Validators.required],
      description: ['', Validators.required],
      videoUrl: ['', Validators.required],
      priority: ['', Validators.required],
      status: [true,]
    })
  }

  ngOnInit() {
    /**Observable start here**/
    this.apiService.clearServerUrl();
    setTimeout(() => {
      this.apiService.setServerUrl(this.serverUrlData);
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
  /*modal start here*/
  openDialog(x: any): void {
    this.dialogRef = this.dialog.open(Dialogtest, {
      width: '45%',
      height: '500px',

      data: { message: x }
    });

    this.dialogRef.afterClosed().subscribe(result => {

    });
  }
  /**preview url start here **/
  previewUrl() {

    this.openDialog(this.videoManagementForm.value.videoUrl);

  }
  /**preview url end here **/
  /**modal end here */
  VideoManagementFormSubmit() {
    this.videoManagementForm.patchValue({
      description: this.model.editorData
    });
    let x: any;
    for (x in this.videoManagementForm.controls) {
      this.videoManagementForm.controls[x].markAsTouched();
    }
    if (this.videoManagementForm.valid) {
      if (this.videoManagementForm.value.status)
        this.videoManagementForm.value.status = parseInt('1');
      else
        this.videoManagementForm.value.status = parseInt('0');

      var data: any;
      if (this.activeRoute.snapshot.params._id) {
        data = {
          "source": "video_management",
          "data": {
            "id": this.params_id,
            'title': this.videoManagementForm.value.title,
            'priority': this.videoManagementForm.value.priority,
            'videoUrl': this.videoManagementForm.value.videoUrl,
            'status': this.videoManagementForm.value.status,
            'description': this.videoManagementForm.value.description
          }
        }

      } else {


        data = {                                         //add part
          "source": "video_management",
          "data": this.videoManagementForm.value,
        };
      }
      this.spinnerloader = true;

      this.apiService.addData(data).subscribe((resp) => {
        this.spinnerloader = false;
        let result: any = resp;
        this.resetForm();
        setTimeout(() => {
          this.router.navigateByUrl('/' + this.ListingRoute)
        }, 100);

      })
    }
  }
  resetForm() {
    this.videoManagementForm.reset();
  }
}
@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})
export class Dialogtest {
  public is_error: any;

  constructor(public dialogRef: MatDialogRef<Dialogtest>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.is_error = data.message;
  }
}
