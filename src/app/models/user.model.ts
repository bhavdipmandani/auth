export class User {
  constructor(
    private token: string,
    private email: string,
    private password: string,
    private firstName: string,
    private lastName: string,
    private phone: any,
    private gender: string,
    private birhtDate: string,
    ) { }
}
