/*----------------------------------------------------------------------------
 IE SVG 1.0
 Emulation Initialization Script
 -----------------------------------------------------------------------------
 Created by Mark Finkle (mark.finkle@gmail.com)
 Implementation of simple static SVG rendering in Internet Explorer using VML.
 -----------------------------------------------------------------------------
 Copyright (c) 2006 Mark Finkle

 This program is  free software;  you can redistribute  it and/or  modify it
 under the terms of the MIT License.

 Permission  is hereby granted,  free of charge, to  any person  obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the  Software without restriction,  including without limitation
 the  rights to use, copy, modify,  merge, publish, distribute,  sublicense,
 and/or  sell copies  of the  Software, and to  permit persons to  whom  the
 Software is  furnished  to do  so, subject  to  the  following  conditions:
 The above copyright notice and this  permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS",  WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED,  INCLUDING BUT NOT LIMITED TO  THE WARRANTIES  OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR  COPYRIGHT  HOLDERS BE  LIABLE FOR  ANY CLAIM,  DAMAGES OR OTHER
 LIABILITY, WHETHER  IN AN  ACTION OF CONTRACT, TORT OR  OTHERWISE,  ARISING
 FROM,  OUT OF OR  IN  CONNECTION  WITH  THE  SOFTWARE OR THE  USE OR  OTHER
 DEALINGS IN THE SOFTWARE.
 -----------------------------------------------------------------------------
 Dependencies: iesvg.htc (behavior implementation)
 History:
 2006-03-05 | Created
 2006-03-15 | Added <svg:g> support
              Added "fill='url(#gradientid)'" support for gradient fills
              Changed to DOM (appendChild, replaceChild) methods
 --------------------------------------------------------------------------*/

var svgns;

function ieSVGInit(htcFile) {
	// Only proceed if browser is IE 6 or later.
	var ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
	var opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
	if ((!ie) || (ie[1] < 6) || (opera)) {
		return;
	}

	// Add VML includes and namespace
	document.namespaces.add("v", "urn:schemas-microsoft-com:vml");

	// Add required css rules
	var style = document.createStyleSheet();
	style.addRule('v\\:*', "behavior: url(#default#VML);");

	if ((!htcFile) || (htcFile == ''))
	  htcFile = 'iesvg.htc';

  // find, and add if needed, the SVG namespace
  // it's a global variable
	svgns = document.namespaces("svg");
	if (svgns == null)
	  svgns = document.namespaces.add("svg", "");
	  
	// attach the behavior
	svgns.doImport(htcFile);


  if (svgns.readyState != "complete")
	{
		// Wait for the element behaviors to finish downloading
		svgns.attachEvent("onreadystatechange", updateElements);
	}
	else
	{
		updateElements();
	}	

}

function updateElements() {
  // not sure why we need to recreate the element, but if we don't
  // the behavior will not fire.

	// var newNode = document.createElement('svg:svg');
	// newNode.id = "uusnode";
	// 	 
	// var sHTML = apple.data;
	// newNode.innerHTML = sHTML;  // TODO: ei oikea järjestys, haittaako?
	// apple.parentNode.replaceChild(newNode, apple);
	// newNode.innerHTML = sHTML;  // TODO: ei oikea järjestys, haittaako?
	// 


	var nodes = document.getElementsByTagName('svg');  // MOD
	for (i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		var newNode = document.createElement('svg:svg');
		newNode.id = node.id;
		newNode.style.cssText = node.style.cssText;
	
		//var sHTML = node.innerHTML;
		var sHTML = apple.data;
		
		// alert(sHTML);
		// var xHTML = apple.data;
		// alert(xHTML);
		
		node.parentNode.replaceChild(newNode, node);
		newNode.innerHTML = sHTML;
	}

  svgns.detachEvent("onreadystatechange", updateElements);
}
