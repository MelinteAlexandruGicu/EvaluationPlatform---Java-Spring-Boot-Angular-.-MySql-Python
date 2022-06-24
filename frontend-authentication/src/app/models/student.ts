export class Student {
    public firstname: string;
    public lastname: string;
    public email: string; 
    public grade: number; 
    public typeOfEvaluation: string;
    constructor(firstname: string, lastname: string, email: string, grade: number, typeOfEvaluation: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.grade = grade;
        this.typeOfEvaluation = typeOfEvaluation;
    }
}
