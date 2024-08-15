



export class ApiFeatures {
    constructor(mongooseQuery , searchQuery) {
        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery
    }

    pagination(){
        const pageNumber = this.searchQuery.page *1 || 1
        if(this.searchQuery.page < 1 ) pageNumber = 1
        let limit = 5 ;
        let skip = (pageNumber-1) * limit
        this.pageNumber = pageNumber;
        this.mongooseQuery.skip(skip).limit(limit);
        return this
    }
    filter(){
        let filterObj = structuredClone(this.searchQuery);
        filterObj = JSON.stringify(filterObj);
        filterObj = filterObj.replace(/(lt|lte|gt|gte)/g ,(val)=> `$${val}`)
        filterObj = JSON.parse(filterObj)

        let excluedFields = ['page','search','sort','fields'];
        excluedFields.forEach((val)=>{
            delete filterObj[val]
        })
        this.mongooseQuery.find(filterObj);
        return this
    }
    sort(){
        if(this.searchQuery.sort){
            let sortedBy = this.searchQuery.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortedBy)
        }
        return this
    }
    fields(){
        if(this.searchQuery.fields){
            let seletcFields = this.searchQuery.fields.split(',').join(' ');
            this.mongooseQuery.select(seletcFields)
        }
        return this
    }

}