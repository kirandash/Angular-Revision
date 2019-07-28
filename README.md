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