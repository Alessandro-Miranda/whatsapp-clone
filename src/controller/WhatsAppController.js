class WhatsAppController
{
    constructor()
    {
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    loadElements()
    {
        this.el = {};
        // pega todos os elementos que possuem id e alimenta o objeto com a referencia do elemento
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    elementsPrototype()
    {
        // Cria o prototipe encapsulando o contexto this
        Element.prototype.hide = function() {
            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function() {
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function() {
            this.style.display = this.style.display === 'none' ? 'block' : 'none';
            return this;
        }

        // melhorar está função para receber diversos eventos junto com funções diferentes
        Element.prototype.on = function(events, fn) {
            events.split(' ').forEach(event => {
                // esse this se refere ao elemento do prototype. Como ele está dentro de uma arrow function, ele não tem escopo
                this.addEventListener(event, fn);
            });
            return this;
        }

        Element.prototype.css = function(styles) {
            for(var name in styles)
            {
                this.style[name] = styles[name];
            }
            return this;
        }

        Element.prototype.addClass = function(name) {
            this.classList.add(name);
            return this;
        }

        Element.prototype.removeClass = function(name) {
            this.classList.remove(name);
            return this;
        }

        Element.prototype.toggleClass = function(name) {
            this.classList.contains(name) ? this.classList.remove(name) : this.classList.add(name);
            return this;
        }

        Element.prototype.hasClass = function(name) {
            return this.classList.contains(name);
        }

        HTMLFormElement.prototype.getForm = function() {
            return new FormData(this);
        }

        HTMLFormElement.prototype.toJson = function() {
            
            let json = {};

            this.getForm().forEach((value, key) => {
                json[key] = value;
            });

            return json;
        }


    }

    initEvents()
    {
        this.el.myPhoto.on('click', () => {
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();

            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 10);
        });

        this.el.btnNewContact.on('click', () => {
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();

            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 10);
        });

        this.el.btnClosePanelEditProfile.on('click', () => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', () => {
            this.el.panelAddContact.removeClass('open');
        });

        this.el.photoContainerEditProfile.on('click', e => {
            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', e => {
            if(e.key === 'Enter')
            {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        });

        this.el.btnSavePanelEditProfile.on('click', e => {
            console.log(this.el.inputNamePanelEditProfile.textContent);
        });

        this.el.formPanelAddContact.on('submit', e => {
            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);
        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', () => {
                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });
            });
        });

        this.el.btnAttach.on('click', e => {
            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });

        this.el.btnAttachPhoto.on('click', () => {
            this.el.inputPhoto.click();
        });

        this.el.btnAttachCamera.on('click', () => {
            this.closeAllMainPanel();

            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height':'calc(100% - 120px)'
            });
        });

        this.el.btnAttachDocument.on('click', () => {
            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height':'calc(100% - 120px)'
            });
        });

        this.el.btnAttachContact.on('click', () => {
            this.el.modalContacts.show();
        });

        this.el.btnCloseModalContacts.on('click', e => {
            this.el.modalContacts.hide();
        })

        this.el.inputPhoto.on('change', e => {
            [...this.el.inputPhoto.files].forEach(file => {
                console.log(file);
            });
        });

        this.el.btnClosePanelCamera.on('click', e => {
            this.closeAllLeftPanel();
            this.el.panelMessagesContainer.show();
        });

        this.el.btnTakePicture.on('click', e => {
            console.info('take picture');
        });

        this.el.btnClosePanelDocumentPreview.on('click', e => {
            this.closeAllLeftPanel();
            this.el.panelMessagesContainer.show();
        });

        this.el.btnSendDocument.on('click', e => {
            console.info('send document');
        });

        this.el.btnSendMicrophone.on('click', e => {
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();

            this.startRecordMicrophoneTime();
        });

        this.el.btnCancelMicrophone.on('click', e => {
            this.closeRecordMicrophone();
        });

        this.el.btnFinishMicrophone.on('click', e => {
            this.closeRecordMicrophone();
        });

        this.el.inputText.on('keypress', e => {
            if(e.key === 'Enter' && !e.ctrlKey)
            {
                e.preventDefault();
                this.el.btnSend.click();
            }
        })

        this.el.inputText.on('keyup', e => {
            if(this.el.inputText.innerHTML.length)
            {
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            }
            else
            {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }
        });

        this.el.btnSend.on('click', e => {
            console.log(this.el.inputText.innerHTML);
        });

        this.el.btnEmojis.on('click', e => {
            this.el.panelEmojis.toggleClass('open').css({
                'bottom': '-1.5px'
            });
        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            emoji.on('click', e => {
                console.log(emoji.dataset.unicode);
            });
        });
    }

    startRecordMicrophoneTime()
    {
        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);
        }, 100);
    }

    closeRecordMicrophone()
    {
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);
    }

    closeAllMainPanel()
    {
        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');
    }

    closeMenuAttach(e)
    {
        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
    }
    closeAllLeftPanel()
    {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}