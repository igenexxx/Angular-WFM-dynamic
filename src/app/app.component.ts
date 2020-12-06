import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {ModalComponent} from './modal/modal.component';
import {RefDirective} from './ref.directive';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(RefDirective, {static: false}) refDir: RefDirective;
  constructor(
    private resolver: ComponentFactoryResolver,
    private title: Title,
    private meta: Meta,
  ) {
    title.setTitle('App Component Page!');
    meta.addTags([
      {
        name: 'keywords',
        content: 'angular, google, webcomponent'
      },
      {
        name: 'description',
        content: 'Page about app component'
      }]);
  }

  showModal() {
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
    this.refDir.container.clear();

    const component = this.refDir.container.createComponent(modalFactory);
    component.instance.title = 'Dynamic component';
    component.instance.close.subscribe(() => {
      this.refDir.container.clear();
    });
  }
}

