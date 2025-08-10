class ProjectModal extends HTMLElement {

    currentProjectID = '';

    constructor() {
        super();

        this.updateInnerHTML();
        this.bindEvents();
    }

    openModal(projectId) {
        this.currentProjectID = projectId;
        this.updateInnerHTML();

        document.body.style.overflow = 'hidden'; // Disable scroll overflow
        history.pushState({}, '', `#${projectId}`);
        modal.classList.add('active');
    }

    closeModal() {
        console.log(`closing current modal : ${this.currentProjectID}`)
        modal.classList.remove('active');
        history.replaceState(null, '', ' ');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    updateInnerHTML() {

        const modalContent = this.currentProjectID == "" ? '' :
            `<sl-include src="subpages/${this.currentProjectID}.html"></sl-include>`;

        console.log(`loading modal content page : ${this.currentProjectID}`);

        this.innerHTML = `
            <div class="modal-overlay" id="modal">
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                        <div class="modal-body">
                        ${modalContent}
                            <!-- Content will be injected here via JavaScript -->
                        </div>
                </div>
            </div>
        `;

        const self = this;

        this.querySelector(".close-modal").addEventListener('click', function () {
            self.closeModal();
        });
    }

    bindEvents() {

        const self = this;

        // Handle back/forward navigation
        window.addEventListener('popstate', () => {
            const projectId = window.location.hash.substring(1);
            console.log(`project id : ${projectId}"`);
            if (projectId) self.openModal(projectId);
            else self.closeModal();
        });

        window.addEventListener('load', () => {
            const projectId = window.location.hash.substring(1);
            if (projectId) self.openModal(projectId);
            else self.closeModal();
        });

        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('project-card')
                .forEach(x => x.addEventListener("open-project-modal", (event) => {
                    self.openModal(event.detail.projectId);
                }));

            document.querySelectorAll('.blog-open-button')
                .forEach(x => x.addEventListener("click", (event) => {
                    self.openModal(event.target.getAttribute("blogID"));
                }));
        });
    }
}

customElements.define('project-modal', ProjectModal);