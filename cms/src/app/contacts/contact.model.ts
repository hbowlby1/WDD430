export class Contact {

    //instance variables for the constructor
    public id: string;
    public name: string;
    public email: string;
    public phone: string;
    public imageURL: string;
    public group: any;

    //default constructor
    public constructor(id: string, name: string, email: string, phone: string, imageURL: string, group: any){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageURL = imageURL;
        this.group = group;
    }
}