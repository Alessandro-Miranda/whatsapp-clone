export default class Format
{
    static getCamelCase(text)
    {   
        let div = document.createElement('div');
        // cria uma div para poder utilizar o dataset que faz a transformação do id utilizando o dataset
        div.innerHTML = `<div data-${text}="id"></div>`;
        // retorna a chave do elemento da div (id no padrão camel case)
        return Object.keys(div.firstChild.dataset)[0];
    }

    static toTime(duration)
    {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0)
        {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        else
        {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}