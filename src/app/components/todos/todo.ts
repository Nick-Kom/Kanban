export class Todo {
    constructor(public id: string,
                public title: string,
                public completed: boolean=false,
                public cardId: string ) {
    }
}
