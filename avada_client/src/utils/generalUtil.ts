

export const sort = (arr: any[],prop: string, isAscending: boolean) => {

    if(isAscending) {
        arr.sort( function( a:any , b:any){
            if(parseFloat(a[prop]) > parseFloat(b[prop])) return 1;
            if(parseFloat(a[prop]) < parseFloat(b[prop])) return -1;
            return 0;
        });
    } else {
        arr.sort( function( a:any , b:any){
            if(parseFloat(a[prop]) > parseFloat(b[prop])) return -1;
            if(parseFloat(a[prop]) < parseFloat(b[prop])) return 1;
            return 0;
        });
    }

    console.log("Sorted: ", arr);
    return arr;
}
