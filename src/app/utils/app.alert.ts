import { Injectable } from '@angular/core';

@Injectable()
export class AppAlert{
	node: any;
	textnode: any; 

	alert(message: string): void {
		this.textnode = document.createTextNode(message);         	// Create a text node
		this.node.appendChild(this.textnode);                            		// Append the text to <li>
		document.getElementsByTagName('body')[0].appendChild(this.node);
		// console.log(document.getElementsByTagName('body')[0]);
		// document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
		console.log(message);
	}

	constructor() {
		this.node = document.createElement("div");                 	// Create a <li> node
		this.node.className = "app-alert alert alert-danger";
	}
}