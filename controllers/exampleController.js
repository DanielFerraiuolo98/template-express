const examples = require("../models/examples");

//index
function index(req, res) {
    const postName = req.query.name;
    const itemIngredient = req.query.ingredient;
    console.log(postName);
    console.log(itemIngredient);
    let response = {
        totalCount: examples.length,
        data: [...examples],
    };
    let postCopy = [...examples];
    if (postName) {
        postCopy = post.filter((item) => { //prima si filtra sul post originale
            item.name.includes(postName);
        });
    }
    if (itemIngredient) {
        postCopy = postCopy.filter((item) => { //dopo si filtra sul post copiato che è il il risultato del filtro del post originale
            item.ingredient.includes(itemIngredient);
        });
    }
    res.json(response);
}

//show
function show(req, res) {
    const id = parseInt(req.params.id);
    const item = examples.find((item) => item.id === id);//prelevo il post dall'array
    /*if (item) {
        res.json({
            success: true,
            item,
        });
    }
    else {
        res.status(404);
        res.json({
            success: false,
            message: "il post non è stato trovato",
        });
    }
    res.json(response);*/
    if (!item) {
        res.json({
            success: false,
            message: "il post non è stato trovato",
        });
    }
    else {
        res.json({
            success: true, item
        });
    }
}

//create/store
function store(req, res) {
    console.log(req.body);
    //const newId = post[post.length - 1].id + 1;
    let newId = 0;
    for (let i = 0; i < examples.length; i++) {
        if (examples[i].id > newId) {
            newId = examples[i].id;
        }
    }
    newId += 1;
    console.log(req.headers["content-type"]);//vediamo quale body parser utilizzare
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    }//abbiamo creato il nuovo post mettendo nell'oggetto tutti i dati necessari
    examples.push(newPost); //pusho dentro l'array post il nuovo post creato
    res.status(201).json(newPost);//mando in risposta lo status 201
}

//update
function update(req, res) {
    const id = parseInt(req.params.id);
    const item = examples.find((item) => item.id === id);//prelevo il post dall'array
    if (!item) {
        res.status(404);
        res.json({
            success: false,
            message: "il post non è stato trovato",
        });
    }
    console.log(req.body);
    item.titolo = req.body.titolo;
    item.contenuto = req.body.contenuto;
    item.immagine = req.body.immagine;
    item.tags = req.body.tags;

    console.log(post);
    res.json(item);
}

//modify
function modify(req, res) {
    res.send("modifica parziale del post con id " + req.params.id);
}

//destroy
function destroy(req, res) {
    const id = parseInt(req.params.id); // Ottieni l'ID dal parametro della richiesta
    const index = examples.findIndex(item => item.id === id); // Trova l'indice dell'elemento con l'ID corrispondente

    if (index !== -1) {
        examples.splice(index, 1); // Elimina il post dalla lista
        console.log("Lista aggiornata:", examples); // Stampa la lista aggiornata nel terminale
        res.sendStatus(204); // Invia una risposta con stato 204 (Nessun contenuto)
    } else {
        // Se il post non viene trovato, invia un errore 404 con un messaggio
        res.status(404).json({
            error: "404",
            message: "Post non trovato",
        });
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy,
}