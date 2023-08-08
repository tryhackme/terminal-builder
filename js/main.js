//Terminal Title Update

 // Get references to the input and preview elements
  const terminalTitleInput = document.getElementById('terminalTitle');
  const terminalTitlePreview = document.getElementById('terminalTitlePreview');

  // Add an event listener to the input element
  terminalTitleInput.addEventListener('input', function () {
    // Update the preview with the input value
    terminalTitlePreview.textContent = this.value;
    updateCodeOutput();
  });



  // Terminal Language Update

    // Get references to the dropdown and code preview elements
  const terminalLanguageSelect = document.getElementById('terminalLanguage');
  const codePreview = document.getElementById('codePreview');

  // Add an event listener to the dropdown
  terminalLanguageSelect.addEventListener('change', function () {
    // Get the selected value
    const selectedValue = this.value;

    // Update the class of the code preview
    codePreview.className = `language-${selectedValue}`;

    // Re-run Prism.js syntax highlighting
    Prism.highlightAll();
    updateCodeOutput();
  });



//Terminal Colour Update

  // Get references to the dropdown and terminal content elements
  const terminalColourSelect = document.getElementById('terminalColour');
  const terminalContent = document.getElementById('terminalColourPreview');

  // Add an event listener to the dropdown
  terminalColourSelect.addEventListener('change', function () {
    // Get the selected value
    const selectedValue = this.value;

    // Remove both "attacker" and "defender" classes
    terminalContent.classList.remove('attacker', 'defender');

    // Add the selected class if it's not "default"
    if (selectedValue === 'attacker' || selectedValue === 'defender') {
      terminalContent.classList.add(selectedValue);
    }
    updateCodeOutput();
  });


  //Terminal Output (input) Update

  // Get references to the textarea and code preview elements
  const terminalOutputTextarea = document.getElementById('terminalOutput');

  // Add an event listener to the textarea
  terminalOutputTextarea.addEventListener('input', function () {
    // Get the content of the textarea
    const textareaContent = this.value;

    // Update the content of the code preview
    codePreview.textContent = textareaContent;

    // Re-run Prism.js syntax highlighting
    Prism.highlightAll();
    updateCodeOutput();
  });



function encodeHtmlEntities(text) {
    return text.replace(/['"&<>]/g, function(char) {
        switch (char) {
            case "'":
                return '&#39;';
            case '"':
                return '&quot;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            default:
                return char;
        }
    });
}

//Update the code output for copying

  function updateCodeOutput() {
    let outputTitle = document.getElementById('terminalTitle').value;
    let outputLanguage = document.getElementById('terminalLanguage').value;
    let outputColour = document.getElementById('terminalColour').value;
    let outputText = document.getElementById('terminalOutput').value;

    // Encode special characters in the outputText
    outputText = encodeHtmlEntities(outputText);

codeOutput.value = `<div class="terminal-container">
    <div class="terminal-content ${outputColour}">
        <div class="terminal-top">
            ${outputTitle}
        </div>
        <pre class="terminal-code">
           <code class="language-${outputLanguage}">${outputText}</code>
        </pre>
    </div>
</div>`;
  }




  // Copy to Clipboard

const copyToClipboardButton = document.getElementById('copyToClipboardButton');
const codeOutputTextarea = document.getElementById('codeOutput');

copyToClipboardButton.addEventListener('click', function () {
  // Temporarily remove the disabled attribute
  codeOutputTextarea.removeAttribute('disabled');
  
  // Select the content of the textarea
  codeOutputTextarea.select();
  
  // Copy the selected content to the clipboard
  document.execCommand('copy');
  
  // Remove the text selection
  window.getSelection().removeAllRanges();
  
  // Restore the disabled attribute after copying
  codeOutputTextarea.setAttribute('disabled', 'true');
  
  // Change the button text to "Copied!" temporarily
  copyToClipboardButton.textContent = 'Copied!';
  
  // Set a timeout to revert the button text back to "Copy to Clipboard" after 2 seconds
  setTimeout(function () {
    copyToClipboardButton.textContent = 'Copy to Clipboard';
  }, 2000);
});


// ResetButton

const resetButton = document.getElementById('resetButton');

    resetButton.addEventListener('click', function () {
        location.reload(true);
    });