import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  @Output() avatarSelected: EventEmitter<string> = new EventEmitter();
  @Input() currentAvatar: string = '';
  avatars: { img: string; selected: boolean }[] = [
    {
      img: 'av-1.png',
      selected: true,
    },
    {
      img: 'av-2.png',
      selected: false,
    },
    {
      img: 'av-3.png',
      selected: false,
    },
    {
      img: 'av-4.png',
      selected: false,
    },
    {
      img: 'av-5.png',
      selected: false,
    },
    {
      img: 'av-6.png',
      selected: false,
    },
    {
      img: 'av-7.png',
      selected: false,
    },
    {
      img: 'av-8.png',
      selected: false,
    },
  ];

  constructor() {}

  ngOnInit() {
    if (this.currentAvatar) {
      this.avatars.forEach((av) => {
        av.selected = false;
        if (av.img == this.currentAvatar) {
          av.selected = true;
        }
      });
    }
  }

  selectedAvatar(avatar: any) {
    this.avatars.forEach((av) => {
      av.selected = false;
      if (av.img == avatar.img) {
        av.selected = true;
        this.avatarSelected.emit(av.img);
      }
    });
  }
}
