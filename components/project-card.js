class ProjectCard extends HTMLElement {

    tags = [];
    
    constructor() {
        super();

        document.querySelector('category-selector').addEventListener('category-selected', (event) => {
            let shouldDisplay = this.tags.includes(event.detail.category);
            if (event.detail.category === 'all') {
              shouldDisplay = true;
            }

            this.classList.toggle('hidden', !shouldDisplay);
        });

        const title = this.getAttribute('title') || 'Project Title';
        const image = this.getAttribute('image') || 'images/pic02.jpg';
        const description = this.getAttribute('description') || 'Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam. ';
        const tagsAttr = this.getAttribute('tags');
        this.tags = tagsAttr.split(',').map(tag => tag.trim().replace(' ', '-').toLowerCase());
        const tagsHtml = tagsAttr ? `${tagsAttr.split(',').map(tag => `<sl-badge id="${tag.trim().replace(' ','-').toLowerCase()}"class="tags">${tag.trim()}</sl-badge>`).join(' ')}` : '';

        this.innerHTML = `
          <article>
              <h2>
                <a href="#"> ${title} </a>
              </h2>
            <div class="tag-group">
            ${tagsHtml}
            <div>

            <a href="#" class="image fit"
              ><img src=${image} alt=""
            /></a>
            <p>
              ${description}
            </p>
            <ul class="actions special">
              <li><a href="#" class="button">Full Story</a></li>
            </ul>
          </article>
        `;
    }
}

customElements.define('project-card', ProjectCard);