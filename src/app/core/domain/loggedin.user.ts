export class LoggedInUser {
    constructor(id: number, username: string, active: boolean, hoten: string, manv: string, avatar: string) {               
        this.id = id;        
        this.username = username;
        this.active = active;
        this.hoten = hoten;
        this.manv = manv;
        this.avatar = avatar;
    }
    public id: number;    
    public username: string;
    public active: boolean;    
    public hoten: string;
    public manv: string;
    public avatar: string;
}

/*export class LoggedInUser {
    constructor(access_token: string, username: string, fullName: string, email: string, avatar: string) {
        this.access_token = access_token;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
    }
    public id: string;
    public access_token: string;
    public username: string;
    public fullName: string;
    public email: string;
    public avatar: string;
}*/