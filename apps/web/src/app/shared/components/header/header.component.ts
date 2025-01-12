import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, HostListener } from '@angular/core';

import { DropdownComponent } from '@/app/shared/components/dropdown/dropdown.component';
import { HeaderSmallSearchBoxComponent } from '@/app/shared/components/search-boxs/header-small-search-box/header-small-search-box.component';
import { HeaderLargeSearchBoxComponent } from '@/app/shared/components/search-boxs/header-large-search-box/header-large-search-box.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    RouterLink,
    CommonModule,
    DropdownComponent,
    HeaderSmallSearchBoxComponent,
    HeaderLargeSearchBoxComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  expand!: boolean;
  isModalVisible = false;
  private isUserAction = false;

  currentPath: string = '';

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isUserAction) return;

    const scrollY = document.documentElement.scrollTop;

    console.log(scrollY);

    if (scrollY < 100) {
      this.expand = true;
    }

    if (scrollY > 300) {
      this.expand = false;
    }
  }

  openModal() {
    this.isModalVisible = true;
  }

  setExpand(value: boolean) {
    this.isUserAction = true;
    this.expand = value;

    setTimeout(() => {
      this.isUserAction = false;
    }, 1000);
  }

  ngOnInit() {
    this.expand = true;
    this.currentPath = this.router.url;
  }
}
