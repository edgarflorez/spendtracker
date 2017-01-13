import { Injectable } from '@angular/core';

@Injectable()
export class AppAlert{
	alert(message: string): void {
		var node = document.createElement("div");                 // Create a <li> node
		node.className = "test";
		var textnode = document.createTextNode(message);         // Create a text node
		node.appendChild(textnode);                            // Append the text to <li>
		document.getElementsByTagName('body')[0].appendChild(node);
		console.log(document.getElementsByTagName('body')[0]);
		// document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
		console.log(message);
	}

	constructor() {}
}