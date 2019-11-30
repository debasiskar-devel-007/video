import { NgModule } from '@angular/core';
import { VideoComponent } from './video.component';
import { AddEditVideosComponent } from './Component/category-management/add-edit-videos/add-edit-videos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './Module/material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ApiService } from '../lib/Service/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { ListVideosComponent } from './Component/video-library-management/list-videos/list-videos.component';
import { AddEditVideoManagementComponent,Dialogtest } from './Component/video-library-management/add-edit-video-management/add-edit-video-management.component';
import { YoutubeViewerComponent } from './Component/video-library-management/youtube-viewer/youtube-viewer.component'
import { ListingModule } from 'listing-angular7';
@NgModule({
  declarations: [VideoComponent,Dialogtest, AddEditVideosComponent, ListVideosComponent,AddEditVideoManagementComponent, YoutubeViewerComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CKEditorModule,
    BrowserModule,
    ListingModule
   

  ],
  providers: [ApiService],
  exports: [VideoComponent,AddEditVideosComponent,ListVideosComponent,AddEditVideoManagementComponent],
  entryComponents: [Dialogtest],
})
export class VideoModule { }
