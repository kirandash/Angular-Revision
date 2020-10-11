# Angular Essentials - Revision
## 1. Angular architecture:
1. **Component, bootstrap and the DOM**: First app.module or component is bootstrapped and from there all the child elements are called on.
2. **Directives and Pipes**: Component is actually a directive with a template. Directives provides functionalities and can transform the DOM. Types: 
    * a. **Structural**: modify the DOM of the target, 
    * b. **Attribute**: Changes behavior of the parent of target.
3. **Pipes**: Helps modify content
4. **Data Binding**: Interpolation, Directives, Local variables that can be used in a template for child elements
5. **Dependency Injection**: Create decoupled modules/services and then use them when/where required.
6. **Services**: It holds the business logic. Or interaction with third party apis for fetching/posting data. While the components just calls the services and use them.
7. **Data persistence**: Local storage/Http(XHR, JSONP), 
8. **Routing**: Router urls, url with parameters, life cycle hooks, directives to put in templates to show routing target content

## 2. Components
### 2.1 NgModule decorator and Root module(app.module)
1. **Decorator**: Expression that evaluates to a function allowing annotation of classes at design time.
`@Decoratorname()`
EX: `@Component()`

2. Root module: app.module.ts
**NgModule** is the root Decorator used in app.module.ts file to bootstrap our application.
`@NgModule` can accept some meta data properties such as **imports** (for Modules), **declarations**(for Components, directives and pipes), **providers** for services and **bootstrap**(for entry point modules) array.

### 2.2 Component Metadata
`@Component` decorator just like `@NgModule` is a core decorator from angular.
Accepts meta data like: selector, templateUrl, styleUrls arrays

### 2.3 Bootstrapping module for Browser
1. `main.ts` uses `platformBrowserDynamic` to bootstrap app module
    - `platformBrowserDynamic().bootstrapModule(AppModule)`
2. And then in app module we have a bootstrap meta data that tells angular which component to load i.e. app.component.
3. And then Angular will search for app component selector and render it where it is found for the first time. In our case it is in index.html file where app-root selector is used.
4. Note that it will not render multiple instances.

### 2.4 Component Selector
1. During bootstrapping angular searches for the bootstrapped component ie.e app.component and renders it's first instance.
Selectors can be given custom name

### 2.5 Component template
1. `template`: (Inline markup)
2. `tempateUrl`: (Markup from URL) './app.component.html' or 'app/app.component.html'. Note: for relative paths: src is the root start point.

### 2.6 Component Style
1. `styles`: [`h1 {color: red}`]
2. `styleUrls`:
3. Note: Angular adds dynamic tag to component and style. This is called **scoping at component level**.

### 2.7 Using other components in a component
1. We can use child components inside a component with using the selectors.
2. Ex: media-item is a child component to app.component

### 2.8 Interpolation and the expression context
1. Template syntaxes: Interpolation, binding, expressions, conditional templating, template variables, template expression operators
2. **Interpolation**: {{expression}} Does not support: assignments, newing up variables, chaining expressions, increment/decrement
3. All variables or functions declared in component are available in expression context in html file and thus no need of using this. operator.
4. `{{ name }}`
5. `{{ watchedOn() | date:'yyyy-MM-dd' }}`

### 2.9 Property Binding
1. `[htmlattr]="expression"`
2. `<h2 [textContent]="name"></h2>`
3. `<h2 textContent="{{name}}"></h2>`
4. Both are same. square bracket arround attr tells angular to evaluate the expression. If removed, then we must use interpolation to evaluate the expression.

### 2.10 Event binding
1. `(event)="fn()"`
2. `(click)="delete()"`

### 2.11 Getting data to the component with Input
1. Child:
    * `import Input from core`
    * `@Input() mediaItem;`
2. Parent:
    * firstMediaItem is defined in parent
    * `<app-media-item [mediaItem]="firstMediaItem"></app-media-item>`

### 2.12 Subscribing to component events with Output
1. Child:
    * `import { Output, EventEmitter} from '@angular/core';`
    * `@Output() deleteMedia = new EventEmitter();`
    * `delete(){ this.deleteMedia.emit(this.mediaItem); }`
