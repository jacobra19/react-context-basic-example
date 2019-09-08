
### React Context & Hooks simple example


##### 1. creat a context: lets create a ThemeContext.js file

	import  React, { Component,createContext } from  'react'
	export  const  ThemeContext=  createContext();
	
	class  ThemeContextProvider  extends  Component {
		state  = {
			isLightTheme: true,
			light:{
				syntax: '#555',
				ui: '#ddd',
				bg: '#eee',
			},
			dark:{
				syntax: '#ddd',
				ui: '#333',
				bg: '#555',
			}
		}

		toggleTheme  = () => {
			this.setState({isLightTheme:  !this.state.isLightTheme})
		}

		render(){
			return(
				<ThemeContext.Provider  value={{...this.state,toggleTheme:  this.toggleTheme}}>
					{this.props.children}
				</ThemeContext.Provider>
			)
		}
	}
	export  default  ThemeContextProvider;

first of all we import the createContext function,
then we created a new context by invoking it and assigning it to ThemeContext.

in the render function we returning the ThemeContext that we invkoed earlier and adding the Provider.
that means that we are making the state of the context to be consumed by other components.
in the value property we are passing the data that we want to make available to be consumed.

##### 2. wrap the dedicated components inside the ThemeContextProvider component in the App.js file

	
	import  React  from  'react';
	import  BookList  from  './components/BookList';
	import  Navbar  from  './components/Navbar';
	import  ThemeContextProvider  from  './contexts/ThemeContext';
	import  ThemeToggle  from  './contexts/ThemeToggle';
	import  AuthContextProvider  from  './contexts/AuthContext';
	import  BookContextProvider  from  './contexts/BookContext';

	function  App() {

		return (
			<div  className="App">
				<ThemeContextProvider>
					<AuthContextProvider>
						<Navbar  />

						<BookContextProvider>
							<BookList  />
						</BookContextProvider>

						<ThemeToggle/>
					</AuthContextProvider>
				</ThemeContextProvider>
			</div>
		);
	}
	export  default  App;

as you can see in the code above there are multiple context provider components, but we will focus on the ThemeContextProvider example.

as you can see the ThemeContextProvider wraps all the all of the components in out app, this means that all the components the are inside the ThemeContextProvider can consume the data of the theme context.
same applies for AuthContextProvider, on the contrary the BookContextProvider contains only the BookList component, this means that on the BookList compoent and sub-components can consume the BookContextProvider data.

##### 3.1.how to consume the Context data in ThemeToggle.js class component

	import  React, { Component} from  'react';
	import { ThemeContext } from  './ThemeContext';

	class  ThemeToggle  extends  Component {
		static  contextType  =  ThemeContext;

		render(){
			const {toggleTheme} =  this.context;
			return(
				<button  onClick={  toggleTheme  }>Toggle The theme</button>
			)
		}
	}
	export  default  ThemeToggle;

in order to make the ThemeContext available we have to import it and then assign it to static method called contextType. then the context will be available on **this.context**.

but what if you would like to consume more then one context?

lets head back to the App.js and take a different approach 

##### 3.2.how to consume the multiple Contexts in ThemeToggle.js class component

	import  React, { Component} from  'react';
	import { ThemeContext } from  '../contexts/ThemeContext';
	import { AuthContext} from  '../contexts/AuthContext';
	import { BookContext} from  '../contexts/BookContext';

	import  BookList  from  './components/BookList';
	import  Navbar  from  './components/Navbar';
	import  ThemeToggle  from  './contexts/ThemeToggle';

	function  App() {

		return (
			<div  className="App">
				<ThemeContext.Consumer>{(themeContext)=>{
					<AuthContext.Consumer>{(authContext)=>{
						<Navbar themeContext={themeContext} authContext={authContext}/>

						<BookContext.Consumer>{(bookContext)=>{
							<BookList  bookContext={bookContext}/>
						}}</BookContext.Consumer>

						<ThemeToggle themeContext={themeContext} authContext={authContext}/>
					}}</AuthContext.Consumer>
				}}</ThemeContext.Consumer>
			</div>
		);
	}
	export  default  App;

this time we use the Consumer property on the context then pass it down as props to the components, this method allows us to use multiple contexts while still using the class components.

##### 3.2. consume the Context in ThemeToggle.js functional component and useContext hook
	import  React, { Component, useContext } from  'react';
	import { ThemeContext } from  './ThemeContext';

	const  ThemeToggle  = () => {
		const {toggleTheme} =  useContext(ThemeContext)

		return (
			<button  onClick={  toggleTheme  }>Toggle The theme</button>
		);
	}
	export  default  ThemeToggle;
the useContext hook allows us to call any context by simply passing the context to the useContext hook, with this hook you can consume both multiple and single contexts.

in conclusion

- Use const someContext = React.createContext() to create context.
- Pull someContext.Provider and someContext.Consumer out of someContext
- Wrap Provider around your parent component.
- **A class can consume with static contextType = someContext**
- **A functional component can consume with const someContext = useContext(someContext)**
- ***Both class and functional can consume someContext.Consumer***