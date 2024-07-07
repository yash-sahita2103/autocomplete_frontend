Installation

Clone Repos : git clone https://github.com/yash-sahita2103/autocomplete_frontend.git
Install Node.js and npm
Install Angular CLI : npm install -g @angular/cli
Install Node Modules: 
Install Angular materials: ng add @angular/material (Matautocomplete component library)
Serve Frontend: ng serve

--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Search Component

Enables users to search for songs or artists with an autocomplete feature. The component uses Angular's reactive forms and HTTP client to dynamically fetch suggestions from a Flask backend (http://localhost:5000/autocomplete). As users type into the input field, the valueChanges observable triggers, filtering and transforming user input into lowercase for consistent querying. The _filter method sends HTTP requests to the backend, retrieves autocomplete suggestions, and handles errors gracefully by returning 'No suggestions found' if no results are returned or an error occurs. The frontend UI is styled using Angular Material components and custom CSS (search.component.css), ensuring responsive design and optimal user experience across different screen sizes.
	
	Functionality: The TypeScript file (search.component.ts) handles user input, filters suggestions using an HTTP request to the backend, and updates the UI dynamically. The CSS file (search.component.css) ensures responsive and visually appealing styling for the search component and autocomplete options.

	Angular Features: Utilizes Angular's reactive forms (FormControl), observables (Observable<string[]>), HTTP client (HttpClient), and lifecycle hooks (ngOnInit) for efficient data handling and UI updates.

	Styling: Enhances user interface with responsive form fields, increased font size for readability, and aligned autocomplete container for consistent presentation.