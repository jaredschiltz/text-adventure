let cursorBlink = false
let currentBuffer
//let someText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
let someText = "There is nothing around you. As far as you can see, in every direction, \
the only thing visible is the horizon. "
currentBuffer = formatText(someText)
//console.log(currentBuffer)
document.getElementById("textField").innerHTML = currentBuffer

setInterval(() => {
    if (cursorBlink) {
        document.getElementById('cursor').style.color = 'green'
    } else {
        document.getElementById('cursor').style.color = 'black'
    }
    cursorBlink = !cursorBlink
}, 400)

/* Always keep the focus on the input box */
document.getElementById('inputBox').onblur = () => {
    document.getElementById('inputBox').focus()
}

/* Input box callback function */
function keyPressFcn(e) {
    if (e.key === 'Enter') {
		currentBuffer += "<br>" + ">&nbsp;" + document.getElementById('inputBox').value + "<br>"
		//get the number of lines after text added
		if (getNumLines(currentBuffer) > 28)
		{
			let numLinesToDelete = getNumLines(currentBuffer) - 28
			for (i = 0; i < numLinesToDelete; ++i)
			{
				currentBuffer = deleteLine(currentBuffer)
			}
			//delete lines if neccessary
		}
		
		//console.log(getNumLines(currentBuffer))
		//console.log(currentBuffer)
        document.getElementById("textField").innerHTML = currentBuffer
        document.getElementById('inputBox').value = ''
    }

}

//16px font * 45 characters = 720px (width of windows)

//This function adds line breaks to a long piece of text
//input required: space at end of long line
function formatText(text) {
    const characterIncrement = 45
	let startIndex  = 0
	let endIndex = startIndex
	let formattedText = ''

	//console.log('text len:', text.length)
	while (text.indexOf(' ', startIndex ) !== -1)
	{
		endIndex = text.lastIndexOf(' ', startIndex + characterIncrement)
		//console.log(text.substring(startIndex, endIndex), startIndex, endIndex)
		formattedText += text.substring(startIndex, endIndex)
		formattedText += "<br>" 
		startIndex = endIndex + 1	
	}

	


	return formattedText
		
}

function getNumLines(text)
{
	return text.match(/<br>/g).length
}

function deleteLine(text)
{
	//get rest of string after first break found
	 return text.substring(text.indexOf("<br>") + 4)
}