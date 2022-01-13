export class Contact {

    //instance variables for the constructor
    public id;
    public name;
    public email;
    public phone;
    public imageURL;
    public group;

    constructor(id: number, name: string, email: string, phone: string, imageURL: string, group: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageURL = imageURL;
        this.group = group;
    }
}