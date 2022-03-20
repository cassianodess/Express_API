const list = (request, response, repository) => {

    let query = "select * from teachers order by id asc"

    const {limit, offset} = request.query;

    if(limit && offset){
        query += ` offset ${offset} limit ${limit} `;
    }
    
    repository.raw(query)
    .then(teachers => {
        return response.json(teachers.rows);
    });
}

const retrieve = (request, response, repository) => {
    const id = request.params.id;
    
    repository.raw("select * from teachers where id = ?", id)
    .then(resp => {
        if(resp.rowCount == 0){
            throw Error;
        }
        return response.json(resp.rows);
    })
    .catch(error => {
        return response.status(404).json({status: false, message: "id not found"});
    });
}

const create = (request, response, repository) => {

    const {name, subject} = request.body;

    repository.raw("insert into teachers (name, subject) values (?, ?) returning id, name, subject", [name, subject])
    .then(resp => {
        return response.json(resp.rows);
    }).catch(error => {
        return response.status(400).json({status: false, message: "missing fields"});
    });

}

const update = (request, response, repository) => {

    const id = request.params.id;
    const {name, subject} = request.body;


    repository.raw("update teachers set name = ?, subject = ? where id = ? returning id, name, subject", [name, subject, id])
    .then(resp => {
        if(resp.rowCount == 0){
            return response.status(404).json({status: false, message: "id not found"});
        }
        return response.json(resp.rows);
    })
    .catch(error => {
        return response.status(400).json({status: false, message: "missing fields"});
    });

}

const remove = (request, response, repository) => {
    const id = request.params.id;

    repository.raw("delete from teachers where id = ? returning id, name, subject", [id])
    .then(resp => {
        if(resp.rows = 0){
            throw Error;
        }
        return response.json(resp.rows);
    })
    .catch(error => {
        return response.status(404).json({status: false, message: "id not found"});
    });    

}

module.exports = {
    list,
    retrieve,
    create,
    update,
    remove
}
