
export type  PaginateResponse<T> = {
         content:T
       currentPage :number,
         totalPages: number,
        totalItems:number,
        hasNext :boolean,
        hasPrevious:boolean,
        nextPageUrl:string,
        previousPageUrl:string

 

}