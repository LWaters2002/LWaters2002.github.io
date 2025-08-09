class ProjectCard extends HTMLElement {

  tags = [];
  hideNDAEnabledOverride = false;

  constructor() {
    super();

    const ndaAttribute = this.getAttribute('nda');
    if (ndaAttribute) {

      document.querySelector('category-selector').addEventListener('toggle-nda', (event) => {
        this.hideNDAEnabledOverride = event.detail.isChecked;
        this.classList.toggle('hidden', this.hideNDAEnabledOverride);
      });
    }

    document.querySelector('category-selector').addEventListener('category-selected', (event) => {
      let shouldDisplay = this.tags.includes(event.detail.category);
      if (event.detail.category === 'all') {
        shouldDisplay = true;
      }

      if (this.hideNDAEnabledOverride && ndaAttribute) {
        shouldDisplay = false;
      }

      this.classList.toggle('hidden', !shouldDisplay);
    });

    const title = this.getAttribute('title') || 'Project Title';
    const image = this.getAttribute('image') || 'images/pic02.jpg';
    const description = this.getAttribute('description') || 'Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam. ';
    const tagsAttr = this.getAttribute('tags');
    this.tags = tagsAttr.split(',').map(tag => tag.trim().replace(' ', '-').toLowerCase());
    const tagsHtml = tagsAttr ?
      `${tagsAttr.split(',').map(tag =>
        `<sl-badge id="${tag.trim().replace(' ', '-').toLowerCase()}"class="tags">${tag.trim()}</sl-badge>`).join(' ')}` : '';

    const extraButton = this.getAttribute('extra-button') || '';
    const projectID = this.getAttribute('project-id') || '';

    let extraButtonHtml = ''

    const quickviewSymbol = `<svg xmlns="http://www.w3.org/2000/svg" height="24px"
     viewBox="0 -960 960 960" width="24px" 
     fill="#000000ff"><path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>`;

    if (extraButton != '') {
      extraButtonHtml =
        `
      <div id="read-more-box">
      <a class="read-more-button" href="#${projectID}" target="_blank"> ${extraButton} </a>
      <button class="read-more-button" id="quickview"> ${quickviewSymbol} </button>
      </div>
      `;
    }

    this.innerHTML =
      `
          <div class="project-card">
              <h2>
                 ${title}
              </h2>
            <div class="tag-group">
            ${tagsHtml}
            </div>

            <div class="image fit"
              ><img src=${image} alt=""
            /></div>
            <p>
              ${description}
            </p>
            ${extraButtonHtml}
          </div>
      `;

    document.addEventListener('DOMContentLoaded', () => {
      this.querySelector('#quickview')?.addEventListener('click', event =>{
        history.pushState({ id: projectID }, '', `#${projectID}`);
        console.log(`pushed history state ${projectID}`);
            this.dispatchEvent(new CustomEvent('open-project-modal', {
                detail: { projectId : projectID },
                bubbles: true,
                composed: true
            }));
      });
    });
  }
}

customElements.define('project-card', ProjectCard);