class Modal extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.75);
                    z-index: 10;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    pointer-events: none;
                }

                

                #modal {
                    z-index: 100;
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%; 
                    background: white;
                    border-radius: 3px;
                    padding: 1rem;
                    box-shadow: 0 0.5rem 1rem 0 rgba(0,0,0,0.5);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                }

                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }

                header {
                    padding: 1rem;
                }

                header > h1 {
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin: 0;
                }

                #main {
                    padding: 1rem;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions > button {
                    margin: 0 0.25rem;
                }

            </style>

            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name='title'>Please Confirm</slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <footer id="actions">
                    <button id="confirm-btn">Confirm</button>
                    <button id="cancel-btn">Cancel</button>
                </footer>
            </div>
        `;

        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', event => {
            console.dir(slots[1].assignedNodes());
        });

        const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
        const confirmButton = this.shadowRoot.querySelector('#confirm-btn');

        cancelButton.addEventListener('click', this._cancel.bind(this));
        confirmButton.addEventListener('click', this._confirm.bind(this));
    }

    attributedChangeCallback(name, oldValue, newValue) {
        if (this.hasAttribute('opened')) {
            this.isOpen = true;
        } else {
            this.isOpen = false;
        }

    }

    static get observedAttributes() {
        return ['opened'];
    }

    open() {
        this.setAttribute('opened', '')
        this.isOpen = true;
    }

    hide() {
        if(this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }
        this.isOpen = false;
    }

    _cancel() {
        this.hide();
    }

    _confirm() {
        this.hide();
    }
}

customElements.define('wc-modal', Modal);