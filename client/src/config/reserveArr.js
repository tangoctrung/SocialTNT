export const reserveArr = (arr) => {
    let i;
    let arr1 = [];
    for(i=arr?.length-1;i>=0;i--) {
        arr1.push(arr[i]);
    }
    return arr1;
}