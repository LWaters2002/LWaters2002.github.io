class CategorySelector extends HTMLElement {

    categories = [];    
    constructor() {
        super();

        const categoryAttr = this.getAttribute('categories');
        this.categories = categoryAttr.split(',').map(category => category.trim());
        const categoriesHtml = 
        categoryAttr ? 
        `${categoryAttr.split(',').map(category => `<sl-button id="${category.trim().replace(' ','-').toLowerCase()}"class="tags">${category.trim()}</sl-button>`).join(' ')}` 
        : '';

        this.innerHTML = `
        <div class="sorting-buttons">
          <sl-button-group label="Alignment" class="button-group">
            ${categoriesHtml}
          </sl-button-group>
        </div>
        `;

        this.querySelectorAll('sl-button').forEach(button => {
            button.addEventListener('click', () => {
                let selectedCategory = button.id;

                button.classList.contains('selected') ? selectedCategory = 'all' : selectedCategory = button.id;

                this.querySelectorAll('sl-button').forEach(btn => btn.classList.remove('selected'));
                
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