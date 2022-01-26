export class Base64
{
    static getMimetype(urlBase64)
    {
        const regex = /^data:(.+);base64,(.*)$/;
        const result = urlBase64.match(regex);
        return result[1];
    }

    static toFile(urlBase64)
    {
        let mimetype = Base64.getMimetype(urlBase64);
        const ext = mimetype.split('/')[1];
        const filename = `file${Date.now()}.${ext}`;

        return fetch(urlBase64).then(res => res.arrayBuffer()).then((buffer => {
            return new File([buffer], filename, { type: mimetype })
        }))
    }
}