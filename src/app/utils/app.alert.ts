import { Injectable } from '@angular/core';

@Injectable()
export class AppAlert{
	node: any;
	textnode: any;
	closeNode:any;
	close:any;
	closeTimeout:any;

	alert(message: string): void {
		this.textNode.textContent = message;         	
		this.node.appendChild(this.textNode);                       // Append the text to <li>
		document.getElementsByTagName('body')[0].appendChild(this.node);
		// console.log(document.getElementsByTagName('body')[0]);
		// document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
		console.log(message);
		this.closeTimeout = setTimeout( () => {
			document.getElementsByTagName('body')[0].removeChild(this.node);
			this.node.removeChild(this.textnode);
		}, 10000);
		this.initListeners();
	}

	constructor() {
		this.initUI();
		
	}
	initUI(){
		this.textNode = document.createTextNode(''); 			// Create a text node

		this.closeNode = document.createTextNode('X');
		this.close = document.createElement('div');
		this.close.className = 'app-alert-close';
		this.close.appendChild(this.closeNode);

		this.node = document.createElement('div');                 	// Create a <li> node
		this.node.className = 'app-alert alert alert-danger';
		this.node.appendChild(this.close);
	}
	initListeners(){
		this.close.addEventListener('click', () => {
			clearTimeout(this.closeTimeout);
			document.getElementsByTagName('body')[0].removeChild(this.node);
			this.node.removeChild(this.textnode);
		}) );
		document.getElementsByTagName('body')[0].addEventListener('click', () => {
			clearTimeout(this.closeTimeout);
			document.getElementsByTagName('body')[0].removeChild(this.node);
			this.node.removeChild(this.textnode);
		}) );
	}
	
}