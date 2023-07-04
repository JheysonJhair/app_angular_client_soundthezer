import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
  export class VideoPlayerComponent implements OnInit {
    videoItems = [
      {
        name: "Canon in D (Pachelbel's Canon) - Cello & Piano",
        src: '../../assets/cannon.mp4',
        type: 'video/mp4'
      },
      {
        name: "Shingeki no Kyojin -『Guren no Yumiya』| OP 1 | ",
        src: '../../assets/Shingeki.mp4',
        type: 'video/mp4'
      },
      {
        name: "See Siang Wong - One Summer's Day",
        src: '../../assets/OneSummerDay.mp4',
        type: 'video/mp4'
      }
    ];
    activeIndex = 0;
    currentVideo = this.videoItems[this.activeIndex];
    data: any;
    constructor() { }
    ngOnInit(): void { }
    videoPlayerInit(data: any) {
      this.data = data;
      this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
      this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }
    nextVideo() {
      this.activeIndex++;
      if (this.activeIndex === this.videoItems.length) {
        this.activeIndex = 0;
      }
      this.currentVideo = this.videoItems[this.activeIndex];
    }
    initVdo() {
      this.data.play();
    }
    startPlaylistVdo(item: any, index: number) {
      this.activeIndex = index;
      this.currentVideo = item;
    }
  }