class Modal extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
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
                    <h1>Please Confirm</h1>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <footer id="actions">
                    <button id="confirm">Confirm</button>
                    <button id="cancel">Cancel</button>
                </footer>
            </div>
        `;
    }
}

customElements.define('wc-modal', Modal);