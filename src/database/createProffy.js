module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            wpp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.wpp}",
            "${proffyValue.bio}"
        ); 

    `) //; só apos o Values

    const proffy_id = insertedProffy.lastID

    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    //Como o classScheduleValues é um array, possui seus determinados métodos,
    //Entre eles o map (Como um forEach), que faz o mapeamento do array, e retorna 
    //outro array, Por isso torna-se essencial o retorno, com isso, o 
    //insertedAllClassSchedule Vai receber esse array e, depois, inserir no banco
    //Então, em cada posição dele, vai existir um dos db.run, os quais serão 
    //executados após essa inserção no array, executando cada posição do array
    //insertedAllClassSchedule, o map pode receber um segundo argumento, que é o index

    const insertedALLClassSchedule = classScheduleValues.map((value) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${value.weekday}",   
                "${value.time_from}", 
                "${value.time_to}"
            );
        
        `) //Utiliza o value, pois o map, assim como o ForEach, recebe os valores
           //Das posições do vetor, as quais são objetos, então basta indicar suas
           //propriedades, enquanto o map passa pelo array

           //Não precisa usar o await nesse run, pois está fazendo só o 
           //armazenamento dos runs para depois executá-lo

           
    })

    await Promise.all(insertedALLClassSchedule) //Precisa disso pois o run não executa já na declaração, assim como os outros

    //Cada run precisa de um tempo de processamento, como ele é uma
    //promessa, ele tentará rodar e cada um levará seu tempo, para
    //tornar possível que cada um desses tenha seu tempo, utilizasse o
    //await, juntamente com a funcionalidade Promise, para fazer a
    //promessa de tentar executar, e o all para tentar com todos os run
    // do array.
}