2. Parent:
    * `<app-media-item (deleteMedia)="deleteMediaItem($event)"></app-media-item>`
    * `deleteMediaItem(mediaItem){ console.log('Deleted');}`

## 3. Directives and Pipes
### 3.1 Structural Directives: ngIf
1. Structural directives modify the DOM structure based on logic. "*" represents structural directives
2. *ngIf: conditionally render a DOM element
3. * is a syntactic sugar or short hand pattern for using `<ng-template>`.
4. It is an alternate or shotcut.
    * `<div *ngIf="mediaItem.watchedOn">Watched on {{mediaItem.watchedOn}}</div>` or
    * `<ng-template [ngIf]="mediaItem.category">DOM Content</ng-template>`
        - `ng-template` is useful when having multiple Divs to show/hide conditionally.

### 3.2 Structural Directives: ngFor
1. `*ngFor` accepts micro syntax. (Means: a micro syntax should have specific syntax. Doesn't accept any random syntax)
    - `let item of items`
2. note that we have * which means angular will put a `ng-template` around the target DOM

### 3.3 Attribute Directives: ngClass
1. **Attribute directives** are used for changing behavior say design etc of DOM elements but do not change their structure.
    * `[ngClass]="{'medium-movies':mediaItem.medium==='Movies', 'medium-series':mediaItem.medium==='Series'}"`

### 3.4 Custom Directives: Favorite
1. Setting a class based on favorite or not
2. [appFavorite]
3. `HostBinding` is used to bind a host element property to a directive property
4. Add it to app.module

### 3.5 Custom Directives: Values
1. `[appFavorite]="mediaItem.isFavorite"`
2. Get the values in directive
    * `@Input() set appFavorite(value){ this.isFavorite = value;}`

### 3.6 Working with events in directives
1. `HostListeners` can be used to listen to events from directives.
2. `@HostBinding('class.is-favorite-hovering') hovering = false; `
3. `@HostListener('mouseenter') onMouseEnter(){this.hovering = true;}`

### 3.7 Pipe
1. A **template expression operator** that takes in a value and returns a new value representation.
2. `{{mediaItem.watchedOn | date}}`
3. Pipe with parameters
    * `{{mediaItem.watchedOn | date: 'shortDate'}}`
4. Chaining Pipes
    * `{{mediaItem.name | slice: 0 : 10 | uppercase}}`

### 3.8 Custom Pipe
1. Pipe to show unique media categories
2. EX: `@Pipe({ name: 'categoryList', pure: true })`
    - pure tells us if the pipe is stateless or statefull. true means it can take and return data without any side effects.
transform is the fn angular uses.

## 4. Forms
### 4.1 Angular Forms
1. Forms are used to collect, validate and submit data.
2. Provides the following features: Built-in validators, Custom validators, Async validators, Form object representation
3. Types: 
    * **Template Driven**: Most of the form logic are in **template**
    * **Model Driven**: Most of the form logic are in **controller**

### 4.2 Template Drive Forms
1. `import FormsModule` from angular core.
2. No need of any identifier for form tags in html. Since angular automatically identifieds form tags for template driven forms. 
3. But for fields we need to use the directive ngModel. It will pick the name attribute automatically for reference.
4. `<form (ngSubmit)="onSubmit(mediaItemForm.value)" #mediaItemForm="ngForm">`
5. `ngSubmit` is triggered when submit button is clicked in form.
6. local variable mediaItemForm set to `ngForm`. This will set a `FormGroup` model behind the scene for this form local variable.

### 4.3 Model Driven Forms
1. Benefits of MDF:
    1. Form field contract
    2. Field validation rules
    3. Change tracking
    4. Can be unit tested
    5. Thus, template driven forms are simple and easy to use but model driven forms are more powerful.
2. `import { ReactiveFormsModule } from '@angular/forms';`
3. In template driven approach `FormGroup` model was automatically created behind the scenes. For model driven approach we will have to create one `FormGroup` that will represent the form elements in template.
4. Defining FormGroup and FormControl
5. `this.mediaForm = new FormGroup({
    medium: new FormControl('Movies'),
    name: new FormControl(''),
    category: new FormControl(''),
    year: new FormControl('')
});`
6. Wiring up formGroup and formControl to template
    * `<form (ngSubmit)="onSubmit(mediaForm.value)" [formGroup]="mediaForm">`
    * `<input type="text" name="name" id="name" formControlName="name">`

### 4.4 Model Driven Forms - Built in validation
1. `Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
    ]))`

### 4.5 Model Driven Forms - Built in validation
1. `year: new FormControl('', this.yearValidator)`
2. default value and validator are the two parameters being passed

### 4.6 Model Driven Forms - Error handling
1. `mediaForm.get('name').hasError('pattern')`
2. `mediaForm.get('year').errors as yearErrors`

## 5 Dependency Injection
### 5.1 Intro
1. Dependency injection brings **modularity** into angular.
2. It is done in two steps: 
    * Registering services for injection. It lets angular know what all modules can be possibly injected.
    * Calling the service for use. In constructor. This is a singleton behavior. Means: once the service is called once, the instance is stored in memory. and from the next time onwards the same is used without calling it. Note that the singleton memory instance of service injected is available to the component where it's registered and to it's child.

### 5.2 Services in Angular
1. No angular specific declaration. Plane old javascript class declaration like below code.
2. `class MediaItemService {
        getById(id){
        }
    }`
3. **Use**: 
    * For data fetch and send. (Reusable, modular and testable)
    * For business logics. (Reusable, modular and testable)

### 5.3 Class constructor injection
1. Injecting FormBuilder to form class instead of imporing FormGroup and FormControl which we don't have to instantiate in our component any more.

### 5.4 Creating and providing a service
2. `providers: []`

### 5.5 Using the service in components
1. inject in constructor. And use get, add , delete custom methods

### 5.6 The Inject decorator
1. `const lookupLists = {
        mediums: ['Movies', 'Series']
    };`
2. `{ provide: 'lookupListToken', useValue: lookupLists }`
3. Add the above to provides in app module
4. `@Inject('lookupListToken') public myLookupLists`
5. `*ngFor="let medium of myLookupLists.mediums"`

### 5.7 Injection token
1. Using this to avoid using string literal token name with `@Inject` decorator. Thus providing a better/safer way to inject our values. Since we always mistype a string. But with injecttoken if there is any typo error it will throw exception now.

## 6. Http
### 6.1 The Angular HttpClient

### 6.2 Use a mock back end for HTTP calls
1. `HttpXhrBackend, MockXHRBackend`
2. `{ provide: HttpXhrBackend, useClass: MockXHRBackend }`

### 6.3 Use the HttpClient for GET calls

## 7. Routing
1. Angular's routing module uses the browser's history.pushstate to trigger navigation.

### 7.1 Setting the base href and configuring routes
1. index.html `<base href="/">`
2. Note that in routes array order is important since the first match found will be considered by Angular

### 7.2 Registering routing in the app module
1. `export const routing = RouterModule.forRoot(appRoutes);`
2. import it in app.module and add to imports array

### 7.3 Router outlets
1. After routes are registered, in order to render it we use router outlets. **Router outlets** are structural directives which defines where the components from Routes are going to be loaded at.
2. `router-outlet` is the selector which renders the components as a sibling to it.

### 7.4 Router links
1. This is used to create navigation links in our angular app.
2. `<a routerLink="/Movies">`

### 7.5 Working with route parameters - activatedRoute
1. `import { ActivatedRoute } from '@angular/router';`
2. `this.activatedRoute.params.subscribe(params => {
        let medium = params['medium'];
        if(medium.toLowerCase() === 'all') {
        medium = '';
        }
        this.mediaItems = this.mediaItemService.getFiltered(medium);
    })`

### 7.6 Using the Router class to navigate
1. Like routerLink , we can use Router Class for navigation.
2. `this.router.navigate(['/', mediaItem.medium]);`
