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
            this.classList.remove(name);
            return this;
        }

        Element.prototype.hasClass = function(name) {
            return this.classList.contains(name);
        }
    }

    initEvents()
    {
        this.el.myPhoto.on('click', e => {
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 10);
        });

        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 10);
        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        });
    }

    closeAllLeftPanel()
    {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}