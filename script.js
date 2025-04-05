document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const downloadFinalBtn = document.getElementById('download-final-btn');
    const backBtn = document.getElementById('back-btn');
    const templateContainer = document.querySelector('.template-container');
    const controls = document.querySelector('.controls');
    const essayOutput = document.querySelector('.essay-output');
    const completeEssay = document.getElementById('complete-essay');

    generateBtn.addEventListener('click', generateCompleteEssay);
    downloadBtn.addEventListener('click', downloadEssay);
    downloadFinalBtn.addEventListener('click', downloadEssay);
    backBtn.addEventListener('click', backToEdit);

    function generateCompleteEssay() {
        // Get all editable elements
        const editableElements = document.querySelectorAll('.user-input');
        
        // Replace editable spans with their content in the final essay
        let essayHTML = `
            <div class="template-section">
                <h2>Introdução</h2>
                ${document.getElementById('introducao').innerHTML}
            </div>
            <div class="template-section">
                <h2>Desenvolvimento - 1º Parágrafo</h2>
                ${document.getElementById('desenvolvimento1').innerHTML}
            </div>
            <div class="template-section">
                <h2>Desenvolvimento - 2º Parágrafo</h2>
                ${document.getElementById('desenvolvimento2').innerHTML}
            </div>
        `;

        // Include optional paragraph if filled
        const desenvolvimento3 = document.getElementById('desenvolvimento3');
        const contraponto = document.querySelector('[data-id="contraponto"]');
        if (contraponto.textContent.trim() !== '' && contraponto.textContent.trim() !== '[contraponto]') {
            essayHTML += `
                <div class="template-section">
                    <h2>Desenvolvimento - 3º Parágrafo</h2>
                    ${desenvolvimento3.innerHTML}
                </div>
            `;
        }

        essayHTML += `
            <div class="template-section">
                <h2>Conclusão</h2>
                ${document.getElementById('conclusao').innerHTML}
            </div>
        `;

        completeEssay.innerHTML = essayHTML;
        
        // Hide template and show final essay
        templateContainer.classList.add('hidden');
        controls.classList.add('hidden');
        essayOutput.classList.remove('hidden');
    }

    function downloadEssay() {
        let essayText = '';
        
        // Get all paragraphs from the output
        const paragraphs = completeEssay.querySelectorAll('.template-section');
        
        paragraphs.forEach(section => {
            // Remove HTML tags and keep line breaks
            let sectionText = section.textContent;
            essayText += sectionText + '\n\n';
        });

        const blob = new Blob([essayText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'redacao-discursiva.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function backToEdit() {
        templateContainer.classList.remove('hidden');
        controls.classList.remove('hidden');
        essayOutput.classList.add('hidden');
    }
});
