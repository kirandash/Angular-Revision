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

### 3.2 Structural Directives: ngFor
*ngFor accepts micro syntax. (Means: a micro syntax should have specific syntax. Doesn't accept any random syntax)
let item of items
note that we have * which means angular will put a ng-template around the target DOM

### 3.3 Attribute Directives: ngClass
Attribute directives are used for changing behavior say design etc of DOM elements but do not change their structure.
[ngClass]="{'medium-movies':mediaItem.medium==='Movies', 'medium-series':mediaItem.medium==='Series'}"

### 3.4 Custom Directives: Favorite
Setting a class based on favorite or not
[appFavorite]
HostBinding is used to bind a host element property to a directive property
Add it to app.module

### 3.5 Custom Directives: Values
[appFavorite]="mediaItem.isFavorite"
Get the values in directive
@Input() set appFavorite(value){
    this.isFavorite = value;
}

### 3.6 Working with events in directives
HostListeners can be used to listen to events from directives.
@HostBinding('class.is-favorite-hovering') hovering = false; 
@HostListener('mouseenter') onMouseEnter(){
    this.hovering = true;
}

### 3.7 Pipe
A template expression operator that takes in a value and returns a new value representation.
{{mediaItem.watchedOn | date}}
Pipe with parameters
{{mediaItem.watchedOn | date: 'shortDate'}}
Chaining Pipes
{{mediaItem.name | slice: 0 : 10 | uppercase}}

### 3.8 Custom Pipe
Pipe to show unique media categories
@Pipe({
  name: 'categoryList'
  pure: true
})
pure tells us if the pipe is stateless or statefull. true means it can take and return data without any side effects.
transform is the fn angular uses.

## 4. Forms
### 4.1 Angular Forms
Forms are used to collect, validate and submit data.
Provides the following features: Built-in validators, Custom validators, Async validators, Form object representation
Types: 
a. Template Driven: Most of the form logic are in template
b. Model Driven: Most of the form logic are in controller

### 4.2 Template Drive Forms
import FormsModule from angular core.
No need of any identifier for form tags in html. Since angular automatically identifieds form tags for template driven forms. 
But for fields we need to use the directive ngModel. It will pick the name attribute automatically for reference.
<form (ngSubmit)="onSubmit(mediaItemForm.value)" #mediaItemForm="ngForm">
ngSubmit is triggered when submit button is clicked in form.
local variable mediaItemForm set to ngForm. This will set a FormGroup model behind the scene for this form local variable.

### 4.3 Model Driven Forms
Form field contract
Field validation rules
Change tracking
Can be unit tested
Thus, template driven forms are simple and easy to use but model driven forms are more powerful.
import { ReactiveFormsModule } from '@angular/forms';
In template driven approach FormGroup model was automatically created behind the scenes. For model driven approach we will have to create one FormGroup that will represent the form elements in template.
Defining FormGroup and FormControl
this.mediaForm = new FormGroup({
    medium: new FormControl('Movies'),
    name: new FormControl(''),
    category: new FormControl(''),
    year: new FormControl('')
});
Wiring up formGroup and formControl to template
<form (ngSubmit)="onSubmit(mediaForm.value)" [formGroup]="mediaForm">
<input type="text" name="name" id="name" formControlName="name">

### 4.4 Model Driven Forms - Built in validation
Validators.compose([
    Validators.required,
    Validators.pattern('[\\w\\-\\s\\/]+')
]))

### 4.5 Model Driven Forms - Built in validation
year: new FormControl('', this.yearValidator)
default value and validator are the two parameters being passed

### 4.6 Model Driven Forms - Error handling
mediaForm.get('name').hasError('pattern')
mediaForm.get('year').errors as yearErrors

## 5 Dependency Injection
### 5.1 Intro
Dependency injection brings modularity into angular.
It is done in two steps: 
a. Registering services for injection. It lets angular know what all modules can be possibly injected.
b. Calling the service for use. In constructor. This is a singleton behavior. Means: once the service is called once, the instance is stored in memory. and from the next time onwards the same is used without calling it. Note that the singleton memory instance of service injected is available to the component where it's registered and to it's child.

### 5.2 Services in Angular
No angular specific declaration. Plane old javascript class declaration like below code.
class MediaItemService {
    getById(id){
    }
}
Use: a. For data fetch and send. (Reusable, modular and testable)
b. For business logics. (Reusable, modular and testable)

### 5.3 Class constructor injection
Injecting FormBuilder to form class instead of imporing FormGroup and FormControl which we don't have to instantiate in our component any more.

### 5.4 Creating and providing a service
providers: []

### 5.5 Using the service in components
inject in constructor. And use get, add , delete custom methods

### 5.6 The Inject decorator
const lookupLists = {
  mediums: ['Movies', 'Series']
};
{ provide: 'lookupListToken', useValue: lookupLists }
Add the above to provides in app module
@Inject('lookupListToken') public myLookupLists
*ngFor="let medium of myLookupLists.mediums"

### 5.7 Injection token
Using this to avoid using string literal token name with @Inject decorator. Thus providing a better/safer way to inject our values. Since we always mistype a string. But with injecttoken if there is any typo error it will throw exception now.

## 6. Http
### 6.1 The Angular HttpClient

### 6.2 Use a mock back end for HTTP calls
HttpXhrBackend,
MockXHRBackend
{ provide: HttpXhrBackend, useClass: MockXHRBackend }

### 6.3 Use the HttpClient for GET calls

## 7. Routing
Angular's routing module uses the browser's history.pushstate to trigger navigation.
### 7.1 Setting the base href and configuring routes
index.html <base href="/">
Note that in routes array order is important since the first match found will be considered by Angular

### 7.2 Registering routing in the app module
export const routing = RouterModule.forRoot(appRoutes);
import it in app.module and add to imports array

### 7.3 Router outlets
After routes are registered, in order to render it we use router outlets. Router outlets are structural directives which defines where the components from Routes are going to be loaded at.
router-outlet is the selector which renders the components as a sibling to it.

### 7.4 Router links
This is used to create navigation links in our angular app.
<a routerLink="/Movies">

### 7.5 Working with route parameters
import { ActivatedRoute } from '@angular/router';
this.activatedRoute.params.subscribe(params => {
    let medium = params['medium'];
    if(medium.toLowerCase() === 'all') {
    medium = '';
    }
    this.mediaItems = this.mediaItemService.getFiltered(medium);
})