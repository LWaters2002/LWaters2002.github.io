class CategorySelector extends HTMLElement {

    categories = [];    
    constructor() {
        super();

        const categoryAttr = this.getAttribute('categories');
        this.categories = categoryAttr.split(',').map(category => category.trim());
        const categoriesHtml = 
        categoryAttr ? 
        `${categoryAttr.split(',').map(category => `<button id="${category.trim().replace(' ','-').toLowerCase()}"class="category-button">${category.trim()}</button>`).join(' ')}` 
        : '';

        this.innerHTML = `

        <div class="category-section">

        <input type="checkbox" class="ToggleNDA" id="ToggleNDA">
        <label for="ToggleNDA" class="ToggleNDA">Hide non-disclosed projects</label>

        <div class="sorting-buttons">
            ${categoriesHtml}
        </div>
        </div>
        `;

        this.querySelector('.ToggleNDA').addEventListener('change', (e) => {
            this.dispatchEvent(new CustomEvent('toggle-nda', {
                detail: { isChecked : e.target.checked },
                bubbles: true,
                composed: true
            }));
        });
        
        this.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                let selectedCategory = button.id;

                button.classList.contains('selected') ? selectedCategory = 'all' : selectedCategory = button.id;

                this.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
                
                if (selectedCategory != 'all') {
                  button.classList.add('selected');
                }

                this.dispatchEvent(new CustomEvent('category-selected', {
                    detail: { category: selectedCategory },
                    bubbles: true,
                    composed: true
                }));
            });
        });

    }
}

customElements.define('category-selector', CategorySelector);