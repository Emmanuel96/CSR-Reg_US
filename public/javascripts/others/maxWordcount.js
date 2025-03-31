document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('introduction_textarea');
    const wordCountDisplay = document.getElementById('word_count');
    const maxWords = 500;

    function updateWordCount() {
        const text = textarea.value;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        wordCountDisplay.textContent = `${wordCount}/${maxWords} words`;

        if (wordCount > maxWords) {
            wordCountDisplay.classList.add('text-red-500');
        } else {
            wordCountDisplay.classList.remove('text-red-500');
        }
    }

    textarea.addEventListener('input', updateWordCount);
    updateWordCount();
});

function updateApplicationIntroduction(){
    console.log("saving text");
}
