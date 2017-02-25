import { Injectable } from '@angular/core';

@Injectable()
export class AppAlert{
	// Vars
	node: any;
	textNode: any;
	closeNode:any;
	close:any;
	closeTimeout:any;
	// Constructor
	constructor() {
		this.initUI();
	}
	// Public Methods
	alert(message: string): void {
		this.textNode.textContent = message;
		this.node.appendChild(this.textNode);
		document.getElementsByTagName('body')[0].appendChild(this.node);
		this.closeTimeout = setTimeout( () => {
			document.getElementsByTagName('body')[0].removeChild(this.node);
			this.node.removeChild(this.textNode);
		}, 10000);
		this.initListeners();
	}
	// Private Functions
	initUI(){
		this.textNode = document.createTextNode('');		// Create a text node

		this.closeNode = document.createTextNode('X');
		this.close = document.createElement('div');
		this.close.className = 'app-alert-close';
		this.close.appendChild(this.closeNode);

		this.node = document.createElement('div');          // Create a <li> node
		this.node.className = 'app-alert alert alert-danger';
		this.node.appendChild(this.close);
	}
	initListeners(){
		this.close.addEventListener('click', () => {
			clearTimeout(this.closeTimeout);
			this.node.removeChild(this.textNode);
			document.getElementsByTagName('body')[0].removeChild(this.node);
		});
	}
	
}