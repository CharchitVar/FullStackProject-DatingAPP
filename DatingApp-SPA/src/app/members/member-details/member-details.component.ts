import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_service/user.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { AuthServiceService } from 'src/app/_service/AuthService.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute, private authService: AuthServiceService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user = data['user'];
    });
    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    })

    this.galleryOptions = [
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false

      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages(){
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small:photo.url,
        medium:photo.url,
        large: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  loadUser(){
    this.userService.getUserById(+this.route.snapshot.params['id']).subscribe((user: User)=>{
      this.user = user;
    }, error =>{
      this.alertify.error(error)
    } )
  }

  sendLike(id: number){
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(()=>{
      this.alertify.success('You have liked '+ this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    })

  }

  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

}
