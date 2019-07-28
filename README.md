# Angular Essentials - Revision
## 1. Angular architecture:
1.1 Component, bootstrap and the DOM: First app.module or component is bootstrapped and from there all the child elements are called on.
1.2 Directives and Pipes: Component is actually a directive with a template. Directives provides functionalities and can transform the DOM. Types: a. Structural: modify the DOM of the target, b. Attribute: Changes behavior of the parent of target.
Pipes: Helps modify content
1.3 Data Binding: Interpolation, Directives, Local variables that can be used in a template for child elements
1.4 Dependency Injection: Create decoupled modules/services and then use them when/where required.
1.5 Services: It holds the business logic. Or interaction with third party apis for fetching/posting data. While the components just calls the services and use them.
1.6 Data persistence: Local storage/Http(XHR, JSONP), 
1.7 Routing: Router urls, url with parameters, life cycle hooks, directives to put in templates to show routing target content

## 2. Components
### 2.1 NgModule decorator and Root module(app.module)
Decorator: Expression that evaluates to a function allowing annotation of classes at design time.
@Decoratorname()
EX: @Component()

Root module: app.module.ts
NgModule is the root Decorator used in app.module.ts file to bootstrap our application.
@NgModule can accept some meta data properties such as imports (for Modules), declarations(for Components, directives and pipes) and bootstrap(for entry point modules) array.

### 2.2 Component Metadata
@Component decorator just like @NgModule is a core decorator from angular.
Accepts meta data like: selector, templateUrl, styleUrls arrays

### 2.3 Bootstrapping module for Browser
main.ts uses platformBrowserDynamic to bootstrap app module
platformBrowserDynamic().bootstrapModule(AppModule)
And then in app module we have a bootstrap meta data that tells angular which component to load i.e. app.component.
And then Angular will search for app component selector and render it where it is found for the first time. In our case it is in index.html file where app-root selector is used.
Note that it will not render multiple instances.

### 2.4 Component Selector
During bootstrapping angular searches for the bootstrapped component ie.e app.component and renders it's first instance.
Selectors can be given custom name

### 2.5 Component template
template: (Inline markup)
tempateUrl: (Markup from URL) './app.component.html' or 'app/app.component.html'. Note: for relative paths: src is the root start point.

### 2.6 Component Style
styles: [`h1 {color: red}`]
styleUrls:
Note: Angular adds dynamic tag to component and style. This is called scoping at component level.

### 2.7 Using other components in a component
We can use child components inside a component with using the selectors.
Ex: media-item is a child component to app.component

### 2.8 Interpolation and the expression context
Template syntaxes: Interpolation, binding, expressions, conditional templating, template variables, template expression operators

Interpolation: {{expression}} Does not support: assignments, newing up variables, chaining expressions, increment/decrement

All variables or functions declared in component are available in expression context in html file and thus no need of using this. operator.
{{ name }}
{{ watchedOn() | date:'yyyy-MM-dd' }}

### 2.9 Property Binding
[htmlattr]="expression"
<h2 [textContent]="name"></h2>
<h2 textContent="{{name}}"></h2>
Both are same. square bracket arround attr tells angular to evaluate the expression. If removed, then we must use interpolation to evaluate the expression.

### 2.10 Event binding
(event)="fn()"
(click)="delete()"

### 2.11 Getting data to the component with Input
Child:
import Input from core
@Input() mediaItem;
Parent:
firstMediaItem is defined in parent
<app-media-item [mediaItem]="firstMediaItem"></app-media-item>

### 2.12 Subscribing to component events with Output
Child:
import { Output, EventEmitter} from '@angular/core';
@Output() deleteMedia = new EventEmitter();
delete(){
    this.deleteMedia.emit(this.mediaItem);
}
Parent:
<app-media-item (deleteMedia)="deleteMediaItem($event)"></app-media-item>
deleteMediaItem(mediaItem){
    console.log('Deleted');
}

## 3. Directives and Pipes
### 3.1 Structural Directives: ngIf
Structural directives modify the DOM structure based on logic. "*" represents structural directives
*ngIf: conditionally render a DOM element
* is a syntactic sugar or short hand pattern for using <ng-template>.
It is an alternate or shotcut.
<div *ngIf="mediaItem.watchedOn">Watched on {{mediaItem.watchedOn}}</div>
Or
<ng-template [ngIf]="mediaItem.category">
    DOM Content
</ng-template>
ng-template is useful when having multiple Divs to show/hide conditionally.

