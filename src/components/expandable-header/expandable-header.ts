import { Component } from '@angular/core';
import { Input, ElementRef, Renderer } from '@angular/core';
// orientacion
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'expandable-header',
  templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {
  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
 
  newHeaderHeight: any;

  text: string;

  constructor(public element: ElementRef, public renderer: Renderer,private screenOrientation: ScreenOrientation) {
    console.log('Hello ExpandableHeaderComponent Component');
    this.text = 'Hello World';
  }
  ngOnInit(){
    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
 
    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });
    this.screenOrientation.onChange().subscribe(
      () => {
        if (this.screenOrientation.type=='landscape-primary') {
          console.log('~(-.-)~');
          this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
 
          this.scrollArea.ionScroll.subscribe((ev) => {
            this.resizeHeader(ev);
          });
        }else{
          this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
          this.scrollArea.ionScroll.subscribe((ev) => {
            this.resizeHeader(ev);
          });
        }
          // console.log("Orientation Changed "+ this.screenOrientation.type);
      }
   );
 
  }
 
  resizeHeader(ev){
 
    ev.domWrite(() => {
 
      this.newHeaderHeight = this.headerHeight - ev.scrollTop;
 
      if(this.newHeaderHeight < 0){
        this.newHeaderHeight = 0;
      }  
 
      this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
      // console.log("top Antes"+ev.scrollTop);
      // var pr =this.element.nativeElement.children;
      // this.renderer.setElementStyle(pr,'opacity','0');
      for(let headerElement of this.element.nativeElement.children){
        let totalHeight = headerElement.offsetTop + headerElement.clientHeight;
        if(totalHeight > this.newHeaderHeight && !headerElement.isHidden){ //lo que se oculta al bajar
          headerElement.isHidden = true;
          this.renderer.setElementStyle(headerElement, 'opacity', '1'); //para mostrar lo qe se oculto
        } else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
          headerElement.isHidden = false;
          console.log("subir");
          this.renderer.setElementStyle(headerElement, 'opacity', '1');
        }
 
      }
 
    });
 
  }

}
