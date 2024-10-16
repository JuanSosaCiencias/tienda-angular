export class Category {
    // Class properties
    category_id:    number;
    category:       string;
    tag:            string;
    status:         string;
    
    // Constructor, only stores the values
    constructor(category_id: number, category: string, tag: string, status: string){
        this.category_id=   category_id;
        this.category=      category;
        this.tag=           tag;
        this.status=        status;
    }
}
