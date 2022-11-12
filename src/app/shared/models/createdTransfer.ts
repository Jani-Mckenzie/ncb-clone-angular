export interface CreatedTransfer {
    _id:string;
    fromAccount : string;
    toAccount : string;
    amount :  number;
    fromTransaction : string;
    toTransaction : string;
    createdAt : Date;
    updatedAt :Date
}
